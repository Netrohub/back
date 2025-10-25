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
let KycService = class KycService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
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
                kyc_status: updatedStatus,
            },
        });
    }
};
exports.KycService = KycService;
exports.KycService = KycService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], KycService);
//# sourceMappingURL=kyc.service.js.map