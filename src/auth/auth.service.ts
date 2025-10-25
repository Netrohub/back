import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from '../types';
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
      name: user.name,
      roles: typeof user.roles === 'string' ? JSON.parse(user.roles) : user.roles,
    };

    return {
      user,
      access_token: this.jwtService.sign(payload),
      token_type: 'Bearer',
      expires_in: this.configService.get('JWT_EXPIRES_IN', '7d'),
    };
  }

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 12);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        name: registerDto.name,
        email: registerDto.email,
        password: hashedPassword,
        phone: registerDto.phone,
        roles: JSON.stringify(['user']),
        kyc_status: JSON.stringify({
          email: false,
          phone: false,
          identity: false,
        }),
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      roles: typeof user.roles === 'string' ? JSON.parse(user.roles) : user.roles,
    };

    return {
      user: userWithoutPassword,
      access_token: this.jwtService.sign(payload),
      token_type: 'Bearer',
      expires_in: this.configService.get('JWT_EXPIRES_IN', '7d'),
    };
  }

  async getCurrentUser(userId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
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
}
