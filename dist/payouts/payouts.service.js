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
exports.PayoutsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let PayoutsService = class PayoutsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPayoutDto) {
        const seller = await this.prisma.user.findUnique({
            where: { id: createPayoutDto.seller_id },
        });
        if (!seller) {
            throw new common_1.NotFoundException('Seller not found');
        }
        const roles = Array.isArray(seller.roles) ? seller.roles : [seller.roles];
        if (!roles.includes('seller')) {
            throw new common_1.BadRequestException('User is not a seller');
        }
        return this.prisma.payout.create({
            data: {
                seller_id: createPayoutDto.seller_id,
                amount: new library_1.Decimal(createPayoutDto.amount),
                method: createPayoutDto.method || 'bank_transfer',
                description: createPayoutDto.description,
                notes: createPayoutDto.notes,
                status: 'pending',
            },
        });
    }
    async findAll(filters) {
        const where = {};
        if (filters?.seller_id) {
            where.seller_id = filters.seller_id;
        }
        if (filters?.status) {
            where.status = filters.status;
        }
        return this.prisma.payout.findMany({
            where,
            orderBy: { request_date: 'desc' },
            include: {
                seller: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async findOne(id) {
        const payout = await this.prisma.payout.findUnique({
            where: { id: parseInt(id) },
            include: {
                seller: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        if (!payout) {
            throw new common_1.NotFoundException('Payout not found');
        }
        return payout;
    }
    async update(id, updatePayoutDto) {
        const payout = await this.findOne(id);
        const updateData = {};
        if (updatePayoutDto.status) {
            updateData.status = updatePayoutDto.status;
            const now = new Date();
            if (updatePayoutDto.status === 'processing') {
                updateData.process_date = now;
            }
            else if (updatePayoutDto.status === 'completed') {
                updateData.completed_date = now;
            }
        }
        if (updatePayoutDto.reference !== undefined) {
            updateData.reference = updatePayoutDto.reference;
        }
        if (updatePayoutDto.notes !== undefined) {
            updateData.notes = updatePayoutDto.notes;
        }
        return this.prisma.payout.update({
            where: { id: parseInt(id) },
            data: updateData,
        });
    }
    async remove(id) {
        const payout = await this.findOne(id);
        return this.prisma.payout.delete({
            where: { id: parseInt(id) },
        });
    }
};
exports.PayoutsService = PayoutsService;
exports.PayoutsService = PayoutsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PayoutsService);
//# sourceMappingURL=payouts.service.js.map