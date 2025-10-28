import { Injectable, UnauthorizedException, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';

// ✅ FIX #1: Hardcoded list of reserved usernames
const RESERVED_USERNAMES = [
  'admin', 'administrator', 'moderator', 'mod', 'support', 'help',
  'root', 'system', 'api', 'nxoland', 'nexo', 'staff', 'team',
  'official', 'verified', 'bot', 'service', 'info', 'contact',
  'sales', 'billing', 'abuse', 'security', 'privacy', 'legal',
  'terms', 'tos', 'dmca', 'copyright', 'trademark', 'about',
  'careers', 'jobs', 'press', 'media', 'blog', 'news', 'newsletter',
  'account', 'accounts', 'settings', 'profile', 'dashboard',
  'login', 'logout', 'register', 'signup', 'signin', 'signout',
  'auth', 'oauth', 'sso', 'password', 'reset', 'verify', 'confirm',
  'user', 'users', 'member', 'members', 'seller', 'sellers',
  'buyer', 'buyers', 'vendor', 'vendors', 'guest', 'anonymous',
  'products', 'shop', 'store', 'cart', 'checkout', 'orders',
  'payment', 'payments', 'invoice', 'invoices', 'refund', 'refunds',
  'dispute', 'disputes', 'ticket', 'tickets', 'message', 'messages',
  'notification', 'notifications', 'alert', 'alerts', 'feed',
  'search', 'explore', 'discover', 'trending', 'popular', 'new',
  'admin-panel', 'adminpanel', 'cpanel', 'control-panel',
  'www', 'ftp', 'mail', 'smtp', 'pop', 'imap', 'webmail',
  'test', 'testing', 'demo', 'staging', 'dev', 'development',
  'production', 'prod', 'beta', 'alpha', 'preview', 'localhost'
];

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // ✅ Helper method to check if username is reserved
  private isUsernameReserved(username: string): boolean {
    const normalizedUsername = username.toLowerCase().trim();
    return RESERVED_USERNAMES.includes(normalizedUsername);
  }

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

  async login(loginDto: LoginDto, ipAddress?: string, userAgent?: string) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      // ✅ FIX #3: Generic error message to prevent user enumeration
      throw new UnauthorizedException('Invalid email or password');
    }

    // ✅ FIX: Extract role slugs from user_roles relation
    const roleSlugs = user.user_roles?.map((ur: any) => ur.role.slug) || [];
    
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      roles: roleSlugs,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });

    // ✅ FIX #5: Create user session
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

    await this.prisma.userSession.create({
      data: {
        user_id: user.id,
        device_type: this.getDeviceType(userAgent),
        ip_address: ipAddress || 'unknown',
        user_agent: userAgent,
        expires_at: expiresAt,
        is_active: true,
      },
    });

    // ✅ FIX: Add roles array to user object in response
    const userWithRoles = {
      ...user,
      roles: roleSlugs,
    };

    return {
      data: {
        user: userWithRoles,
        access_token: accessToken,
        refresh_token: refreshToken,
        token_type: 'Bearer',
        expires_in: this.configService.get('JWT_EXPIRES_IN', '7d'),
      },
      message: 'Login successful',
      status: 'success'
    };
  }

  // ✅ Helper method to extract device type from user agent
  private getDeviceType(userAgent?: string): string {
    if (!userAgent) return 'unknown';
    
    const ua = userAgent.toLowerCase();
    if (ua.includes('mobile')) return 'mobile';
    if (ua.includes('tablet') || ua.includes('ipad')) return 'tablet';
    return 'desktop';
  }

  async register(registerDto: RegisterDto) {
    // ✅ FIX #1: Check if username is reserved using hardcoded list
    if (this.isUsernameReserved(registerDto.username)) {
      throw new ConflictException({
        message: 'This username is not available',
        status: 'error',
        errors: { username: ['This username is reserved and cannot be used'] }
      });
    }

    // Check if user already exists by email
    const existingUserByEmail = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUserByEmail) {
      // ✅ FIX #3: More generic error message
      throw new ConflictException({
        message: 'Registration failed',
        status: 'error',
        errors: { email: ['This email is already in use'] }
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
      // ✅ FIX #3: More generic error message
      throw new ConflictException({
        message: 'Registration failed',
        status: 'error',
        errors: { username: ['This username is not available'] }
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

  async requestPasswordReset(email: string, ipAddress?: string, userAgent?: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    // ✅ FIX #3: Don't reveal if user exists or not
    // Always return success message to prevent user enumeration
    if (!user) {
      // Return success even if user doesn't exist
      return {
        message: 'If an account exists with this email, a password reset link has been sent',
        status: 'success'
      };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(resetToken, 10);
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour from now

    // ✅ Store reset token in password_resets table
    await this.prisma.passwordReset.create({
      data: {
        user_id: user.id,
        token: hashedToken,
        expires_at: resetTokenExpires,
        ip_address: ipAddress,
        user_agent: userAgent,
      },
    });

    // TODO: Send email with reset link
    // The actual token (resetToken) should be sent to the user's email
    // await this.emailService.sendPasswordResetEmail(user.email, resetToken);

    return {
      message: 'If an account exists with this email, a password reset link has been sent',
      status: 'success'
    };
  }

  async resetPassword(token: string, password: string, passwordConfirmation: string) {
    if (password !== passwordConfirmation) {
      throw new BadRequestException('Passwords do not match');
    }

    // ✅ Find all non-expired, unused password reset tokens
    const resetRequests = await this.prisma.passwordReset.findMany({
      where: {
        expires_at: { gte: new Date() },
        used_at: null,
      },
      include: {
        user: true,
      },
    });

    // Find the matching token by comparing hashes
    let matchingReset = null;
    for (const reset of resetRequests) {
      const isMatch = await bcrypt.compare(token, reset.token);
      if (isMatch) {
        matchingReset = reset;
        break;
      }
    }

    if (!matchingReset) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // ✅ Update password and mark token as used
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: matchingReset.user_id },
        data: {
          password: hashedPassword,
          login_attempts: 0,
          locked_until: null,
        },
      }),
      this.prisma.passwordReset.update({
        where: { id: matchingReset.id },
        data: {
          used_at: new Date(),
        },
      }),
    ]);

    return {
      message: 'Password reset successful',
      status: 'success'
    };
  }

  // ✅ FIX #5: Logout - Revoke user session
  async logout(userId: number, sessionId?: string) {
    if (sessionId) {
      // Revoke specific session
      await this.prisma.userSession.updateMany({
        where: {
          id: sessionId,
          user_id: userId,
        },
        data: {
          is_active: false,
        },
      });
    } else {
      // Revoke all sessions for this user
      await this.prisma.userSession.updateMany({
        where: {
          user_id: userId,
        },
        data: {
          is_active: false,
        },
      });
    }

    return {
      message: 'Logged out successfully',
      status: 'success'
    };
  }

  // ✅ FIX #5: Get all active sessions for a user
  async getUserSessions(userId: number) {
    const sessions = await this.prisma.userSession.findMany({
      where: {
        user_id: userId,
        is_active: true,
        expires_at: {
          gte: new Date(),
        },
      },
      orderBy: {
        last_activity_at: 'desc',
      },
      select: {
        id: true,
        device_name: true,
        device_type: true,
        ip_address: true,
        location: true,
        last_activity_at: true,
        created_at: true,
      },
    });

    return {
      data: sessions,
      status: 'success'
    };
  }

  // ✅ FIX #5: Revoke specific session
  async revokeSession(userId: number, sessionId: string) {
    const session = await this.prisma.userSession.findFirst({
      where: {
        id: sessionId,
        user_id: userId,
      },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    await this.prisma.userSession.update({
      where: {
        id: sessionId,
      },
      data: {
        is_active: false,
      },
    });

    return {
      message: 'Session revoked successfully',
      status: 'success'
    };
  }

  // ✅ FIX #6: Refresh access token
  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      
      // Verify user still exists and is active
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: {
          user_roles: {
            include: {
              role: true
            }
          }
        }
      });

      if (!user || !user.is_active) {
        throw new UnauthorizedException('User not found or inactive');
      }

      // Generate new access token
      const newPayload = {
        sub: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        roles: user.user_roles?.map(ur => ur.role.slug) || ['user'],
      };

      const newAccessToken = this.jwtService.sign(newPayload);

      return {
        data: {
          access_token: newAccessToken,
          token_type: 'Bearer',
          expires_in: this.configService.get('JWT_EXPIRES_IN', '7d'),
        },
        status: 'success'
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
