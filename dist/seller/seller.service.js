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
exports.SellerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SellerService = class SellerService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSellerDashboard(sellerId) {
        const totalProducts = await this.prisma.product.count({
            where: { seller_id: sellerId },
        });
        const totalOrders = await this.prisma.order.count({
            where: {
                items: {
                    some: {
                        product: {
                            seller_id: sellerId,
                        },
                    },
                },
            },
        });
        const totalRevenue = await this.prisma.order.aggregate({
            where: {
                items: {
                    some: {
                        product: {
                            seller_id: sellerId,
                        },
                    },
                },
                status: 'completed',
            },
            _sum: {
                total_amount: true,
            },
        });
        const recentOrders = await this.prisma.order.findMany({
            where: {
                items: {
                    some: {
                        product: {
                            seller_id: sellerId,
                        },
                    },
                },
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                items: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: { created_at: 'desc' },
            take: 5,
        });
        return {
            stats: {
                totalProducts,
                totalOrders,
                totalRevenue: totalRevenue._sum.total_amount || 0,
            },
            recentOrders,
        };
    }
    async getSellerProducts(sellerId) {
        return this.prisma.product.findMany({
            where: { seller_id: sellerId },
            include: {
                seller: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                _count: {
                    select: {
                        cart_items: true,
                        wishlist_items: true,
                    },
                },
            },
            orderBy: { created_at: 'desc' },
        });
    }
    async getSellerOrders(sellerId) {
        return this.prisma.order.findMany({
            where: {
                items: {
                    some: {
                        product: {
                            seller_id: sellerId,
                        },
                    },
                },
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                items: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: { created_at: 'desc' },
        });
    }
    async getSellerPayouts(sellerId) {
        return [
            {
                id: 1,
                amount: 1500.00,
                status: 'completed',
                created_at: new Date(),
                description: 'Monthly payout',
            },
        ];
    }
    async getSellerNotifications(sellerId) {
        return [
            {
                id: 1,
                type: 'order',
                message: 'New order received',
                read: false,
                created_at: new Date(),
            },
            {
                id: 2,
                type: 'payment',
                message: 'Payment received',
                read: true,
                created_at: new Date(),
            },
        ];
    }
};
exports.SellerService = SellerService;
exports.SellerService = SellerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SellerService);
//# sourceMappingURL=seller.service.js.map