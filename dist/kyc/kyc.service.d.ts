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
            data: import("@prisma/client/runtime/library").JsonValue | null;
            expires_at: Date | null;
            provider: string | null;
            external_id: string | null;
            documents: import("@prisma/client/runtime/library").JsonValue | null;
            verified_at: Date | null;
            rejected_at: Date | null;
        }[];
        hasIdentityVerification: boolean;
        kycStatus: string;
    }>;
    submitKycDocument(userId: number, step: string, documentData: any): Promise<{
        type: import(".prisma/client").$Enums.KycType;
        id: number;
        user_id: number;
        status: import(".prisma/client").$Enums.KycStatus;
        created_at: Date;
        updated_at: Date;
        notes: string | null;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        expires_at: Date | null;
        provider: string | null;
        external_id: string | null;
        documents: import("@prisma/client/runtime/library").JsonValue | null;
        verified_at: Date | null;
        rejected_at: Date | null;
    }>;
    completeKyc(userId: number): Promise<{
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
    verifyPhone(userId: number, phone: string, code: string): Promise<{
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
