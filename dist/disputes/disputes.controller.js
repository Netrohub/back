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
exports.DisputesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const disputes_service_1 = require("./disputes.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const decorators_1 = require("../auth/decorators");
const decorators_2 = require("../auth/decorators");
let DisputesController = class DisputesController {
    disputesService;
    constructor(disputesService) {
        this.disputesService = disputesService;
    }
    async getDisputes(user) {
        return this.disputesService.getDisputes(user.id);
    }
    async getDisputeById(user, id) {
        return this.disputesService.getDisputeById(+id, user.id);
    }
    async createDispute(user, createDisputeDto) {
        return this.disputesService.createDispute(user.id, createDisputeDto.orderId, createDisputeDto.reason, createDisputeDto.description);
    }
    async getAdminDisputes() {
        return this.disputesService.getAdminDisputes();
    }
    async updateDisputeStatus(user, id, updateStatusDto) {
        return this.disputesService.updateDisputeStatus(+id, updateStatusDto.status, user.id);
    }
};
exports.DisputesController = DisputesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user disputes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Disputes retrieved successfully' }),
    __param(0, (0, decorators_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DisputesController.prototype, "getDisputes", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get dispute by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dispute retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Dispute not found' }),
    __param(0, (0, decorators_2.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DisputesController.prototype, "getDisputeById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new dispute' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Dispute created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found' }),
    __param(0, (0, decorators_2.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DisputesController.prototype, "createDispute", null);
__decorate([
    (0, common_1.Get)('admin/all'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all disputes (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All disputes retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DisputesController.prototype, "getAdminDisputes", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Update dispute status (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dispute status updated successfully' }),
    __param(0, (0, decorators_2.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], DisputesController.prototype, "updateDisputeStatus", null);
exports.DisputesController = DisputesController = __decorate([
    (0, swagger_1.ApiTags)('disputes'),
    (0, common_1.Controller)('disputes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [disputes_service_1.DisputesService])
], DisputesController);
//# sourceMappingURL=disputes.controller.js.map