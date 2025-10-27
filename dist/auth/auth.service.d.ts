import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        data: {
            user: any;
            access_token: string;
            token_type: string;
            expires_in: any;
        };
        message: string;
        status: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        data: {
            user: {
                user_roles: ({
                    role: {
                        description: string | null;
                        name: string;
                        id: number;
                        created_at: Date;
                        updated_at: Date;
                        is_active: boolean;
                        slug: string;
                        permissions: import("@prisma/client/runtime/library").JsonValue | null;
                    };
                } & {
                    id: number;
                    user_id: number;
                    created_at: Date;
                    role_id: number;
                    granted_by: number | null;
                    granted_at: Date;
                    expires_at: Date | null;
                })[];
                name: string;
                id: number;
                created_at: Date;
                updated_at: Date;
                username: string;
                email: string;
                phone: string | null;
                avatar: string | null;
                email_verified_at: Date | null;
                phone_verified_at: Date | null;
                is_active: boolean;
                is_banned: boolean;
                banned_until: Date | null;
                ban_reason: string | null;
                last_login_at: Date | null;
                login_attempts: number;
                locked_until: Date | null;
            };
            access_token: string;
            token_type: string;
            expires_in: any;
        };
        message: string;
        status: string;
    }>;
    getCurrentUser(userId: number): Promise<any>;
    verifyToken(token: string): Promise<User>;
    verifyPhone(userId: number, phone: string, code: string): Promise<{
        message: string;
    }>;
    requestPasswordReset(email: string): Promise<{
        message: string;
        status: string;
    }>;
    resetPassword(token: string, password: string, passwordConfirmation: string): Promise<{
        message: string;
        status: string;
    }>;
}
