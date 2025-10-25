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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUsers(page = 1, perPage = 10, search, role, status) {
        const skip = (page - 1) * perPage;
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { username: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (role) {
            where.roles = { contains: role };
        }
        if (status) {
            where.is_active = status === 'active';
        }
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: perPage,
                select: {
                    id: true,
                    username: true,
                    name: true,
                    email: true,
                    phone: true,
                    roles: true,
                    is_active: true,
                    kyc_verified: true,
                    created_at: true,
                    last_login_at: true,
                },
                orderBy: { created_at: 'desc' },
            }),
            this.prisma.user.count({ where }),
        ]);
        return {
            data: users,
            pagination: {
                page,
                per_page: perPage,
                total,
                total_pages: Math.ceil(total / perPage),
            },
        };
    }
    async getUser(id) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                name: true,
                email: true,
                phone: true,
                avatar: true,
                roles: true,
                is_active: true,
                kyc_verified: true,
                kyc_status: true,
                created_at: true,
                updated_at: true,
                last_login_at: true,
            },
        });
    }
    async updateUser(id, updateData) {
        return this.prisma.user.update({
            where: { id },
            data: updateData,
        });
    }
    async deleteUser(id) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
    async getOrders(page = 1, perPage = 10, status, dateFrom, dateTo) {
        const skip = (page - 1) * perPage;
        const where = {};
        if (status) {
            where.status = status;
        }
        if (dateFrom || dateTo) {
            where.created_at = {};
            if (dateFrom)
                where.created_at.gte = new Date(dateFrom);
            if (dateTo)
                where.created_at.lte = new Date(dateTo);
        }
        const [orders, total] = await Promise.all([
            this.prisma.order.findMany({
                where,
                skip,
                take: perPage,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            username: true,
                        },
                    },
                    items: {
                        include: {
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    price: true,
                                },
                            },
                        },
                    },
                },
                orderBy: { created_at: 'desc' },
            }),
            this.prisma.order.count({ where }),
        ]);
        return {
            data: orders,
            pagination: {
                page,
                per_page: perPage,
                total,
                total_pages: Math.ceil(total / perPage),
            },
        };
    }
    async getOrder(id) {
        return this.prisma.order.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        username: true,
                    },
                },
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async updateOrderStatus(id, status) {
        return this.prisma.order.update({
            where: { id },
            data: { status },
        });
    }
    async getVendors(page = 1, perPage = 10, search, status) {
        const skip = (page - 1) * perPage;
        const where = {
            roles: { contains: 'seller' },
        };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { username: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (status) {
            where.is_active = status === 'active';
        }
        const [vendors, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: perPage,
                select: {
                    id: true,
                    username: true,
                    name: true,
                    email: true,
                    phone: true,
                    roles: true,
                    is_active: true,
                    kyc_verified: true,
                    created_at: true,
                    last_login_at: true,
                    products: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            status: true,
                        },
                    },
                },
                orderBy: { created_at: 'desc' },
            }),
            this.prisma.user.count({ where }),
        ]);
        return {
            data: vendors,
            pagination: {
                page,
                per_page: perPage,
                total,
                total_pages: Math.ceil(total / perPage),
            },
        };
    }
    async getVendor(id) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                name: true,
                email: true,
                phone: true,
                avatar: true,
                roles: true,
                is_active: true,
                kyc_verified: true,
                kyc_status: true,
                created_at: true,
                updated_at: true,
                last_login_at: true,
                products: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        status: true,
                        created_at: true,
                    },
                },
            },
        });
    }
    async updateVendorStatus(id, status) {
        return this.prisma.user.update({
            where: { id },
            data: { is_active: status === 'active' },
        });
    }
    async getListings(page = 1, perPage = 10, status, category) {
        const skip = (page - 1) * perPage;
        const where = {};
        if (status) {
            where.status = status;
        }
        if (category) {
            where.category = category;
        }
        const [listings, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                skip,
                take: perPage,
                include: {
                    seller: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            username: true,
                        },
                    },
                },
                orderBy: { created_at: 'desc' },
            }),
            this.prisma.product.count({ where }),
        ]);
        return {
            data: listings,
            pagination: {
                page,
                per_page: perPage,
                total,
                total_pages: Math.ceil(total / perPage),
            },
        };
    }
    async getListing(id) {
        return this.prisma.product.findUnique({
            where: { id },
            include: {
                seller: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        username: true,
                    },
                },
            },
        });
    }
    async updateListingStatus(id, status) {
        return this.prisma.product.update({
            where: { id },
            data: { status },
        });
    }
    async getPayouts(page = 1, perPage = 10, status, dateFrom, dateTo) {
        return {
            data: [],
            pagination: {
                page,
                per_page: perPage,
                total: 0,
                total_pages: 0,
            },
        };
    }
    async getPayout(id) {
        return null;
    }
    async updatePayoutStatus(id, status) {
        return null;
    }
    async getDashboardStats() {
        const [totalUsers, activeUsers, totalOrders, totalProducts, totalRevenue, recentOrders,] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.user.count({ where: { is_active: true } }),
            this.prisma.order.count(),
            this.prisma.product.count(),
            this.prisma.order.aggregate({
                _sum: { total_amount: true },
            }),
            this.prisma.order.findMany({
                take: 5,
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                        },
                    },
                },
                orderBy: { created_at: 'desc' },
            }),
        ]);
        return {
            totalUsers,
            activeUsers,
            totalOrders,
            totalProducts,
            totalRevenue: totalRevenue._sum.total_amount || 0,
            recentOrders,
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map