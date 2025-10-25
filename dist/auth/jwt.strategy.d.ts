import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private authService;
    constructor(configService: ConfigService, authService: AuthService);
    validate(payload: any): Promise<{
        id: number;
        username: string;
        email: string;
        name: string;
        password: string;
        phone: string | null;
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
    }>;
}
export {};
