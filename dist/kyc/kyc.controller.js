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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const kyc_service_1 = require("./kyc.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const decorators_1 = require("../auth/decorators");
let KycController = class KycController {
    kycService;
    constructor(kycService) {
        this.kycService = kycService;
    }
    async handlePersonaWebhook(payload, headers) {
        console.log('📥 Persona webhook received:', payload);
        try {
            const { type, data } = payload;
            switch (type) {
                case 'inquiry.completed':
                    console.log('✅ Inquiry completed:', data);
                    await this.kycService.handlePersonaCallback(data);
                    break;
                case 'inquiry.approved':
                    console.log('✅ Inquiry approved:', data);
                    await this.kycService.handlePersonaCallback(data);
                    break;
                case 'inquiry.created':
                    console.log('📝 Inquiry created:', data);
                    break;
                case 'inquiry.started':
                    console.log('▶️ Inquiry started:', data);
                    break;
                case 'inquiry.declined':
                    console.log('❌ Inquiry declined:', data);
                    break;
                case 'inquiry.failed':
                    console.log('❌ Inquiry failed:', data);
                    break;
                default:
                    console.log('ℹ️ Unhandled webhook type:', type);
            }
            return { success: true };
        }
        catch (error) {
            console.error('❌ Error processing Persona webhook:', error);
            return { success: false, error: error.message };
        }
    }
    async getKycStatus(user) {
        return this.kycService.getKycStatus(user.id);
    }
    async sendEmailVerification(user) {
        return this.kycService.sendEmailVerification(user.id);
    }
    async verifyEmail(user, verifyEmailDto) {
        return this.kycService.verifyEmail(user.id, verifyEmailDto.code);
    }
    async verifyPhone(user, verifyPhoneDto) {
        return this.kycService.verifyPhone(user.id, verifyPhoneDto.phone, verifyPhoneDto.code);
    }
    async completeKyc(user) {
        return this.kycService.completeKyc(user.id);
    }
    async submitKycDocument(user, step, documentData) {
        return this.kycService.submitKycDocument(user.id, step, documentData);
    }
};
exports.KycController = KycController;
__decorate([
    (0, common_1.Post)('webhooks/persona'),
    (0, swagger_1.ApiOperation)({ summary: 'Persona webhook for verification callbacks' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Webhook processed successfully' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "handlePersonaWebhook", null);
__decorate([
    (0, common_1.Get)('status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get KYC status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'KYC status retrieved successfully' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "getKycStatus", null);
__decorate([
    (0, common_1.Post)('send-email-verification'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Send email verification code' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Verification code sent successfully' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "sendEmailVerification", null);
__decorate([
    (0, common_1.Post)('verify-email'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Verify email with code' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Email verified successfully' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('verify-phone'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Verify phone number' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Phone verified successfully' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "verifyPhone", null);
__decorate([
    (0, common_1.Post)('complete'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Complete KYC process' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'KYC completed successfully' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "completeKyc", null);
__decorate([
    (0, common_1.Post)(':step'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Submit KYC document for specific step' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Document submitted successfully' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('step')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "submitKycDocument", null);
exports.KycController = KycController = __decorate([
    (0, swagger_1.ApiTags)('kyc'),
    (0, common_1.Controller)('kyc'),
    __metadata("design:paramtypes", [kyc_service_1.KycService])
], KycController);
//# sourceMappingURL=kyc.controller.js.map