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
exports.DatabaseHealthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DatabaseHealthService = class DatabaseHealthService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkConnection() {
        try {
            await this.prisma.$queryRaw `SELECT 1`;
            return true;
        }
        catch (error) {
            console.error('Database connection failed:', error);
            return false;
        }
    }
    async getDatabaseStats() {
        try {
            const [userCount, productCount, orderCount, disputeCount, activeUsers, inactiveUsers, pendingOrders, resolvedDisputes,] = await Promise.all([
                this.prisma.user.count(),
                this.prisma.product.count(),
                this.prisma.order.count(),
                this.prisma.dispute.count(),
                this.prisma.user.count({ where: { is_active: true } }),
                this.prisma.user.count({ where: { is_active: false } }),
                this.prisma.order.count({ where: { status: 'pending' } }),
                this.prisma.dispute.count({ where: { status: 'resolved' } }),
            ]);
            return {
                users: {
                    total: userCount,
                    active: activeUsers,
                    inactive: inactiveUsers,
                },
                products: {
                    total: productCount,
                },
                orders: {
                    total: orderCount,
                    pending: pendingOrders,
                },
                disputes: {
                    total: disputeCount,
                    resolved: resolvedDisputes,
                },
            };
        }
        catch (error) {
            console.error('Error getting database stats:', error);
            throw error;
        }
    }
    async checkDataIntegrity() {
        const issues = [];
        try {
            const orphanedCartItems = await this.prisma.cartItem.findMany({
                where: {
                    OR: [
                        { user: null },
                        { product: null },
                    ],
                },
            });
            if (orphanedCartItems.length > 0) {
                issues.push(`Found ${orphanedCartItems.length} orphaned cart items`);
            }
            const orphanedOrderItems = await this.prisma.orderItem.findMany({
                where: {
                    OR: [
                        { order: null },
                        { product: null },
                    ],
                },
            });
            if (orphanedOrderItems.length > 0) {
                issues.push(`Found ${orphanedOrderItems.length} orphaned order items`);
            }
            const usersWithInvalidRoles = await this.prisma.user.findMany({
                where: {
                    roles: {
                        not: {
                            in: [
                                '["user"]',
                                '["seller"]',
                                '["admin"]',
                                '["moderator"]',
                                '["super_admin"]',
                                '["user","seller"]',
                                '["user","admin"]',
                                '["user","moderator"]',
                            ],
                        },
                    },
                },
            });
            if (usersWithInvalidRoles.length > 0) {
                issues.push(`Found ${usersWithInvalidRoles.length} users with invalid roles`);
            }
            const productsWithoutSellers = await this.prisma.product.findMany({
                where: { seller_id: null },
            });
            if (productsWithoutSellers.length > 0) {
                issues.push(`Found ${productsWithoutSellers.length} products without sellers`);
            }
            return {
                healthy: issues.length === 0,
                issues,
                checkedAt: new Date(),
            };
        }
        catch (error) {
            console.error('Error checking data integrity:', error);
            return {
                healthy: false,
                issues: [`Database integrity check failed: ${error.message}`],
                checkedAt: new Date(),
            };
        }
    }
    async cleanupOrphanedData() {
        const results = {
            cartItemsRemoved: 0,
            orderItemsRemoved: 0,
            wishlistItemsRemoved: 0,
        };
        try {
            const orphanedCartItems = await this.prisma.cartItem.findMany({
                where: {
                    OR: [
                        { user: null },
                        { product: null },
                    ],
                },
            });
            if (orphanedCartItems.length > 0) {
                await this.prisma.cartItem.deleteMany({
                    where: {
                        id: { in: orphanedCartItems.map(item => item.id) },
                    },
                });
                results.cartItemsRemoved = orphanedCartItems.length;
            }
            const orphanedOrderItems = await this.prisma.orderItem.findMany({
                where: {
                    OR: [
                        { order: null },
                        { product: null },
                    ],
                },
            });
            if (orphanedOrderItems.length > 0) {
                await this.prisma.orderItem.deleteMany({
                    where: {
                        id: { in: orphanedOrderItems.map(item => item.id) },
                    },
                });
                results.orderItemsRemoved = orphanedOrderItems.length;
            }
            const orphanedWishlistItems = await this.prisma.wishlistItem.findMany({
                where: {
                    OR: [
                        { user: null },
                        { product: null },
                    ],
                },
            });
            if (orphanedWishlistItems.length > 0) {
                await this.prisma.wishlistItem.deleteMany({
                    where: {
                        id: { in: orphanedWishlistItems.map(item => item.id) },
                    },
                });
                results.wishlistItemsRemoved = orphanedWishlistItems.length;
            }
            return results;
        }
        catch (error) {
            console.error('Error cleaning up orphaned data:', error);
            throw error;
        }
    }
    async optimizeDatabase() {
        try {
            await this.prisma.$executeRaw `ANALYZE TABLE users`;
            await this.prisma.$executeRaw `ANALYZE TABLE products`;
            await this.prisma.$executeRaw `ANALYZE TABLE orders`;
            await this.prisma.$executeRaw `ANALYZE TABLE disputes`;
            await this.prisma.$executeRaw `ANALYZE TABLE cart`;
            await this.prisma.$executeRaw `ANALYZE TABLE wishlist`;
            return { message: 'Database optimization completed' };
        }
        catch (error) {
            console.error('Error optimizing database:', error);
            throw error;
        }
    }
    async getSlowQueries() {
        try {
            return { message: 'Slow query analysis not implemented for this database type' };
        }
        catch (error) {
            console.error('Error getting slow queries:', error);
            throw error;
        }
    }
};
exports.DatabaseHealthService = DatabaseHealthService;
exports.DatabaseHealthService = DatabaseHealthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DatabaseHealthService);
//# sourceMappingURL=database-health.service.js.map