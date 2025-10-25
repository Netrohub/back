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
exports.SellerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const seller_service_1 = require("./seller.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const decorators_1 = require("../auth/decorators");
const decorators_2 = require("../auth/decorators");
let SellerController = class SellerController {
    sellerService;
    constructor(sellerService) {
        this.sellerService = sellerService;
    }
    async getSellerDashboard(user) {
        return this.sellerService.getSellerDashboard(user.id);
    }
    async getSellerProducts(user) {
        return this.sellerService.getSellerProducts(user.id);
    }
    async getSellerOrders(user) {
        return this.sellerService.getSellerOrders(user.id);
    }
    async getSellerPayouts(user) {
        return this.sellerService.getSellerPayouts(user.id);
    }
    async getSellerNotifications(user) {
        return this.sellerService.getSellerNotifications(user.id);
    }
};
exports.SellerController = SellerController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, swagger_1.ApiOperation)({ summary: 'Get seller dashboard' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dashboard data retrieved successfully' }),
    __param(0, (0, decorators_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "getSellerDashboard", null);
__decorate([
    (0, common_1.Get)('products'),
    (0, swagger_1.ApiOperation)({ summary: 'Get seller products' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Products retrieved successfully' }),
    __param(0, (0, decorators_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "getSellerProducts", null);
__decorate([
    (0, common_1.Get)('orders'),
    (0, swagger_1.ApiOperation)({ summary: 'Get seller orders' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Orders retrieved successfully' }),
    __param(0, (0, decorators_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "getSellerOrders", null);
__decorate([
    (0, common_1.Get)('payouts'),
    (0, swagger_1.ApiOperation)({ summary: 'Get seller payouts' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payouts retrieved successfully' }),
    __param(0, (0, decorators_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "getSellerPayouts", null);
__decorate([
    (0, common_1.Get)('notifications'),
    (0, swagger_1.ApiOperation)({ summary: 'Get seller notifications' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notifications retrieved successfully' }),
    __param(0, (0, decorators_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "getSellerNotifications", null);
exports.SellerController = SellerController = __decorate([
    (0, swagger_1.ApiTags)('seller'),
    (0, common_1.Controller)('seller'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)('seller', 'admin'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [seller_service_1.SellerService])
], SellerController);
//# sourceMappingURL=seller.controller.js.map