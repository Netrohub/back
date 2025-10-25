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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
let CartService = class CartService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async getUserFromToken(token) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
                select: { id: true, email: true, name: true }
            });
            return user;
        }
        catch (error) {
            return null;
        }
    }
    async getCart(userId) {
        const cartItems = await this.prisma.cartItem.findMany({
            where: { user_id: userId, status: 'active' },
            include: { product: true },
        });
        const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.product.price) * item.quantity), 0);
        const serviceFee = subtotal * 0.05;
        const total = subtotal + serviceFee;
        return {
            items: cartItems,
            subtotal,
            service_fee: serviceFee,
            total,
            items_count: cartItems.length,
        };
    }
    async addToCart(userId, addToCartDto) {
        const existingItem = await this.prisma.cartItem.findFirst({
            where: {
                user_id: userId,
                product_id: Number(addToCartDto.productId),
                status: 'active',
            },
        });
        if (existingItem) {
            return this.prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + addToCartDto.quantity },
            });
        }
        return this.prisma.cartItem.create({
            data: {
                user_id: userId,
                product_id: Number(addToCartDto.productId),
                quantity: addToCartDto.quantity,
            },
        });
    }
    async updateCartItem(userId, itemId, updateCartItemDto) {
        return this.prisma.cartItem.updateMany({
            where: { id: itemId, user_id: userId },
            data: { quantity: updateCartItemDto.quantity },
        });
    }
    async removeFromCart(userId, itemId) {
        return this.prisma.cartItem.updateMany({
            where: { id: itemId, user_id: userId },
            data: { status: 'removed' },
        });
    }
    async clearCart(userId) {
        return this.prisma.cartItem.updateMany({
            where: { user_id: userId, status: 'active' },
            data: { status: 'removed' },
        });
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], CartService);
//# sourceMappingURL=cart.service.js.map