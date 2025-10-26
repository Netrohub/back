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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const validation_service_1 = require("../common/validation.service");
let UsersService = class UsersService {
    prisma;
    validationService;
    constructor(prisma, validationService) {
        this.prisma = prisma;
        this.validationService = validationService;
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                name: true,
                email: true,
                phone: true,
                avatar: true,
                roles: true,
                kyc_status: true,
                email_verified_at: true,
                phone_verified_at: true,
                identity_verified_at: true,
                created_at: true,
                updated_at: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async findByUsername(username) {
        const user = await this.prisma.user.findUnique({
            where: { username },
            select: {
                id: true,
                username: true,
                name: true,
                avatar: true,
                roles: true,
                kyc_status: true,
                email_verified_at: true,
                phone_verified_at: true,
                identity_verified_at: true,
                created_at: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async update(id, updateUserDto) {
        if (updateUserDto.name) {
            this.validationService.validateName(updateUserDto.name);
        }
        if (updateUserDto.phone) {
            this.validationService.validatePhone(updateUserDto.phone);
        }
        const existingUser = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!existingUser) {
            throw new common_1.NotFoundException('User not found');
        }
        const sanitizedData = {};
        if (updateUserDto.name) {
            sanitizedData.name = this.validationService.sanitizeString(updateUserDto.name, 255);
        }
        if (updateUserDto.phone) {
            sanitizedData.phone = this.validationService.sanitizeString(updateUserDto.phone, 20);
        }
        const user = await this.prisma.user.update({
            where: { id },
            data: sanitizedData,
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                avatar: true,
                roles: true,
                kyc_status: true,
                email_verified_at: true,
                phone_verified_at: true,
                identity_verified_at: true,
                created_at: true,
                updated_at: true,
            },
        });
        return user;
    }
    async updatePassword(id, updatePasswordDto) {
        this.validationService.validatePassword(updatePasswordDto.newPassword);
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const bcrypt = require('bcrypt');
        const isCurrentPasswordValid = await bcrypt.compare(updatePasswordDto.currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            throw new common_1.BadRequestException('Current password is incorrect');
        }
        const isSamePassword = await bcrypt.compare(updatePasswordDto.newPassword, user.password);
        if (isSamePassword) {
            throw new common_1.BadRequestException('New password must be different from current password');
        }
        const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 12);
        await this.prisma.user.update({
            where: { id },
            data: { password: hashedPassword },
        });
        return { message: 'Password updated successfully' };
    }
    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                avatar: true,
                roles: true,
                kyc_status: true,
                email_verified_at: true,
                phone_verified_at: true,
                identity_verified_at: true,
                created_at: true,
                updated_at: true,
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        validation_service_1.ValidationService])
], UsersService);
//# sourceMappingURL=users.service.js.map