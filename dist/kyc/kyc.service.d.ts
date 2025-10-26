import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
export declare class KycService {
    private prisma;
    private emailService;
    private readonly PERSONA_API_KEY;
    private readonly PERSONA_TEMPLATE_ID;
    constructor(prisma: PrismaService, emailService: EmailService);
    handlePersonaCallback(data: any): Promise<{
        success: boolean;
    }>;
    getKycStatus(userId: number): Promise<{
        status: import("@prisma/client/runtime/library").JsonValue;
        documents: import("@prisma/client/runtime/library").JsonValue;
    }>;
    submitKycDocument(userId: number, step: string, documentData: any): Promise<{
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
    completeKyc(userId: number): Promise<{
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
    verifyPhone(userId: number, phone: string, code: string): Promise<{
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
    createPersonaInquiry(userId: number): Promise<{
        inquiryId: any;
        verificationUrl: any;
    }>;
    sendEmailVerification(userId: number): Promise<{
        message: string;
        alreadyVerified: boolean;
        expiresIn?: undefined;
    } | {
        message: string;
        expiresIn: number;
        alreadyVerified?: undefined;
    }>;
    verifyEmail(userId: number, code: string): Promise<{
        message: string;
        verified: boolean;
    }>;
}
