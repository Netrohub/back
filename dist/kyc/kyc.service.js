"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const email_service_1 = require("../email/email.service");
let KycService = class KycService {
    prisma;
    emailService;
    PERSONA_API_KEY = process.env.PERSONA_API_KEY || 'sk_test_3ef3be12-87af-444f-9c71-c7546ee971a5';
    PERSONA_TEMPLATE_ID = process.env.PERSONA_TEMPLATE_ID || 'itmpl_1bNZnx9mrbHZKKJsvJiN9BDDTuD6';
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async handlePersonaCallback(data) {
        console.log('🔍 Processing Persona callback:', data);
        try {
            const inquiryId = data?.inquiry?.id;
            const status = data?.inquiry?.status;
            const userId = data?.metadata?.userId;
            console.log(`📋 Inquiry ${inquiryId} status: ${status}`);
            const userIdNum = userId ? parseInt(String(userId), 10) : null;
            const user = userIdNum ? await this.prisma.user.findUnique({
                where: { id: userIdNum },
            }) : null;
            if (!user) {
                console.warn('⚠️ User not found for inquiry:', inquiryId);
                return;
            }
            if (status === 'passed') {
                const currentStatus = user.kyc_status || {};
                const updatedStatus = {
                    ...currentStatus,
                    identity: true,
                    persona_inquiry_id: inquiryId,
                    persona_verified_at: new Date().toISOString(),
                };
                await this.prisma.user.update({
                    where: { id: user.id },
                    data: {
                        kyc_status: updatedStatus,
                        identity_verified_at: new Date(),
                        kyc_verified: true,
                    },
                });
                console.log(`✅ User ${user.id} KYC verified via Persona`);
            }
            else if (status === 'failed') {
                console.log(`❌ User ${user.id} KYC failed verification`);
            }
            return { success: true };
        }
        catch (error) {
            console.error('❌ Error handling Persona callback:', error);
            throw error;
        }
    }
    async getKycStatus(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                kyc_status: true,
                kyc_documents: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            status: user.kyc_status,
            documents: user.kyc_documents,
        };
    }
    async submitKycDocument(userId, step, documentData) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const currentStatus = user.kyc_status || {};
        const updatedStatus = {
            ...currentStatus,
            [step]: true,
        };
        const currentDocuments = user.kyc_documents || {};
        const updatedDocuments = {
            ...currentDocuments,
            [step]: documentData,
        };
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                kyc_status: updatedStatus,
                kyc_documents: updatedDocuments,
            },
        });
    }
    async completeKyc(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const kycStatus = user.kyc_status;
        const allStepsCompleted = kycStatus?.email && kycStatus?.phone && kycStatus?.identity;
        if (!allStepsCompleted) {
            throw new Error('All KYC steps must be completed before final submission');
        }
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                kyc_verified: true,
                kyc_completed_at: new Date(),
            },
        });
    }
    async verifyPhone(userId, phone, code) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const currentStatus = user.kyc_status || {};
        const updatedStatus = {
            ...currentStatus,
            phone: true,
        };
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                phone,
                phone_verified_at: new Date(),
                kyc_status: updatedStatus,
            },
        });
    }
    async createPersonaInquiry(userId) {
        try {
            console.log('🔍 Creating Persona inquiry for user:', userId);
            console.log('🔑 API Key full length:', this.PERSONA_API_KEY ? this.PERSONA_API_KEY.length : 0);
            console.log('🔑 API Key first 50 chars:', this.PERSONA_API_KEY ? this.PERSONA_API_KEY.substring(0, 50) : 'NOT SET');
            console.log('🔑 API Key last 10 chars:', this.PERSONA_API_KEY ? `...${this.PERSONA_API_KEY.substring(this.PERSONA_API_KEY.length - 10)}` : 'NOT SET');
            console.log('📋 Template ID:', this.PERSONA_TEMPLATE_ID);
            const response = await fetch('https://api.withpersona.com/api/v1/inquiries', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.PERSONA_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        type: 'inquiry',
                        attributes: {
                            template_id: this.PERSONA_TEMPLATE_ID,
                            reference_id: `user_${userId}_${Date.now()}`,
                            metadata: {
                                userId: userId,
                            },
                        }
                    }
                }),
            });
            const responseText = await response.text();
            console.log('📥 Persona API response status:', response.status);
            console.log('📥 Persona API response body:', responseText);
            if (!response.ok) {
                const error = JSON.parse(responseText);
                console.error('❌ Persona API error:', error);
                throw new Error(error.error?.message || 'Failed to create Persona inquiry');
            }
            const result = JSON.parse(responseText);
            console.log('✅ Persona inquiry created:', result.data);
            const inquiryId = result.data.id;
            const verificationUrl = result.data.attributes?.url;
            console.log('🔗 Verification URL:', verificationUrl);
            if (!verificationUrl) {
                const constructedUrl = `https://inquiry.withpersona.com/verify/${inquiryId}`;
                console.log('🔗 Constructed URL:', constructedUrl);
                return {
                    inquiryId,
                    verificationUrl: constructedUrl,
                };
            }
            return {
                inquiryId,
                verificationUrl,
            };
        }
        catch (error) {
            console.error('❌ Error creating Persona inquiry:', error);
            throw error;
        }
    }
    async sendEmailVerification(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.email_verified_at) {
            return { message: 'Email already verified', alreadyVerified: true };
        }
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationData = {
            emailCode: code,
            emailCodeExpiry: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        };
        const existingKycStatus = user.kyc_status || {};
        const updatedKycStatus = { ...existingKycStatus, ...verificationData };
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                kyc_status: updatedKycStatus,
            },
        });
        await this.emailService.sendVerificationEmail(user.email, code);
        console.log(`✅ Verification code sent to ${user.email}`);
        return {
            message: 'Verification code sent to your email',
            expiresIn: 600,
        };
    }
    async verifyEmail(userId, code) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.email_verified_at) {
            return { message: 'Email already verified', verified: true };
        }
        const kycStatus = user.kyc_status || {};
        const storedCode = kycStatus.emailCode;
        const codeExpiry = kycStatus.emailCodeExpiry;
        if (!storedCode) {
            throw new Error('No verification code found. Please request a new code.');
        }
        if (new Date(codeExpiry) < new Date()) {
            const updatedKycStatus = { ...kycStatus };
            delete updatedKycStatus.emailCode;
            delete updatedKycStatus.emailCodeExpiry;
            await this.prisma.user.update({
                where: { id: userId },
                data: { kyc_status: updatedKycStatus },
            });
            throw new Error('Verification code has expired. Please request a new code.');
        }
        if (storedCode !== code) {
            throw new Error('Invalid verification code. Please try again.');
        }
        const currentStatus = user.kyc_status || {};
        const updatedStatus = {
            ...currentStatus,
            email: true,
        };
        delete updatedStatus.emailCode;
        delete updatedStatus.emailCodeExpiry;
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                email_verified_at: new Date(),
                kyc_status: updatedStatus,
            },
        });
        console.log(`✅ Email verified for user ${userId}`);
        return {
            message: 'Email verified successfully',
            verified: true,
        };
    }
};
exports.KycService = KycService;
exports.KycService = KycService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], KycService);
//# sourceMappingURL=kyc.service.js.map