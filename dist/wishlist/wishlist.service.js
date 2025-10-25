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
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WishlistService = class WishlistService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getWishlist(userId) {
        const wishlistItems = await this.prisma.wishlistItem.findMany({
            where: { user_id: userId },
            include: { product: true },
        });
        return wishlistItems.map(item => item.product);
    }
    async addToWishlist(userId, productId) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        const existingItem = await this.prisma.wishlistItem.findFirst({
            where: {
                user_id: userId,
                product_id: productId,
            },
        });
        if (existingItem) {
            return { message: 'Product already in wishlist' };
        }
        return this.prisma.wishlistItem.create({
            data: {
                user_id: userId,
                product_id: productId,
            },
            include: { product: true },
        });
    }
    async removeFromWishlist(userId, productId) {
        const wishlistItem = await this.prisma.wishlistItem.findFirst({
            where: {
                user_id: userId,
                product_id: productId,
            },
        });
        if (!wishlistItem) {
            throw new common_1.NotFoundException('Item not found in wishlist');
        }
        await this.prisma.wishlistItem.delete({
            where: { id: wishlistItem.id },
        });
        return { message: 'Item removed from wishlist' };
    }
};
exports.WishlistService = WishlistService;
exports.WishlistService = WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WishlistService);
//# sourceMappingURL=wishlist.service.js.map