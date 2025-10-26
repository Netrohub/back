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
        status: import("@prisma/client/runtime/library").JsonValue;
        documents: import("@prisma/client/runtime/library").JsonValue;
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
        name: string;
        email: string;
        password: string;
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
    }>;
    completeKyc(user: any): Promise<{
        name: string;
        email: string;
        password: string;
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
    }>;
    submitKycDocument(user: any, step: string, documentData: any): Promise<{
        name: string;
        email: string;
        password: string;
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
    }>;
}
