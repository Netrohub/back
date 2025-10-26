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
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TicketsService = class TicketsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTicketDto, userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.prisma.ticket.create({
            data: {
                user_id: userId,
                subject: createTicketDto.subject,
                message: createTicketDto.message,
                priority: createTicketDto.priority || 'medium',
                category: createTicketDto.category || 'general',
                status: 'open',
            },
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
    async findAll(filters) {
        const where = {};
        if (filters?.user_id) {
            where.user_id = filters.user_id;
        }
        if (filters?.status) {
            where.status = filters.status;
        }
        if (filters?.priority) {
            where.priority = filters.priority;
        }
        if (filters?.assigned_to !== undefined) {
            if (filters.assigned_to === null) {
                where.assigned_to = null;
            }
            else {
                where.assigned_to = filters.assigned_to;
            }
        }
        return this.prisma.ticket.findMany({
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
                assigned_admin: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async findOne(id) {
        const ticket = await this.prisma.ticket.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                assigned_admin: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        if (!ticket) {
            throw new common_1.NotFoundException('Ticket not found');
        }
        return ticket;
    }
    async update(id, updateTicketDto) {
        const ticket = await this.findOne(id);
        const updateData = {};
        if (updateTicketDto.status) {
            updateData.status = updateTicketDto.status;
            if (updateTicketDto.status === 'resolved') {
                updateData.resolved_at = new Date();
            }
        }
        if (updateTicketDto.priority) {
            updateData.priority = updateTicketDto.priority;
        }
        if (updateTicketDto.assigned_to !== undefined) {
            if (updateTicketDto.assigned_to === null || updateTicketDto.assigned_to === 0) {
                updateData.assigned_to = null;
            }
            else {
                const assignedUser = await this.prisma.user.findUnique({
                    where: { id: updateTicketDto.assigned_to },
                });
                if (!assignedUser) {
                    throw new common_1.NotFoundException('Assigned user not found');
                }
                const roles = Array.isArray(assignedUser.roles) ? assignedUser.roles : [assignedUser.roles];
                if (!roles.includes('admin')) {
                    throw new common_1.BadRequestException('Assigned user must be an admin');
                }
                updateData.assigned_to = updateTicketDto.assigned_to;
            }
        }
        return this.prisma.ticket.update({
            where: { id: parseInt(id) },
            data: updateData,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                assigned_admin: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async remove(id) {
        const ticket = await this.findOne(id);
        return this.prisma.ticket.delete({
            where: { id: parseInt(id) },
        });
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map