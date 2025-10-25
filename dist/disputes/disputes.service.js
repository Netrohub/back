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
exports.DisputesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DisputesService = class DisputesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDisputes(userId) {
        return this.prisma.dispute.findMany({
            where: { user_id: userId },
            include: {
                order: {
                    include: {
                        items: {
                            include: { product: true },
                        },
                    },
                },
            },
            orderBy: { created_at: 'desc' },
        });
    }
    async getDisputeById(id, userId) {
        const dispute = await this.prisma.dispute.findUnique({
            where: { id },
            include: {
                order: {
                    include: {
                        items: {
                            include: { product: true },
                        },
                    },
                },
            },
        });
        if (!dispute) {
            throw new common_1.NotFoundException('Dispute not found');
        }
        if (dispute.user_id !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return dispute;
    }
    async createDispute(userId, orderId, reason, description) {
        const order = await this.prisma.order.findFirst({
            where: {
                id: orderId,
                user_id: userId,
            },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        const existingDispute = await this.prisma.dispute.findFirst({
            where: { order_id: orderId },
        });
        if (existingDispute) {
            throw new common_1.ForbiddenException('Dispute already exists for this order');
        }
        return this.prisma.dispute.create({
            data: {
                user_id: userId,
                order_id: orderId,
                reason,
                description,
                status: 'pending',
            },
        });
    }
    async updateDisputeStatus(id, status, adminId) {
        const dispute = await this.prisma.dispute.findUnique({
            where: { id },
        });
        if (!dispute) {
            throw new common_1.NotFoundException('Dispute not found');
        }
        return this.prisma.dispute.update({
            where: { id },
            data: {
                status,
                resolved_by: adminId,
                resolved_at: new Date(),
            },
        });
    }
    async getAdminDisputes() {
        return this.prisma.dispute.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                order: {
                    include: {
                        items: {
                            include: { product: true },
                        },
                    },
                },
            },
            orderBy: { created_at: 'desc' },
        });
    }
};
exports.DisputesService = DisputesService;
exports.DisputesService = DisputesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DisputesService);
//# sourceMappingURL=disputes.service.js.map