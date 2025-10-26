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
exports.CouponsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CouponsService = class CouponsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCouponDto) {
        const existingCoupon = await this.prisma.coupon.findUnique({
            where: { code: createCouponDto.code },
        });
        if (existingCoupon) {
            throw new common_1.ConflictException('Coupon with this code already exists');
        }
        if (createCouponDto.type === 'percentage' && createCouponDto.value > 100) {
            throw new common_1.BadRequestException('Percentage discount cannot exceed 100%');
        }
        const expiresAt = createCouponDto.expiresAt ? new Date(createCouponDto.expiresAt) : null;
        return this.prisma.coupon.create({
            data: {
                code: createCouponDto.code.toUpperCase(),
                description: createCouponDto.description || null,
                type: createCouponDto.type,
                value: createCouponDto.value,
                min_amount: createCouponDto.minAmount || null,
                max_discount: createCouponDto.maxDiscount || null,
                usage_limit: createCouponDto.usageLimit || null,
                status: createCouponDto.status || 'active',
                expires_at: expiresAt,
            },
        });
    }
    async findAll() {
        return this.prisma.coupon.findMany({
            orderBy: { created_at: 'desc' },
        });
    }
    async findOne(id) {
        const coupon = await this.prisma.coupon.findUnique({
            where: { id: parseInt(id) },
        });
        if (!coupon) {
            throw new common_1.NotFoundException(`Coupon with ID ${id} not found`);
        }
        return coupon;
    }
    async update(id, updateCouponDto) {
        const coupon = await this.findOne(id);
        if (updateCouponDto.code && updateCouponDto.code.toUpperCase() !== coupon.code) {
            const existingCoupon = await this.prisma.coupon.findUnique({
                where: { code: updateCouponDto.code.toUpperCase() },
            });
            if (existingCoupon) {
                throw new common_1.ConflictException('Coupon with this code already exists');
            }
        }
        if (updateCouponDto.type === 'percentage' && updateCouponDto.value && updateCouponDto.value > 100) {
            throw new common_1.BadRequestException('Percentage discount cannot exceed 100%');
        }
        const expiresAt = updateCouponDto.expiresAt ? new Date(updateCouponDto.expiresAt) : undefined;
        return this.prisma.coupon.update({
            where: { id: parseInt(id) },
            data: {
                ...(updateCouponDto.code && { code: updateCouponDto.code.toUpperCase() }),
                ...(updateCouponDto.description !== undefined && { description: updateCouponDto.description }),
                ...(updateCouponDto.type && { type: updateCouponDto.type }),
                ...(updateCouponDto.value !== undefined && { value: updateCouponDto.value }),
                ...(updateCouponDto.minAmount !== undefined && { min_amount: updateCouponDto.minAmount }),
                ...(updateCouponDto.maxDiscount !== undefined && { max_discount: updateCouponDto.maxDiscount }),
                ...(updateCouponDto.usageLimit !== undefined && { usage_limit: updateCouponDto.usageLimit }),
                ...(updateCouponDto.status && { status: updateCouponDto.status }),
                ...(expiresAt !== undefined && { expires_at: expiresAt }),
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.coupon.delete({
            where: { id: parseInt(id) },
        });
    }
};
exports.CouponsService = CouponsService;
exports.CouponsService = CouponsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CouponsService);
//# sourceMappingURL=coupons.service.js.map