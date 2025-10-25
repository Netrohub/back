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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    prisma;
    jwtService;
    configService;
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async validateUser(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return null;
        }
        if (user.locked_until && user.locked_until > new Date()) {
            throw new common_1.UnauthorizedException('Account is temporarily locked due to too many failed login attempts');
        }
        if (!user.is_active) {
            throw new common_1.UnauthorizedException('Account is deactivated');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    login_attempts: 0,
                    locked_until: null,
                    last_login_at: new Date(),
                },
            });
            const { password: _, ...result } = user;
            return result;
        }
        else {
            const newAttempts = user.login_attempts + 1;
            const lockUntil = newAttempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null;
            await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    login_attempts: newAttempts,
                    locked_until: lockUntil,
                },
            });
            return null;
        }
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            username: user.username,
            name: user.name,
            roles: typeof user.roles === 'string' ? JSON.parse(user.roles) : user.roles,
        };
        return {
            data: {
                user,
                access_token: this.jwtService.sign(payload),
                token_type: 'Bearer',
                expires_in: this.configService.get('JWT_EXPIRES_IN', '7d'),
            },
            message: 'Login successful',
            status: 'success'
        };
    }
    async register(registerDto) {
        const existingUserByEmail = await this.prisma.user.findUnique({
            where: { email: registerDto.email },
        });
        if (existingUserByEmail) {
            throw new common_1.ConflictException({
                message: 'User with this email already exists',
                status: 'error',
                errors: { email: ['Email is already registered'] }
            });
        }
        const existingUserByUsername = await this.prisma.user.findUnique({
            where: { username: registerDto.username },
        });
        if (existingUserByUsername) {
            throw new common_1.ConflictException({
                message: 'Username already taken',
                status: 'error',
                errors: { username: ['Username is already taken'] }
            });
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 12);
        const user = await this.prisma.user.create({
            data: {
                username: registerDto.username,
                name: registerDto.name,
                email: registerDto.email,
                password: hashedPassword,
                phone: registerDto.phone,
                roles: JSON.stringify(['user']),
                kyc_status: JSON.stringify({
                    email: false,
                    phone: false,
                    identity: false,
                }),
            },
        });
        const { password: _, ...userWithoutPassword } = user;
        const payload = {
            sub: user.id,
            email: user.email,
            username: user.username,
            name: user.name,
            roles: typeof user.roles === 'string' ? JSON.parse(user.roles) : user.roles,
        };
        return {
            data: {
                user: userWithoutPassword,
                access_token: this.jwtService.sign(payload),
                token_type: 'Bearer',
                expires_in: this.configService.get('JWT_EXPIRES_IN', '7d'),
            },
            message: 'Registration successful',
            status: 'success'
        };
    }
    async getCurrentUser(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async verifyToken(token) {
        try {
            const payload = this.jwtService.verify(token);
            return this.getCurrentUser(payload.sub);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async verifyPhone(userId, phone, code) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        await this.prisma.user.update({
            where: { id: userId },
            data: { phone },
        });
        return { message: 'Phone verified successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map