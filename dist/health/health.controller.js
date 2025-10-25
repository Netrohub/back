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
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const database_health_service_1 = require("../common/database-health.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const decorators_1 = require("../auth/decorators");
let HealthController = class HealthController {
    databaseHealthService;
    constructor(databaseHealthService) {
        this.databaseHealthService = databaseHealthService;
    }
    check() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            service: 'nxoland-backend',
            version: '1.0.0',
        };
    }
    async checkDatabase() {
        const [connection, stats, integrity] = await Promise.all([
            this.databaseHealthService.checkConnection(),
            this.databaseHealthService.getDatabaseStats(),
            this.databaseHealthService.checkDataIntegrity(),
        ]);
        return {
            connection,
            stats,
            integrity,
            timestamp: new Date().toISOString(),
        };
    }
    async adminHealthCheck() {
        const [connection, stats, integrity, optimization] = await Promise.all([
            this.databaseHealthService.checkConnection(),
            this.databaseHealthService.getDatabaseStats(),
            this.databaseHealthService.checkDataIntegrity(),
            this.databaseHealthService.optimizeDatabase(),
        ]);
        return {
            connection,
            stats,
            integrity,
            optimization,
            timestamp: new Date().toISOString(),
        };
    }
    async cleanupOrphanedData() {
        const results = await this.databaseHealthService.cleanupOrphanedData();
        return {
            results,
            message: 'Orphaned data cleanup completed',
            timestamp: new Date().toISOString(),
        };
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Health check endpoint' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Service is healthy' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "check", null);
__decorate([
    (0, common_1.Get)('database'),
    (0, swagger_1.ApiOperation)({ summary: 'Database health check' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Database health status' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "checkDatabase", null);
__decorate([
    (0, common_1.Get)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Admin health check' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Admin health status' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "adminHealthCheck", null);
__decorate([
    (0, common_1.Get)('cleanup'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Cleanup orphaned data' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cleanup completed' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "cleanupOrphanedData", null);
exports.HealthController = HealthController = __decorate([
    (0, swagger_1.ApiTags)('health'),
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [database_health_service_1.DatabaseHealthService])
], HealthController);
//# sourceMappingURL=health.controller.js.map