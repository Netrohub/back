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
exports.AuditLogsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AuditLogsService = class AuditLogsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const where = {};
        if (query.user_id) {
            where.user_id = query.user_id;
        }
        if (query.action) {
            where.action = query.action;
        }
        if (query.entity_type) {
            where.entity_type = query.entity_type;
        }
        if (query.entity_id) {
            where.entity_id = query.entity_id;
        }
        if (query.start_date || query.end_date) {
            where.created_at = {};
            if (query.start_date) {
                where.created_at.gte = new Date(query.start_date);
            }
            if (query.end_date) {
                where.created_at.lte = new Date(query.end_date);
            }
        }
        const page = query.page || 1;
        const limit = query.limit || 50;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.auditLog.findMany({
                where,
                orderBy: { created_at: 'desc' },
                skip,
                take: limit,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            }),
            this.prisma.auditLog.count({ where }),
        ]);
        return {
            data,
            pagination: {
                total,
                page,
                limit,
                total_pages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const auditLog = await this.prisma.auditLog.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        if (!auditLog) {
            throw new common_1.NotFoundException('Audit log not found');
        }
        return auditLog;
    }
    async export(query) {
        const where = {};
        if (query.user_id) {
            where.user_id = query.user_id;
        }
        if (query.action) {
            where.action = query.action;
        }
        if (query.entity_type) {
            where.entity_type = query.entity_type;
        }
        if (query.entity_id) {
            where.entity_id = query.entity_id;
        }
        if (query.start_date || query.end_date) {
            where.created_at = {};
            if (query.start_date) {
                where.created_at.gte = new Date(query.start_date);
            }
            if (query.end_date) {
                where.created_at.lte = new Date(query.end_date);
            }
        }
        return this.prisma.auditLog.findMany({
            where,
            orderBy: { created_at: 'desc' },
            include: {
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
};
exports.AuditLogsService = AuditLogsService;
exports.AuditLogsService = AuditLogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuditLogsService);
//# sourceMappingURL=audit-logs.service.js.map