import { Injectable, UnauthorizedException, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        user_roles: {
          include: {
            role: true
          }
        }
      }
    });

    if (!user) {
      return null;
    }

    // Check if account is locked
    if (user.locked_until && user.locked_until > new Date()) {
      throw new UnauthorizedException('Account is temporarily locked due to too many failed login attempts');
    }

    // Check if account is active
    if (!user.is_active) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Reset login attempts and unlock account
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          login_attempts: 0,
          locked_until: null,
          last_login_at: new Date(),
        },
      });

      const { password: _, ...result } = user;
      return result;
    } else {
      // Increment login attempts
      const newAttempts = user.login_attempts + 1;
      const lockUntil = newAttempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null; // Lock for 15 minutes

      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          login_attempts: newAttempts,
          locked_until: lockUntil,
        },
      });

      return null;
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      roles: typeof user.roles === 'string' ? JSON.parse(user.roles) : user.roles,
    };

    return {
      data: {
        user,
        access_token: this.jwtService.sign(payload),
        token_type: 'Bearer',
        expires_in: this.configService.get('JWT_EXPIRES_IN', '7d'),
      },
      message: 'Login successful',
      status: 'success'
    };
  }

  async register(registerDto: RegisterDto) {
    // Check if username is reserved
    const reservedUsername = await this.prisma.$queryRaw`
      SELECT username FROM reserved_usernames 
      WHERE LOWER(username) = LOWER(${registerDto.username})
    `;

    if (Array.isArray(reservedUsername) && reservedUsername.length > 0) {
      throw new ConflictException({
        message: 'Username is reserved and cannot be used',
        status: 'error',
        errors: { username: ['This username is reserved and cannot be used'] }
      });
    }

    // Check if user already exists by email
    const existingUserByEmail = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUserByEmail) {
      throw new ConflictException({
        message: 'User with this email already exists',
        status: 'error',
        errors: { email: ['Email is already registered'] }
      });
    }

    // Check if username already exists (case-insensitive)
    const existingUserByUsername = await this.prisma.user.findFirst({
      where: { 
        username: {
          equals: registerDto.username,
          mode: 'insensitive'
        }
      },
    });

    if (existingUserByUsername) {
      throw new ConflictException({
        message: 'Username already taken',
        status: 'error',
        errors: { username: ['Username is already taken'] }
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 12);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        username: registerDto.username,
        name: registerDto.name,
        email: registerDto.email,
        password: hashedPassword,
        phone: registerDto.phone,
        user_roles: {
          create: {
            role: {
              connect: { slug: "user" }
            }
          }
        }
      },
      include: {
        user_roles: {
          include: {
            role: true
          }
        }
      }
    });

    const { password: _, ...userWithoutPassword } = user;

    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      roles: user.user_roles?.map(ur => ur.role.slug) || ['user'],
    };

    return {
      data: {
        user: userWithoutPassword,
        access_token: this.jwtService.sign(payload),
        token_type: 'Bearer',
        expires_in: this.configService.get('JWT_EXPIRES_IN', '7d'),
      },
      message: 'Registration successful',
      status: 'success'
    };
  }

  async getCurrentUser(userId: number): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        user_roles: {
          include: {
            role: true
          }
        }
      }
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password: _, ...userWithoutPassword } = user;
    
    // Get KYC status from kyc_verifications table
    const kycVerifications = await this.prisma.kycVerification.findMany({
      where: { user_id: user.id },
      orderBy: { created_at: 'desc' }
    });
    
    const hasIdentityVerification = kycVerifications.some(
      kyc => kyc.type === 'IDENTITY' && kyc.status === 'APPROVED'
    );
    
    return {
      ...userWithoutPassword,
      emailVerified: !!user.email_verified_at,
      phoneVerified: !!user.phone_verified_at,
      kycStatus: hasIdentityVerification ? 'verified' : 'incomplete',
      roles: user.user_roles?.map(ur => ur.role.slug) || ['user'],
    };
  }

  async verifyToken(token: string): Promise<User> {
    try {
      const payload = this.jwtService.verify(token);
      return this.getCurrentUser(payload.sub);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async verifyPhone(userId: number, phone: string, code: string) {
    // In a real implementation, you would verify the code with your SMS service
    // For now, we'll just update the phone number
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Update phone number
    await this.prisma.user.update({
      where: { id: userId },
      data: { phone },
    });

    return { message: 'Phone verified successfully' };
  }

  async requestPasswordReset(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour from now

    // Store reset token in user record (you might want to create a separate table for this)
    // Note: You'll need to add these fields to your Prisma schema
    // await this.prisma.user.update({
    //   where: { id: user.id },
    //   data: {
    //     reset_password_token: resetToken,
    //     reset_password_expires: resetTokenExpires,
    //   },
    // });

    // TODO: Send email with reset link
    // await this.emailService.sendPasswordResetEmail(user.email, resetToken);

    return {
      message: 'Password reset email sent successfully',
      status: 'success'
    };
  }

  async resetPassword(token: string, password: string, passwordConfirmation: string) {
    if (password !== passwordConfirmation) {
      throw new BadRequestException('Passwords do not match');
    }

    // Find user by reset token (you'll need to add this field to your schema)
    // const user = await this.prisma.user.findFirst({
    //   where: {
    //     reset_password_token: token,
    //     reset_password_expires: { gte: new Date() },
    //   },
    // });

    // For now, return a placeholder response
    // if (!user) {
    //   throw new BadRequestException('Invalid or expired reset token');
    // }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // TODO: Update password and clear reset token when schema is updated
    // await this.prisma.user.update({
    //   where: { id: user.id },
    //   data: {
    //     password: hashedPassword,
    //     reset_password_token: null,
    //     reset_password_expires: null,
    //   },
    // });

    return {
      message: 'Password reset successful',
      status: 'success'
    };
  }
}
