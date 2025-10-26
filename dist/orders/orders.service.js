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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createOrderDto) {
        const { items, shipping_address, payment_method } = createOrderDto;
        let totalAmount = 0;
        for (const item of items) {
            const product = await this.prisma.product.findUnique({
                where: { id: item.product_id },
            });
            if (!product) {
                throw new common_1.NotFoundException(`Product with ID ${item.product_id} not found`);
            }
            if (product.status !== 'active') {
                throw new common_1.BadRequestException(`Product ${product.name} is not available`);
            }
            totalAmount += Number(product.price) * item.quantity;
        }
        const productPrices = await Promise.all(items.map((item) => this.prisma.product.findUnique({
            where: { id: item.product_id },
            select: { price: true },
        })));
        const order = await this.prisma.order.create({
            data: {
                user_id: userId,
                total_amount: totalAmount,
                status: 'pending',
                payment_status: 'pending',
                payment_method,
                shipping_address: shipping_address,
                items: {
                    create: items.map((item, index) => ({
                        product_id: item.product_id,
                        quantity: item.quantity,
                        price: Number(productPrices[index]?.price || 0),
                    })),
                },
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        return order;
    }
    async findAll(userId, userRole) {
        const where = userRole === 'admin' ? {} : { user_id: userId };
        return this.prisma.order.findMany({
            where,
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                images: true,
                                price: true,
                            },
                        },
                    },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                created_at: 'desc',
            },
        });
    }
    async findOne(id, userId, userRole) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                images: true,
                                price: true,
                                description: true,
                            },
                        },
                    },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        if (userRole !== 'admin' && order.user_id !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to view this order');
        }
        return order;
    }
    async update(id, updateOrderDto, userId, userRole) {
        const order = await this.prisma.order.findUnique({
            where: { id },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        if (userRole !== 'admin') {
            throw new common_1.ForbiddenException('Only admins can update orders');
        }
        return this.prisma.order.update({
            where: { id },
            data: updateOrderDto,
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async cancel(id, userId) {
        const order = await this.prisma.order.findUnique({
            where: { id },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        if (order.user_id !== userId) {
            throw new common_1.ForbiddenException('You can only cancel your own orders');
        }
        if (!['pending', 'processing'].includes(order.status)) {
            throw new common_1.BadRequestException(`Cannot cancel order with status: ${order.status}`);
        }
        return this.prisma.order.update({
            where: { id },
            data: {
                status: 'cancelled',
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }
    async remove(id, userId, userRole) {
        const order = await this.prisma.order.findUnique({
            where: { id },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        if (userRole !== 'admin') {
            throw new common_1.ForbiddenException('Only admins can delete orders');
        }
        await this.prisma.order.delete({
            where: { id },
        });
        return { message: 'Order deleted successfully' };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map