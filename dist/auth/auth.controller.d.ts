import { AuthService } from './auth.service';
import { User } from '../types';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
                        id: number;
                        created_at: Date;
                        updated_at: Date;
                        name: string;
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
                id: number;
                created_at: Date;
                updated_at: Date;
                username: string;
                name: string;
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
    getCurrentUser(user: User): Promise<any>;
    logout(): Promise<{
        message: string;
    }>;
    verifyPhone(user: any, verifyPhoneDto: {
        phone: string;
        code: string;
    }): Promise<{
        message: string;
    }>;
    requestPasswordReset(requestPasswordResetDto: RequestPasswordResetDto): Promise<{
        message: string;
        status: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
        status: string;
    }>;
}
