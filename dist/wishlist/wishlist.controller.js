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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const wishlist_service_1 = require("./wishlist.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const decorators_1 = require("../auth/decorators");
let WishlistController = class WishlistController {
    wishlistService;
    constructor(wishlistService) {
        this.wishlistService = wishlistService;
    }
    async getWishlist(user) {
        return this.wishlistService.getWishlist(user.id);
    }
    async addToWishlist(user, productId) {
        return this.wishlistService.addToWishlist(user.id, +productId);
    }
    async removeFromWishlist(user, productId) {
        return this.wishlistService.removeFromWishlist(user.id, +productId);
    }
};
exports.WishlistController = WishlistController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user wishlist' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Wishlist retrieved successfully' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WishlistController.prototype, "getWishlist", null);
__decorate([
    (0, common_1.Post)(':productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Add product to wishlist' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product added to wishlist' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WishlistController.prototype, "addToWishlist", null);
__decorate([
    (0, common_1.Delete)(':productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove product from wishlist' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product removed from wishlist' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Item not found in wishlist' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WishlistController.prototype, "removeFromWishlist", null);
exports.WishlistController = WishlistController = __decorate([
    (0, swagger_1.ApiTags)('wishlist'),
    (0, common_1.Controller)('wishlist'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [wishlist_service_1.WishlistService])
], WishlistController);
//# sourceMappingURL=wishlist.controller.js.map