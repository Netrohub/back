import { AuthService } from './auth.service';
import { User } from '../types';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
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
                name: string;
                email: string;
                username: string;
                phone: string | null;
                id: number;
                avatar: string | null;
                roles: import("@prisma/client/runtime/library").JsonValue;
                kyc_status: import("@prisma/client/runtime/library").JsonValue;
                kyc_documents: import("@prisma/client/runtime/library").JsonValue | null;
                kyc_verified: boolean;
                kyc_completed_at: Date | null;
                email_verified_at: Date | null;
                phone_verified_at: Date | null;
                identity_verified_at: Date | null;
                is_active: boolean;
                last_login_at: Date | null;
                login_attempts: number;
                locked_until: Date | null;
                created_at: Date;
                updated_at: Date;
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
}
