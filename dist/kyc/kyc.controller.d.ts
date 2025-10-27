import { KycService } from './kyc.service';
export declare class KycController {
    private kycService;
    constructor(kycService: KycService);
    handlePersonaWebhook(payload: any, headers: any): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
    getKycStatus(user: any): Promise<{
        status: {
            identity: boolean;
            address: boolean;
            phone: boolean;
            email: boolean;
        };
        verifications: {
            type: import(".prisma/client").$Enums.KycType;
            id: number;
            user_id: number;
            status: import(".prisma/client").$Enums.KycStatus;
            created_at: Date;
            updated_at: Date;
            notes: string | null;
            expires_at: Date | null;
            data: import("@prisma/client/runtime/library").JsonValue | null;
            provider: string | null;
            external_id: string | null;
            documents: import("@prisma/client/runtime/library").JsonValue | null;
            verified_at: Date | null;
            rejected_at: Date | null;
        }[];
        hasIdentityVerification: boolean;
        kycStatus: string;
    }>;
    sendEmailVerification(user: any): Promise<{
        message: string;
        alreadyVerified: boolean;
        expiresIn?: undefined;
    } | {
        message: string;
        expiresIn: number;
        alreadyVerified?: undefined;
    }>;
    verifyEmail(user: any, verifyEmailDto: {
        code: string;
    }): Promise<{
        message: string;
        verified: boolean;
    }>;
    verifyPhone(user: any, verifyPhoneDto: {
        phone: string;
        code: string;
    }): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        username: string;
        name: string;
        email: string;
        password: string;
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
    }>;
    completeKyc(user: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        username: string;
        name: string;
        email: string;
        password: string;
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
    }>;
    submitKycDocument(user: any, step: string, documentData: any): Promise<{
        type: import(".prisma/client").$Enums.KycType;
        id: number;
        user_id: number;
        status: import(".prisma/client").$Enums.KycStatus;
        created_at: Date;
        updated_at: Date;
        notes: string | null;
        expires_at: Date | null;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        provider: string | null;
        external_id: string | null;
        documents: import("@prisma/client/runtime/library").JsonValue | null;
        verified_at: Date | null;
        rejected_at: Date | null;
    }>;
}
