/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("helmet");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("compression");

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(4);
const throttler_1 = __webpack_require__(8);
const bull_1 = __webpack_require__(9);
const prisma_module_1 = __webpack_require__(10);
const auth_module_1 = __webpack_require__(13);
const users_module_1 = __webpack_require__(30);
const products_module_1 = __webpack_require__(37);
const cart_module_1 = __webpack_require__(40);
const orders_module_1 = __webpack_require__(45);
const wishlist_module_1 = __webpack_require__(51);
const disputes_module_1 = __webpack_require__(54);
const kyc_module_1 = __webpack_require__(57);
const seller_module_1 = __webpack_require__(65);
const admin_module_1 = __webpack_require__(68);
const categories_module_1 = __webpack_require__(71);
const coupons_module_1 = __webpack_require__(76);
const payouts_module_1 = __webpack_require__(81);
const tickets_module_1 = __webpack_require__(87);
const audit_logs_module_1 = __webpack_require__(92);
const upload_module_1 = __webpack_require__(96);
const email_module_1 = __webpack_require__(64);
const notification_module_1 = __webpack_require__(97);
const health_module_1 = __webpack_require__(98);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            bull_1.BullModule.forRoot({
                redis: {
                    host: process.env.REDIS_HOST || 'localhost',
                    port: parseInt(process.env.REDIS_PORT || '6379'),
                    password: process.env.REDIS_PASSWORD || undefined,
                },
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            cart_module_1.CartModule,
            orders_module_1.OrdersModule,
            wishlist_module_1.WishlistModule,
            disputes_module_1.DisputesModule,
            kyc_module_1.KycModule,
            seller_module_1.SellerModule,
            admin_module_1.AdminModule,
            categories_module_1.CategoriesModule,
            coupons_module_1.CouponsModule,
            payouts_module_1.PayoutsModule,
            tickets_module_1.TicketsModule,
            audit_logs_module_1.AuditLogsModule,
            upload_module_1.UploadModule,
            email_module_1.EmailModule,
            notification_module_1.NotificationModule,
            health_module_1.HealthModule,
        ],
    })
], AppModule);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/bull");

/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(11);
let PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = PrismaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaModule);


/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(2);
const client_1 = __webpack_require__(12);
let PrismaService = class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(14);
const passport_1 = __webpack_require__(15);
const config_1 = __webpack_require__(4);
const auth_service_1 = __webpack_require__(16);
const auth_controller_1 = __webpack_require__(19);
const jwt_strategy_1 = __webpack_require__(27);
const jwt_auth_guard_1 = __webpack_require__(20);
const roles_guard_1 = __webpack_require__(29);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRES_IN', '7d'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService, jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard],
    })
], AuthModule);


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(14);
const config_1 = __webpack_require__(4);
const prisma_service_1 = __webpack_require__(11);
const bcrypt = __webpack_require__(17);
const crypto = __webpack_require__(18);
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
            include: {
                user_roles: {
                    include: {
                        role: true
                    }
                }
            }
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
                user_roles: {
                    create: {
                        role: {
                            connect: { slug: "user" }
                        }
                    }
                }
            },
            include: {
                user_roles: {
                    include: {
                        role: true
                    }
                }
            }
        });
        const { password: _, ...userWithoutPassword } = user;
        const payload = {
            sub: user.id,
            email: user.email,
            username: user.username,
            name: user.name,
            roles: user.user_roles?.map(ur => ur.role.slug) || ['user'],
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
            include: {
                user_roles: {
                    include: {
                        role: true
                    }
                }
            }
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const { password: _, ...userWithoutPassword } = user;
        const kycVerifications = await this.prisma.kycVerification.findMany({
            where: { user_id: user.id },
            orderBy: { created_at: 'desc' }
        });
        const hasIdentityVerification = kycVerifications.some(kyc => kyc.type === 'IDENTITY' && kyc.status === 'APPROVED');
        return {
            ...userWithoutPassword,
            emailVerified: !!user.email_verified_at,
            phoneVerified: !!user.phone_verified_at,
            kycStatus: hasIdentityVerification ? 'verified' : 'incomplete',
            roles: user.user_roles?.map(ur => ur.role.slug) || ['user'],
        };
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
    async requestPasswordReset(email) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpires = new Date(Date.now() + 3600000);
        return {
            message: 'Password reset email sent successfully',
            status: 'success'
        };
    }
    async resetPassword(token, password, passwordConfirmation) {
        if (password !== passwordConfirmation) {
            throw new common_1.BadRequestException('Passwords do not match');
        }
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return {
            message: 'Password reset successful',
            status: 'success'
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const openapi = __webpack_require__(3);
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(3);
const auth_service_1 = __webpack_require__(16);
const jwt_auth_guard_1 = __webpack_require__(20);
const decorators_1 = __webpack_require__(21);
const login_dto_1 = __webpack_require__(22);
const register_dto_1 = __webpack_require__(24);
const request_password_reset_dto_1 = __webpack_require__(25);
const reset_password_dto_1 = __webpack_require__(26);
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto) {
        return this.authService.login(loginDto);
    }
    async register(registerDto) {
        return this.authService.register(registerDto);
    }
    async getCurrentUser(user) {
        return this.authService.getCurrentUser(Number(user.id));
    }
    async logout() {
        return { message: 'Logout successful' };
    }
    async verifyPhone(user, verifyPhoneDto) {
        return this.authService.verifyPhone(user.id, verifyPhoneDto.phone, verifyPhoneDto.code);
    }
    async requestPasswordReset(requestPasswordResetDto) {
        return this.authService.requestPasswordReset(requestPasswordResetDto.email);
    }
    async resetPassword(resetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto.token, resetPasswordDto.password, resetPasswordDto.passwordConfirmation);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'User login' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login successful' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid credentials' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'User registration' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Registration successful' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'User already exists' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User data retrieved' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'User logout' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Logout successful' }),
    openapi.ApiResponse({ status: 201 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('verify-phone'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Verify phone number' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Phone verified successfully' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyPhone", null);
__decorate([
    (0, common_1.Post)('request-password-reset'),
    (0, swagger_1.ApiOperation)({ summary: 'Request password reset' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password reset email sent' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_password_reset_dto_1.RequestPasswordResetDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestPasswordReset", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, swagger_1.ApiOperation)({ summary: 'Reset password with token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password reset successful' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid or expired token' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(15);
const core_1 = __webpack_require__(1);
const decorators_1 = __webpack_require__(21);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    reflector;
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request?.headers?.authorization;
        console.log('🔐 JWT AuthGuard triggered:', {
            url: request?.url,
            method: request?.method,
            hasToken: !!token,
            tokenPreview: token ? token.substring(0, 30) + '...' : 'none',
            allHeaders: request?.headers,
            rawHeaders: request?.rawHeaders
        });
        const isPublic = this.reflector.getAllAndOverride(decorators_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
    handleRequest(err, user, info) {
        if (err || !user) {
            console.error('❌ JWT AuthGuard: Authentication failed', {
                error: err,
                info: info?.message || info?.name || info
            });
            throw err || new Error(info?.message || 'Authentication failed');
        }
        console.log('✅ JWT AuthGuard: Authentication successful for user:', user.id);
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], JwtAuthGuard);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = exports.Roles = exports.ROLES_KEY = exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(2);
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const openapi = __webpack_require__(3);
const class_validator_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(3);
class LoginDto {
    email;
    password;
    remember;
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 6 }, remember: { required: false, type: () => Boolean } };
    }
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User email', example: 'user@example.com' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User password', example: 'password123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Remember me', example: false, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], LoginDto.prototype, "remember", void 0);


/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = void 0;
const openapi = __webpack_require__(3);
const class_validator_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(3);
class RegisterDto {
    username;
    name;
    email;
    password;
    phone;
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String, minLength: 3, pattern: "/^[a-zA-Z0-9_]+$/" }, name: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 6 }, phone: { required: false, type: () => String } };
    }
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Username', example: 'johndoe' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Username is required' }),
    (0, class_validator_1.MinLength)(3, { message: 'Username must be at least 3 characters' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain letters, numbers, and underscores' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Full name', example: 'John Doe' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User email', example: 'user@example.com' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User password', example: 'password123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Phone number', example: '+1234567890', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "phone", void 0);


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestPasswordResetDto = void 0;
const openapi = __webpack_require__(3);
const class_validator_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(3);
class RequestPasswordResetDto {
    email;
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String } };
    }
}
exports.RequestPasswordResetDto = RequestPasswordResetDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address to send password reset to',
        example: 'user@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RequestPasswordResetDto.prototype, "email", void 0);


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResetPasswordDto = void 0;
const openapi = __webpack_require__(3);
const class_validator_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(3);
class ResetPasswordDto {
    token;
    password;
    passwordConfirmation;
    static _OPENAPI_METADATA_FACTORY() {
        return { token: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 8 }, passwordConfirmation: { required: true, type: () => String } };
    }
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Password reset token',
        example: 'abc123def456',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'New password',
        example: 'newPassword123',
        minLength: 8,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Confirm new password',
        example: 'newPassword123',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "passwordConfirmation", void 0);


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(15);
const passport_jwt_1 = __webpack_require__(28);
const config_1 = __webpack_require__(4);
const auth_service_1 = __webpack_require__(16);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    configService;
    authService;
    constructor(configService, authService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
        this.configService = configService;
        this.authService = authService;
    }
    async validate(payload) {
        console.log('🔐 JWT Strategy validate called with payload:', {
            sub: payload.sub,
            email: payload.email,
            iat: payload.iat,
            exp: payload.exp
        });
        const user = await this.authService.getCurrentUser(payload.sub);
        if (!user) {
            console.error('❌ JWT Strategy: User not found for id:', payload.sub);
            throw new common_1.UnauthorizedException('User not found');
        }
        console.log('✅ JWT Strategy: User validated successfully:', user.id, user.email);
        return user;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService])
], JwtStrategy);


/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(1);
let RolesGuard = class RolesGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => user.roles?.includes(role));
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(2);
const users_service_1 = __webpack_require__(31);
const users_controller_1 = __webpack_require__(34);
const common_module_1 = __webpack_require__(35);
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [common_module_1.CommonModule],
        providers: [users_service_1.UsersService],
        controllers: [users_controller_1.UsersController],
        exports: [users_service_1.UsersService],
    })
], UsersModule);


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(11);
const validation_service_1 = __webpack_require__(32);
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
                email_verified_at: true,
                phone_verified_at: true,
                created_at: true,
                updated_at: true,
                user_roles: {
                    include: {
                        role: true
                    }
                }
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
                email_verified_at: true,
                user_roles: {
                    include: {
                        role: true
                    }
                },
                phone_verified_at: true,
                kyc_verifications: true,
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
                email_verified_at: true,
                phone_verified_at: true,
                created_at: true,
                updated_at: true,
                user_roles: {
                    include: {
                        role: true
                    }
                }
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
        const bcrypt = __webpack_require__(17);
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
                email_verified_at: true,
                phone_verified_at: true,
                created_at: true,
                updated_at: true,
                user_roles: {
                    include: {
                        role: true
                    }
                }
            },
        });
    }
    async findAllPublic(page = 1, perPage = 20, search, role) {
        const where = {
            is_active: true,
        };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { username: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (role) {
            where.user_roles = {
                some: {
                    role: {
                        slug: role
                    }
                }
            };
        }
        const skip = (page - 1) * perPage;
        const take = perPage;
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take,
                orderBy: { created_at: 'desc' },
                select: {
                    id: true,
                    username: true,
                    name: true,
                    avatar: true,
                    created_at: true,
                    user_roles: {
                        include: {
                            role: true
                        }
                    }
                },
            }),
            this.prisma.user.count({ where }),
        ]);
        return {
            data: users,
            meta: {
                current_page: page,
                last_page: Math.ceil(total / perPage),
                per_page: perPage,
                total,
                from: skip + 1,
                to: Math.min(skip + perPage, total),
            },
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        validation_service_1.ValidationService])
], UsersService);


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationService = void 0;
const common_1 = __webpack_require__(2);
const validator = __webpack_require__(33);
let ValidationService = class ValidationService {
    validateEmail(email) {
        if (!email || !validator.isEmail(email)) {
            throw new common_1.BadRequestException('Invalid email format');
        }
        return true;
    }
    validatePhone(phone) {
        if (!phone)
            return true;
        const cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length < 10 || cleanPhone.length > 15) {
            throw new common_1.BadRequestException('Invalid phone number format');
        }
        return true;
    }
    validatePassword(password) {
        if (!password || password.length < 8) {
            throw new common_1.BadRequestException('Password must be at least 8 characters long');
        }
        if (!/(?=.*[a-z])/.test(password)) {
            throw new common_1.BadRequestException('Password must contain at least one lowercase letter');
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            throw new common_1.BadRequestException('Password must contain at least one uppercase letter');
        }
        if (!/(?=.*\d)/.test(password)) {
            throw new common_1.BadRequestException('Password must contain at least one number');
        }
        if (!/(?=.*[@$!%*?&])/.test(password)) {
            throw new common_1.BadRequestException('Password must contain at least one special character');
        }
        return true;
    }
    validateName(name) {
        if (!name || name.trim().length < 2) {
            throw new common_1.BadRequestException('Name must be at least 2 characters long');
        }
        if (name.trim().length > 100) {
            throw new common_1.BadRequestException('Name must be less than 100 characters');
        }
        if (!/^[a-zA-Z\s\-'\.]+$/.test(name.trim())) {
            throw new common_1.BadRequestException('Name contains invalid characters');
        }
        return true;
    }
    validatePrice(price) {
        if (price < 0) {
            throw new common_1.BadRequestException('Price cannot be negative');
        }
        if (price > 999999.99) {
            throw new common_1.BadRequestException('Price cannot exceed $999,999.99');
        }
        return true;
    }
    validateQuantity(quantity) {
        if (!Number.isInteger(quantity) || quantity < 1) {
            throw new common_1.BadRequestException('Quantity must be a positive integer');
        }
        if (quantity > 1000) {
            throw new common_1.BadRequestException('Quantity cannot exceed 1000');
        }
        return true;
    }
    validateRole(role) {
        const validRoles = ['user', 'seller', 'admin', 'moderator', 'super_admin'];
        if (!validRoles.includes(role)) {
            throw new common_1.BadRequestException(`Invalid role. Must be one of: ${validRoles.join(', ')}`);
        }
        return true;
    }
    validateStatus(status, validStatuses) {
        if (!validStatuses.includes(status)) {
            throw new common_1.BadRequestException(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
        }
        return true;
    }
    sanitizeString(input, maxLength = 255) {
        if (!input)
            return '';
        return validator.escape(input.trim().substring(0, maxLength));
    }
    validateJsonData(data, requiredFields) {
        if (!data || typeof data !== 'object') {
            throw new common_1.BadRequestException('Invalid data format');
        }
        for (const field of requiredFields) {
            if (!(field in data)) {
                throw new common_1.BadRequestException(`Missing required field: ${field}`);
            }
        }
        return true;
    }
    validatePagination(page, limit) {
        const validPage = Math.max(1, Math.floor(page) || 1);
        const validLimit = Math.min(100, Math.max(1, Math.floor(limit) || 10));
        return { page: validPage, limit: validLimit };
    }
    validateDateRange(startDate, endDate) {
        if (startDate >= endDate) {
            throw new common_1.BadRequestException('Start date must be before end date');
        }
        const maxRange = 365 * 24 * 60 * 60 * 1000;
        if (endDate.getTime() - startDate.getTime() > maxRange) {
            throw new common_1.BadRequestException('Date range cannot exceed 1 year');
        }
        return true;
    }
    validateFileUpload(file, maxSize = 5 * 1024 * 1024) {
        if (!file) {
            throw new common_1.BadRequestException('No file provided');
        }
        if (file.size > maxSize) {
            throw new common_1.BadRequestException(`File size cannot exceed ${maxSize / (1024 * 1024)}MB`);
        }
        const allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'application/pdf',
            'text/plain',
        ];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException('Invalid file type');
        }
        return true;
    }
};
exports.ValidationService = ValidationService;
exports.ValidationService = ValidationService = __decorate([
    (0, common_1.Injectable)()
], ValidationService);


/***/ }),
/* 33 */
/***/ ((module) => {

module.exports = require("validator");

/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const openapi = __webpack_require__(3);
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(3);
const users_service_1 = __webpack_require__(31);
const jwt_auth_guard_1 = __webpack_require__(20);
const decorators_1 = __webpack_require__(21);
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getProfile(user) {
        return this.usersService.findById(user.id);
    }
    async updateProfile(user, updateUserDto) {
        return this.usersService.update(user.id, updateUserDto);
    }
    async updatePassword(user, updatePasswordDto) {
        return this.usersService.updatePassword(user.id, updatePasswordDto);
    }
    async getUsers(page, perPage, search, role) {
        return this.usersService.findAllPublic(page, perPage, search, role);
    }
    async getMembers() {
        return this.usersService.findAll();
    }
    async getUserByUsername(username) {
        return this.usersService.findByUsername(username);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User profile retrieved' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('me'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update current user profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile updated successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Put)('me/password'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update user password' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password updated successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all public users / members list (filtered)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Users list retrieved' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('per_page')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('members'),
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all members (public) - alias for /users' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Members list retrieved' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMembers", null);
__decorate([
    (0, common_1.Get)(':username'),
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user profile by username (public)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User profile retrieved' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserByUsername", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);


/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonModule = void 0;
const common_1 = __webpack_require__(2);
const validation_service_1 = __webpack_require__(32);
const database_health_service_1 = __webpack_require__(36);
const prisma_module_1 = __webpack_require__(10);
let CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [validation_service_1.ValidationService, database_health_service_1.DatabaseHealthService],
        exports: [validation_service_1.ValidationService, database_health_service_1.DatabaseHealthService],
    })
], CommonModule);


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseHealthService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(11);
let DatabaseHealthService = class DatabaseHealthService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkConnection() {
        try {
            await this.prisma.$queryRaw `SELECT 1`;
            return true;
        }
        catch (error) {
            console.error('Database connection failed:', error);
            return false;
        }
    }
    async getDatabaseStats() {
        try {
            const [userCount, productCount, orderCount, disputeCount, activeUsers, inactiveUsers, pendingOrders, resolvedDisputes,] = await Promise.all([
                this.prisma.user.count(),
                this.prisma.product.count(),
                this.prisma.order.count(),
                this.prisma.dispute.count(),
                this.prisma.user.count({ where: { is_active: true } }),
                this.prisma.user.count({ where: { is_active: false } }),
                this.prisma.order.count({ where: { status: 'PENDING' } }),
                this.prisma.dispute.count({ where: { status: 'RESOLVED' } }),
            ]);
            return {
                users: {
                    total: userCount,
                    active: activeUsers,
                    inactive: inactiveUsers,
                },
                products: {
                    total: productCount,
                },
                orders: {
                    total: orderCount,
                    pending: pendingOrders,
                },
                disputes: {
                    total: disputeCount,
                    resolved: resolvedDisputes,
                },
            };
        }
        catch (error) {
            console.error('Error getting database stats:', error);
            throw error;
        }
    }
    async checkDataIntegrity() {
        const issues = [];
        try {
            const orphanedCartItems = await this.prisma.cartItem.findMany({
                where: {
                    OR: [
                        { user: null },
                        { product: null },
                    ],
                },
            });
            if (orphanedCartItems.length > 0) {
                issues.push(`Found ${orphanedCartItems.length} orphaned cart items`);
            }
            const orphanedOrderItems = await this.prisma.orderItem.findMany({
                where: {
                    OR: [
                        { order: null },
                        { product: null },
                    ],
                },
            });
            if (orphanedOrderItems.length > 0) {
                issues.push(`Found ${orphanedOrderItems.length} orphaned order items`);
            }
            const usersWithoutRoles = await this.prisma.user.findMany({
                where: {
                    user_roles: {
                        none: {}
                    }
                },
            });
            if (usersWithoutRoles.length > 0) {
                issues.push(`Found ${usersWithoutRoles.length} users without roles`);
            }
            const productsWithoutSellers = await this.prisma.product.findMany({
                where: { seller_id: null },
            });
            if (productsWithoutSellers.length > 0) {
                issues.push(`Found ${productsWithoutSellers.length} products without sellers`);
            }
            return {
                healthy: issues.length === 0,
                issues,
                checkedAt: new Date(),
            };
        }
        catch (error) {
            console.error('Error checking data integrity:', error);
            return {
                healthy: false,
                issues: [`Database integrity check failed: ${error.message}`],
                checkedAt: new Date(),
            };
        }
    }
    async cleanupOrphanedData() {
        const results = {
            cartItemsRemoved: 0,
            orderItemsRemoved: 0,
            wishlistItemsRemoved: 0,
        };
        try {
            const orphanedCartItems = await this.prisma.cartItem.findMany({
                where: {
                    OR: [
                        { user: null },
                        { product: null },
                    ],
                },
            });
            if (orphanedCartItems.length > 0) {
                await this.prisma.cartItem.deleteMany({
                    where: {
                        id: { in: orphanedCartItems.map(item => item.id) },
                    },
                });
                results.cartItemsRemoved = orphanedCartItems.length;
            }
            const orphanedOrderItems = await this.prisma.orderItem.findMany({
                where: {
                    OR: [
                        { order: null },
                        { product: null },
                    ],
                },
            });
            if (orphanedOrderItems.length > 0) {
                await this.prisma.orderItem.deleteMany({
                    where: {
                        id: { in: orphanedOrderItems.map(item => item.id) },
                    },
                });
                results.orderItemsRemoved = orphanedOrderItems.length;
            }
            const orphanedWishlistItems = await this.prisma.wishlistItem.findMany({
                where: {
                    OR: [
                        { user: null },
                        { product: null },
                    ],
                },
            });
            if (orphanedWishlistItems.length > 0) {
                await this.prisma.wishlistItem.deleteMany({
                    where: {
                        id: { in: orphanedWishlistItems.map(item => item.id) },
                    },
                });
                results.wishlistItemsRemoved = orphanedWishlistItems.length;
            }
            return results;
        }
        catch (error) {
            console.error('Error cleaning up orphaned data:', error);
            throw error;
        }
    }
    async optimizeDatabase() {
        try {
            await this.prisma.$executeRaw `ANALYZE TABLE users`;
            await this.prisma.$executeRaw `ANALYZE TABLE products`;
            await this.prisma.$executeRaw `ANALYZE TABLE orders`;
            await this.prisma.$executeRaw `ANALYZE TABLE disputes`;
            await this.prisma.$executeRaw `ANALYZE TABLE cart`;
            await this.prisma.$executeRaw `ANALYZE TABLE wishlist`;
            return { message: 'Database optimization completed' };
        }
        catch (error) {
            console.error('Error optimizing database:', error);
            throw error;
        }
    }
    async getSlowQueries() {
        try {
            return { message: 'Slow query analysis not implemented for this database type' };
        }
        catch (error) {
            console.error('Error getting slow queries:', error);
            throw error;
        }
    }
};
exports.DatabaseHealthService = DatabaseHealthService;
exports.DatabaseHealthService = DatabaseHealthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DatabaseHealthService);


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsModule = void 0;
const common_1 = __webpack_require__(2);
const products_service_1 = __webpack_require__(38);
const products_controller_1 = __webpack_require__(39);
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        providers: [products_service_1.ProductsService],
        controllers: [products_controller_1.ProductsController],
        exports: [products_service_1.ProductsService],
    })
], ProductsModule);


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(11);
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(filters = {}) {
        const { categoryId: category, search, minPrice: min_price, maxPrice: max_price, status = 'active', page = 1, limit: per_page = 20, sortBy: sort = 'created_at', } = filters;
        const where = {
            status: status === 'all' ? undefined : status,
        };
        if (category) {
            where.category_id = category;
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (min_price !== undefined) {
            where.price = { ...where.price, gte: min_price };
        }
        if (max_price !== undefined) {
            where.price = { ...where.price, lte: max_price };
        }
        const skip = (page - 1) * per_page;
        const take = per_page;
        const [products, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                skip,
                take,
                orderBy: { [sort]: 'desc' },
                include: {
                    seller: {
                        select: {
                            id: true,
                            username: true,
                            name: true,
                            avatar: true,
                        },
                    },
                },
            }),
            this.prisma.product.count({ where }),
        ]);
        return {
            data: products,
            meta: {
                current_page: page,
                last_page: Math.ceil(total / per_page),
                per_page,
                total,
                from: skip + 1,
                to: Math.min(skip + per_page, total),
            },
        };
    }
    async getTrending(limit = 10) {
        const products = await this.prisma.product.findMany({
            where: {
                status: 'ACTIVE',
            },
            take: limit,
            orderBy: [
                { views_count: 'desc' },
                { sales_count: 'desc' },
                { created_at: 'desc' },
            ],
            include: {
                seller: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        avatar: true,
                    },
                },
            },
        });
        return {
            data: products,
            message: 'Trending products retrieved successfully',
            status: 'success',
        };
    }
    async getByCategory(categorySlug, filters = {}) {
        const { search, minPrice: min_price, maxPrice: max_price, page = 1, limit: per_page = 20, sortBy: sort = 'created_at', } = filters;
        const where = {
            status: 'active',
            category: categorySlug,
        };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (min_price !== undefined) {
            where.price = { ...where.price, gte: min_price };
        }
        if (max_price !== undefined) {
            where.price = { ...where.price, lte: max_price };
        }
        const skip = (page - 1) * per_page;
        const take = per_page;
        const [products, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                skip,
                take,
                orderBy: { [sort]: 'desc' },
                include: {
                    seller: {
                        select: {
                            id: true,
                            username: true,
                            name: true,
                            avatar: true,
                        },
                    },
                },
            }),
            this.prisma.product.count({ where }),
        ]);
        return {
            data: products,
            meta: {
                current_page: page,
                last_page: Math.ceil(total / per_page),
                per_page,
                total,
                from: skip + 1,
                to: Math.min(skip + per_page, total),
                category: categorySlug,
            },
        };
    }
    async findById(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                seller: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        avatar: true,
                    },
                },
            },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    async create(createProductDto, sellerId) {
        return this.prisma.product.create({
            data: {
                name: createProductDto.name,
                slug: createProductDto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                description: createProductDto.description,
                price: createProductDto.price,
                category_id: parseInt(createProductDto.categoryId),
                seller_id: sellerId,
                images: {
                    create: createProductDto.images?.map((imageUrl, index) => ({
                        image_url: imageUrl,
                        sort_order: index,
                        is_primary: index === 0
                    })) || []
                },
            },
            include: {
                category: true,
                images: {
                    orderBy: { sort_order: 'asc' }
                },
                seller: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        avatar: true,
                    },
                },
            },
        });
    }
    async update(id, updateProductDto, sellerId) {
        const product = await this.prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        if (product.seller_id !== sellerId) {
            throw new common_1.ForbiddenException('You can only update your own products');
        }
        const updateData = {
            ...updateProductDto
        };
        if (updateProductDto.categoryId) {
            updateData.category_id = updateProductDto.categoryId;
            delete updateData.categoryId;
        }
        if (updateProductDto.images) {
            updateData.images = {
                deleteMany: {},
                create: updateProductDto.images.map((imageUrl, index) => ({
                    image_url: imageUrl,
                    sort_order: index,
                    is_primary: index === 0
                }))
            };
        }
        return this.prisma.product.update({
            where: { id },
            data: updateData,
            include: {
                category: true,
                images: {
                    orderBy: { sort_order: 'asc' }
                },
                seller: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        avatar: true,
                    },
                },
            },
        });
    }
    async remove(id, sellerId) {
        const product = await this.prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        if (product.seller_id !== sellerId) {
            throw new common_1.ForbiddenException('You can only delete your own products');
        }
        return this.prisma.product.update({
            where: { id },
            data: { status: 'INACTIVE' },
        });
    }
    async findBySeller(sellerId) {
        return this.prisma.product.findMany({
            where: { seller_id: sellerId },
            include: {
                seller: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        avatar: true,
                    },
                },
            },
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsController = void 0;
const openapi = __webpack_require__(3);
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(3);
const products_service_1 = __webpack_require__(38);
const jwt_auth_guard_1 = __webpack_require__(20);
const roles_guard_1 = __webpack_require__(29);
const decorators_1 = __webpack_require__(21);
let ProductsController = class ProductsController {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    async findAll(filters) {
        return this.productsService.findAll(filters);
    }
    async getTrending(limit) {
        return this.productsService.getTrending(limit || 10);
    }
    async getByCategory(categorySlug, filters) {
        return this.productsService.getByCategory(categorySlug, filters);
    }
    async findOne(id) {
        return this.productsService.findById(+id);
    }
    async create(createProductDto, req) {
        return this.productsService.create(createProductDto, req.user.id);
    }
    async update(id, updateProductDto, req) {
        return this.productsService.update(+id, updateProductDto, req.user.id);
    }
    async remove(id, req) {
        return this.productsService.remove(+id, req.user.id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products with filters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Products retrieved successfully' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'min_price', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'max_price', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'per_page', required: false, type: Number }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('trending'),
    (0, swagger_1.ApiOperation)({ summary: 'Get trending products' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Trending products retrieved successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getTrending", null);
__decorate([
    (0, common_1.Get)('categories/:categorySlug'),
    (0, swagger_1.ApiOperation)({ summary: 'Get products by category slug' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Products by category retrieved successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('categorySlug')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getByCategory", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get product by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)('seller', 'admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new product (seller only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - seller role required' }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)('seller', 'admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update product (seller only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - seller role required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)('seller', 'admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete product (seller only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - seller role required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartModule = void 0;
const common_1 = __webpack_require__(2);
const cart_service_1 = __webpack_require__(41);
const cart_controller_1 = __webpack_require__(42);
const jwt_1 = __webpack_require__(14);
let CartModule = class CartModule {
};
exports.CartModule = CartModule;
exports.CartModule = CartModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule],
        providers: [cart_service_1.CartService],
        controllers: [cart_controller_1.CartController],
        exports: [cart_service_1.CartService],
    })
], CartModule);


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(11);
const jwt_1 = __webpack_require__(14);
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
            where: { user_id: userId, status: 'ACTIVE' },
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
                status: 'ACTIVE',
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
            data: { status: 'REMOVED' },
        });
    }
    async clearCart(userId) {
        return this.prisma.cartItem.updateMany({
            where: { user_id: userId, status: 'ACTIVE' },
            data: { status: 'REMOVED' },
        });
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], CartService);


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartController = void 0;
const openapi = __webpack_require__(3);
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(3);
const cart_service_1 = __webpack_require__(41);
const jwt_auth_guard_1 = __webpack_require__(20);
const decorators_1 = __webpack_require__(21);
const add_to_cart_dto_1 = __webpack_require__(43);
const update_cart_item_dto_1 = __webpack_require__(44);
let CartController = class CartController {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    async getCart(req) {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return {
                items: [],
                total: 0,
                count: 0
            };
        }
        const token = authHeader.substring(7);
        try {
            const user = await this.cartService.getUserFromToken(token);
            if (!user) {
                return {
                    items: [],
                    total: 0,
                    count: 0
                };
            }
            return this.cartService.getCart(user.id);
        }
        catch (error) {
            return {
                items: [],
                total: 0,
                count: 0
            };
        }
    }
    async addToCart(user, addToCartDto) {
        return this.cartService.addToCart(user.id, addToCartDto);
    }
    async updateCartItem(user, id, updateCartItemDto) {
        return this.cartService.updateCartItem(user.id, +id, updateCartItemDto);
    }
    async removeFromCart(user, id) {
        return this.cartService.removeFromCart(user.id, +id);
    }
    async clearCart(user) {
        return this.cartService.clearCart(user.id);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user cart' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cart retrieved successfully' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add item to cart' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Item added to cart' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_to_cart_dto_1.AddToCartDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update cart item quantity' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cart item updated' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_cart_item_dto_1.UpdateCartItemDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateCartItem", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Remove item from cart' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Item removed from cart' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeFromCart", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Clear entire cart' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cart cleared' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "clearCart", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)('cart'),
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddToCartDto = void 0;
const openapi = __webpack_require__(3);
const class_validator_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(3);
class AddToCartDto {
    productId;
    quantity;
    static _OPENAPI_METADATA_FACTORY() {
        return { productId: { required: true, type: () => String }, quantity: { required: true, type: () => Number, minimum: 1 } };
    }
}
exports.AddToCartDto = AddToCartDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product ID', example: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Product ID is required' }),
    __metadata("design:type", String)
], AddToCartDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantity', example: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'Quantity must be at least 1' }),
    __metadata("design:type", Number)
], AddToCartDto.prototype, "quantity", void 0);


/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCartItemDto = void 0;
const openapi = __webpack_require__(3);
const class_validator_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(3);
class UpdateCartItemDto {
    quantity;
    static _OPENAPI_METADATA_FACTORY() {
        return { quantity: { required: true, type: () => Number, minimum: 1 } };
    }
}
exports.UpdateCartItemDto = UpdateCartItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantity', example: 2 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'Quantity must be at least 1' }),
    __metadata("design:type", Number)
], UpdateCartItemDto.prototype, "quantity", void 0);


/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersModule = void 0;
const common_1 = __webpack_require__(2);
const orders_controller_1 = __webpack_require__(46);
const orders_service_1 = __webpack_require__(47);
const prisma_module_1 = __webpack_require__(10);
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [orders_controller_1.OrdersController],
        providers: [orders_service_1.OrdersService],
        exports: [orders_service_1.OrdersService],
    })
], OrdersModule);


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersController = void 0;
const openapi = __webpack_require__(3);
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(3);
const orders_service_1 = __webpack_require__(47);
const create_order_dto_1 = __webpack_require__(48);
const update_order_dto_1 = __webpack_require__(50);
const jwt_auth_guard_1 = __webpack_require__(20);
const roles_guard_1 = __webpack_require__(29);
const decorators_1 = __webpack_require__(21);
const decorators_2 = __webpack_require__(21);
let OrdersController = class OrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async create(user, createOrderDto) {
        return this.ordersService.create(user.id, createOrderDto);
    }
    async findAll(user) {
        return this.ordersService.findAll(user.id, user.roles?.[0] || 'user');
    }
    async findOne(id, user) {
        return this.ordersService.findOne(+id, user.id, user.roles?.[0] || 'user');
    }
    async update(id, updateOrderDto, user) {
        return this.ordersService.update(+id, updateOrderDto, user.id, user.roles?.[0] || 'user');
    }
    async cancel(id, user) {
        return this.ordersService.cancel(+id, user.id);
    }
    async remove(id, user) {
        return this.ordersService.remove(+id, user.id, user.roles?.[0] || 'user');
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new order' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Order created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, decorators_2.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all orders (user sees own, admin sees all)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Orders retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, decorators_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get order by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update order (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/cancel'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel order' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order cancelled successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Cannot cancel order' }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "cancel", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete order (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "remove", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('orders'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(11);
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createOrderDto) {
        const { items, shipping_address, payment_method } = createOrderDto;
        let totalAmount = 0;
        for (const item of items) {
            const product = await this.prisma.product.findUnique({
                where: { id: item.product_id },
            });
            if (!product) {
                throw new common_1.NotFoundException(`Product with ID ${item.product_id} not found`);
            }
            if (product.status !== 'ACTIVE') {
                throw new common_1.BadRequestException(`Product ${product.name} is not available`);
            }
            totalAmount += Number(product.price) * item.quantity;
        }
        const productPrices = await Promise.all(items.map((item) => this.prisma.product.findUnique({
            where: { id: item.product_id },
            select: { price: true },
        })));
        const orderNumber = `ORD-${Date.now()}-${userId}`;
        const serviceFee = totalAmount * 0.05;
        const finalTotal = totalAmount + serviceFee;
        const order = await this.prisma.order.create({
            data: {
                order_number: orderNumber,
                buyer_id: userId,
                seller_id: items[0]?.seller_id || userId,
                subtotal: totalAmount,
                service_fee: serviceFee,
                total_amount: finalTotal,
                status: 'PENDING',
                payment_status: 'PENDING',
                payment_method,
                items: {
                    create: items.map((item, index) => ({
                        product_id: item.product_id,
                        product_name: `Product ${item.product_id}`,
                        quantity: item.quantity,
                        unit_price: Number(productPrices[index]?.price || 0),
                        total_price: Number(productPrices[index]?.price || 0) * item.quantity,
                    })),
                },
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                buyer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                seller: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        return order;
    }
    async findAll(userId, userRole) {
        const where = userRole === 'admin' ? {} : { buyer_id: userId };
        return this.prisma.order.findMany({
            where,
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                images: true,
                                price: true,
                            },
                        },
                    },
                },
                buyer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                created_at: 'desc',
            },
        });
    }
    async findOne(id, userId, userRole) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                images: true,
                                price: true,
                                description: true,
                            },
                        },
                    },
                },
                buyer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        if (userRole !== 'admin' && order.buyer_id !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to view this order');
        }
        return order;
    }
    async update(id, updateOrderDto, userId, userRole) {
        const order = await this.prisma.order.findUnique({
            where: { id },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        if (userRole !== 'admin') {
            throw new common_1.ForbiddenException('Only admins can update orders');
        }
        return this.prisma.order.update({
            where: { id },
            data: {
                ...updateOrderDto,
                status: updateOrderDto.status ? updateOrderDto.status.toUpperCase() : undefined,
                payment_status: updateOrderDto.payment_status ? updateOrderDto.payment_status.toUpperCase() : undefined,
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                buyer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async cancel(id, userId) {
        const order = await this.prisma.order.findUnique({
            where: { id },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        if (order.buyer_id !== userId) {
            throw new common_1.ForbiddenException('You can only cancel your own orders');
        }
        if (!['pending', 'processing'].includes(order.status)) {
            throw new common_1.BadRequestException(`Cannot cancel order with status: ${order.status}`);
        }
        return this.prisma.order.update({
            where: { id },
            data: {
                status: 'CANCELLED',
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }
    async remove(id, userId, userRole) {
        const order = await this.prisma.order.findUnique({
            where: { id },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        if (userRole !== 'admin') {
            throw new common_1.ForbiddenException('Only admins can delete orders');
        }
        await this.prisma.order.delete({
            where: { id },
        });
        return { message: 'Order deleted successfully' };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);


/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateOrderDto = exports.CreateOrderItemDto = void 0;
const openapi = __webpack_require__(3);
const class_validator_1 = __webpack_require__(23);
const class_transformer_1 = __webpack_require__(49);
const swagger_1 = __webpack_require__(3);
class CreateOrderItemDto {
    product_id;
    quantity;
    static _OPENAPI_METADATA_FACTORY() {
        return { product_id: { required: true, type: () => Number }, quantity: { required: true, type: () => Number, minimum: 1 } };
    }
}
exports.CreateOrderItemDto = CreateOrderItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product ID', example: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOrderItemDto.prototype, "product_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantity', example: 2 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateOrderItemDto.prototype, "quantity", void 0);
class CreateOrderDto {
    shipping_address;
    payment_method;
    items;
    static _OPENAPI_METADATA_FACTORY() {
        return { shipping_address: { required: true, type: () => Object }, payment_method: { required: true, type: () => String }, items: { required: true, type: () => [(__webpack_require__(48).CreateOrderItemDto)] } };
    }
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Shipping address',
        example: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            country: 'USA'
        }
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateOrderDto.prototype, "shipping_address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Payment method', example: 'stripe' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "payment_method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order items', type: [CreateOrderItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateOrderItemDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "items", void 0);


/***/ }),
/* 49 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateOrderDto = void 0;
const openapi = __webpack_require__(3);
const class_validator_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(3);
class UpdateOrderDto {
    status;
    payment_status;
    shipping_address;
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: false, type: () => String }, payment_status: { required: false, type: () => String }, shipping_address: { required: false, type: () => Object } };
    }
}
exports.UpdateOrderDto = UpdateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order status', example: 'processing', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Payment status', example: 'paid', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(['pending', 'paid', 'failed', 'refunded']),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "payment_status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Shipping address', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateOrderDto.prototype, "shipping_address", void 0);


/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WishlistModule = void 0;
const common_1 = __webpack_require__(2);
const wishlist_controller_1 = __webpack_require__(52);
const wishlist_service_1 = __webpack_require__(53);
const prisma_module_1 = __webpack_require__(10);
let WishlistModule = class WishlistModule {
};
exports.WishlistModule = WishlistModule;
exports.WishlistModule = WishlistModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [wishlist_controller_1.WishlistController],
        providers: [wishlist_service_1.WishlistService],
        exports: [wishlist_service_1.WishlistService],
    })
], WishlistModule);


/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WishlistController = void 0;
const openapi = __webpack_require__(3);
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(3);
const wishlist_service_1 = __webpack_require__(53);
const jwt_auth_guard_1 = __webpack_require__(20);
const decorators_1 = __webpack_require__(21);
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
    openapi.ApiResponse({ status: 200 }),
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
    openapi.ApiResponse({ status: 201, type: Object }),
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
    openapi.ApiResponse({ status: 200 }),
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


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WishlistService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(11);
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


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DisputesModule = void 0;
const common_1 = __webpack_require__(2);
const disputes_controller_1 = __webpack_require__(55);
const disputes_service_1 = __webpack_require__(56);
const prisma_module_1 = __webpack_require__(10);
let DisputesModule = class DisputesModule {
};
exports.DisputesModule = DisputesModule;
exports.DisputesModule = DisputesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [disputes_controller_1.DisputesController],
        providers: [disputes_service_1.DisputesService],
        exports: [disputes_service_1.DisputesService],
    })
], DisputesModule);


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DisputesController = void 0;
const openapi = __webpack_require__(3);
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(3);
const disputes_service_1 = __webpack_require__(56);
const jwt_auth_guard_1 = __webpack_require__(20);
const roles_guard_1 = __webpack_require__(29);
const decorators_1 = __webpack_require__(21);
const decorators_2 = __webpack_require__(21);
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
    openapi.ApiResponse({ status: 200, type: [Object] }),
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
    openapi.ApiResponse({ status: 200, type: Object }),
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
    openapi.ApiResponse({ status: 201 }),
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
    openapi.ApiResponse({ status: 200, type: [Object] }),
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
    openapi.ApiResponse({ status: 200 }),
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


/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DisputesService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(11);
let DisputesService = class DisputesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDisputes(userId) {
        return this.prisma.dispute.findMany({
            where: { buyer_id: userId },
            include: {
                order: {
                    include: {
                        items: {
                            include: { product: true },
                        },
                    },
                },
            },
            orderBy: { created_at: 'desc' },
        });
    }
    async getDisputeById(id, userId) {
        const dispute = await this.prisma.dispute.findUnique({
            where: { id },
            include: {
                order: {
                    include: {
                        items: {
                            include: { product: true },
                        },
                    },
                },
            },
        });
        if (!dispute) {
            throw new common_1.NotFoundException('Dispute not found');
        }
        if (dispute.buyer_id !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return dispute;
    }
    async createDispute(userId, orderId, reason, description) {
        const order = await this.prisma.order.findFirst({
            where: {
                id: orderId,
                buyer_id: userId,
            },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        const existingDispute = await this.prisma.dispute.findFirst({
            where: { order_id: orderId },
        });
        if (existingDispute) {
            throw new common_1.ForbiddenException('Dispute already exists for this order');
        }
        return this.prisma.dispute.create({
            data: {
                buyer_id: userId,
                seller_id: order.seller_id,
                order_id: orderId,
                reason,
                description,
                status: 'PENDING',
            },
        });
    }
    async updateDisputeStatus(id, status, adminId) {
        const dispute = await this.prisma.dispute.findUnique({
            where: { id },
        });
        if (!dispute) {
            throw new common_1.NotFoundException('Dispute not found');
        }
        return this.prisma.dispute.update({
            where: { id },
            data: {
                status: status.toUpperCase(),
                resolved_at: new Date(),
            },
        });
    }
    async getAdminDisputes() {
        return this.prisma.dispute.findMany({
            include: {
                buyer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                order: {
                    include: {
                        items: {
                            include: { product: true },
                        },
                    },
                },
            },
            orderBy: { created_at: 'desc' },
        });
    }
};
exports.DisputesService = DisputesService;
exports.DisputesService = DisputesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DisputesService);


/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KycModule = void 0;
const common_1 = __webpack_require__(2);
const kyc_controller_1 = __webpack_require__(58);
const kyc_service_1 = __webpack_require__(59);
const prisma_module_1 = __webpack_require__(10);
const email_module_1 = __webpack_require__(64);
let KycModule = class KycModule {
};
exports.KycModule = KycModule;
exports.KycModule = KycModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, email_module_1.EmailModule],
        controllers: [kyc_controller_1.KycController],
        providers: [kyc_service_1.KycService],
        exports: [kyc_service_1.KycService],
    })
], KycModule);


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KycController = void 0;
const openapi = __webpack_require__(3);
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(3);
const kyc_service_1 = __webpack_require__(59);
const jwt_auth_guard_1 = __webpack_require__(20);
const decorators_1 = __webpack_require__(21);
let KycController = class KycController {
    kycService;
    constructor(kycService) {
        this.kycService = kycService;
    }
    async handlePersonaWebhook(payload, headers) {
        console.log('📥 Persona webhook received:', payload);
        try {
            const { type, data } = payload;
            switch (type) {
                case 'inquiry.completed':
                    console.log('✅ Inquiry completed:', data);
                    await this.kycService.handlePersonaCallback(data);
                    break;
                case 'inquiry.approved':
                    console.log('✅ Inquiry approved:', data);
                    await this.kycService.handlePersonaCallback(data);
                    break;
                case 'inquiry.created':
                    console.log('📝 Inquiry created:', data);
                    break;
                case 'inquiry.started':
                    console.log('▶️ Inquiry started:', data);
                    break;
                case 'inquiry.declined':
                    console.log('❌ Inquiry declined:', data);
                    break;
                case 'inquiry.failed':
                    console.log('❌ Inquiry failed:', data);
                    break;
                default:
                    console.log('ℹ️ Unhandled webhook type:', type);
            }
            return { success: true };
        }
        catch (error) {
            console.error('❌ Error processing Persona webhook:', error);
            return { success: false, error: error.message };
        }
    }
    async getKycStatus(user) {
        return this.kycService.getKycStatus(user.id);
    }
    async sendEmailVerification(user) {
        return this.kycService.sendEmailVerification(user.id);
    }
    async verifyEmail(user, verifyEmailDto) {
        return this.kycService.verifyEmail(user.id, verifyEmailDto.code);
    }
    async verifyPhone(user, verifyPhoneDto) {
        return this.kycService.verifyPhone(user.id, verifyPhoneDto.phone, verifyPhoneDto.code);
    }
    async completeKyc(user) {
        return this.kycService.completeKyc(user.id);
    }
    async submitKycDocument(user, step, documentData) {
        return this.kycService.submitKycDocument(user.id, step, documentData);
    }
};
exports.KycController = KycController;
__decorate([
    (0, common_1.Post)('webhooks/persona'),
    (0, swagger_1.ApiOperation)({ summary: 'Persona webhook for verification callbacks' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Webhook processed successfully' }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "handlePersonaWebhook", null);
__decorate([
    (0, common_1.Get)('status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get KYC status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'KYC status retrieved successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "getKycStatus", null);
__decorate([
    (0, common_1.Post)('send-email-verification'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Send email verification code' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Verification code sent successfully' }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "sendEmailVerification", null);
__decorate([
    (0, common_1.Post)('verify-email'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Verify email with code' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Email verified successfully' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('verify-phone'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Verify phone number' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Phone verified successfully' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "verifyPhone", null);
__decorate([
    (0, common_1.Post)('complete'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Complete KYC process' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'KYC completed successfully' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "completeKyc", null);
__decorate([
    (0, common_1.Post)(':step'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Submit KYC document for specific step' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Document submitted successfully' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('step')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "submitKycDocument", null);
exports.KycController = KycController = __decorate([
    (0, swagger_1.ApiTags)('kyc'),
    (0, common_1.Controller)('kyc'),
    __metadata("design:paramtypes", [kyc_service_1.KycService])
], KycController);


/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KycService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(11);
const email_service_1 = __webpack_require__(60);
let KycService = class KycService {
    prisma;
    emailService;
    PERSONA_API_KEY = process.env.PERSONA_API_KEY || 'sk_test_3ef3be12-87af-444f-9c71-c7546ee971a5';
    PERSONA_TEMPLATE_ID = process.env.PERSONA_TEMPLATE_ID || 'itmpl_1bNZnx9mrbHZKKJsvJiN9BDDTuD6';
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async handlePersonaCallback(data) {
        console.log('🔍 Processing Persona callback:', data);
        try {
            const inquiryId = data?.inquiry?.id;
            const status = data?.inquiry?.status;
            const userId = data?.metadata?.userId;
            console.log(`📋 Inquiry ${inquiryId} status: ${status}`);
            const userIdNum = userId ? parseInt(String(userId), 10) : null;
            const user = userIdNum ? await this.prisma.user.findUnique({
                where: { id: userIdNum },
            }) : null;
            if (!user) {
                console.warn('⚠️ User not found for inquiry:', inquiryId);
                return;
            }
            if (status === 'passed') {
                await this.prisma.kycVerification.upsert({
                    where: {
                        user_id_type: {
                            user_id: user.id,
                            type: 'IDENTITY'
                        }
                    },
                    create: {
                        user_id: user.id,
                        type: 'IDENTITY',
                        status: 'APPROVED',
                        provider: 'persona',
                        external_id: inquiryId,
                        verified_at: new Date(),
                    },
                    update: {
                        status: 'APPROVED',
                        external_id: inquiryId,
                        verified_at: new Date(),
                    },
                });
                await this.prisma.user.update({
                    where: { id: user.id },
                    data: {},
                });
                console.log(`✅ User ${user.id} KYC verified via Persona`);
            }
            else if (status === 'failed') {
                console.log(`❌ User ${user.id} KYC failed verification`);
            }
            return { success: true };
        }
        catch (error) {
            console.error('❌ Error handling Persona callback:', error);
            throw error;
        }
    }
    async getKycStatus(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const kycVerifications = await this.prisma.kycVerification.findMany({
            where: { user_id: userId },
            orderBy: { created_at: 'desc' }
        });
        const status = {
            identity: kycVerifications.some(v => v.type === 'IDENTITY' && v.status === 'APPROVED'),
            address: kycVerifications.some(v => v.type === 'ADDRESS' && v.status === 'APPROVED'),
            phone: kycVerifications.some(v => v.type === 'PHONE' && v.status === 'APPROVED'),
            email: kycVerifications.some(v => v.type === 'EMAIL' && v.status === 'APPROVED'),
        };
        return {
            status,
            verifications: kycVerifications,
            hasIdentityVerification: status.identity,
            kycStatus: status.identity ? 'verified' : 'pending'
        };
    }
    async submitKycDocument(userId, step, documentData) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const typeMapping = {
            'identity': 'IDENTITY',
            'address': 'ADDRESS',
            'phone': 'PHONE',
            'email': 'EMAIL',
            'documents': 'IDENTITY'
        };
        const verificationType = typeMapping[step] || 'IDENTITY';
        const kycVerification = await this.prisma.kycVerification.upsert({
            where: {
                user_id_type: {
                    user_id: userId,
                    type: verificationType
                }
            },
            create: {
                user_id: userId,
                type: verificationType,
                status: 'PENDING',
                data: documentData,
            },
            update: {
                status: 'PENDING',
                data: documentData,
                updated_at: new Date(),
            },
        });
        return kycVerification;
    }
    async completeKyc(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const kycVerifications = await this.prisma.kycVerification.findMany({
            where: { user_id: userId }
        });
        const hasIdentity = kycVerifications.some(v => v.type === 'IDENTITY' && v.status === 'APPROVED');
        const hasPhone = kycVerifications.some(v => v.type === 'PHONE' && v.status === 'APPROVED');
        const hasEmail = kycVerifications.some(v => v.type === 'EMAIL' && v.status === 'APPROVED');
        const allStepsCompleted = hasIdentity && hasPhone && hasEmail;
        if (!allStepsCompleted) {
            throw new Error('All KYC steps must be completed before final submission');
        }
        return this.prisma.user.update({
            where: { id: userId },
            data: {},
        });
    }
    async verifyPhone(userId, phone, code) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.prisma.kycVerification.upsert({
            where: {
                user_id_type: {
                    user_id: userId,
                    type: 'PHONE'
                }
            },
            create: {
                user_id: userId,
                type: 'PHONE',
                status: 'APPROVED',
                data: { phone, verificationCode: code },
                verified_at: new Date(),
            },
            update: {
                status: 'APPROVED',
                data: { phone, verificationCode: code },
                verified_at: new Date(),
            },
        });
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                phone,
                phone_verified_at: new Date(),
            },
        });
    }
    async createPersonaInquiry(userId) {
        try {
            console.log('🔍 Creating Persona inquiry for user:', userId);
            console.log('🔑 API Key full length:', this.PERSONA_API_KEY ? this.PERSONA_API_KEY.length : 0);
            console.log('🔑 API Key first 50 chars:', this.PERSONA_API_KEY ? this.PERSONA_API_KEY.substring(0, 50) : 'NOT SET');
            console.log('🔑 API Key last 10 chars:', this.PERSONA_API_KEY ? `...${this.PERSONA_API_KEY.substring(this.PERSONA_API_KEY.length - 10)}` : 'NOT SET');
            console.log('📋 Template ID:', this.PERSONA_TEMPLATE_ID);
            const response = await fetch('https://api.withpersona.com/api/v1/inquiries', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.PERSONA_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        type: 'inquiry',
                        attributes: {
                            template_id: this.PERSONA_TEMPLATE_ID,
                            reference_id: `user_${userId}_${Date.now()}`,
                            metadata: {
                                userId: userId,
                            },
                        }
                    }
                }),
            });
            const responseText = await response.text();
            console.log('📥 Persona API response status:', response.status);
            console.log('📥 Persona API response body:', responseText);
            if (!response.ok) {
                const error = JSON.parse(responseText);
                console.error('❌ Persona API error:', error);
                throw new Error(error.error?.message || 'Failed to create Persona inquiry');
            }
            const result = JSON.parse(responseText);
            console.log('✅ Persona inquiry created:', result.data);
            const inquiryId = result.data.id;
            const verificationUrl = result.data.attributes?.url;
            console.log('🔗 Verification URL:', verificationUrl);
            if (!verificationUrl) {
                const constructedUrl = `https://inquiry.withpersona.com/verify/${inquiryId}`;
                console.log('🔗 Constructed URL:', constructedUrl);
                return {
                    inquiryId,
                    verificationUrl: constructedUrl,
                };
            }
            return {
                inquiryId,
                verificationUrl,
            };
        }
        catch (error) {
            console.error('❌ Error creating Persona inquiry:', error);
            throw error;
        }
    }
    async sendEmailVerification(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.email_verified_at) {
            return { message: 'Email already verified', alreadyVerified: true };
        }
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryDate = new Date(Date.now() + 10 * 60 * 1000);
        await this.prisma.kycVerification.upsert({
            where: {
                user_id_type: {
                    user_id: userId,
                    type: 'EMAIL'
                }
            },
            create: {
                user_id: userId,
                type: 'EMAIL',
                status: 'PENDING',
                data: {
                    verificationCode: code,
                    expiresAt: expiryDate.toISOString(),
                    email: user.email
                },
            },
            update: {
                status: 'PENDING',
                data: {
                    verificationCode: code,
                    expiresAt: expiryDate.toISOString(),
                    email: user.email
                },
                updated_at: new Date(),
            },
        });
        await this.emailService.sendVerificationEmail(user.email, code);
        console.log(`✅ Verification code sent to ${user.email}`);
        return {
            message: 'Verification code sent to your email',
            expiresIn: 600,
        };
    }
    async verifyEmail(userId, code) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.email_verified_at) {
            return { message: 'Email already verified', verified: true };
        }
        const emailVerification = await this.prisma.kycVerification.findUnique({
            where: {
                user_id_type: {
                    user_id: userId,
                    type: 'EMAIL'
                }
            }
        });
        if (!emailVerification) {
            throw new Error('No verification code found. Please request a new code.');
        }
        const verificationData = emailVerification.data;
        const storedCode = verificationData?.verificationCode;
        const codeExpiry = verificationData?.expiresAt;
        if (!storedCode) {
            throw new Error('No verification code found. Please request a new code.');
        }
        if (new Date(codeExpiry) < new Date()) {
            await this.prisma.kycVerification.update({
                where: {
                    user_id_type: {
                        user_id: userId,
                        type: 'EMAIL'
                    }
                },
                data: {
                    status: 'EXPIRED',
                }
            });
            throw new Error('Verification code has expired. Please request a new code.');
        }
        if (storedCode !== code) {
            throw new Error('Invalid verification code. Please try again.');
        }
        await this.prisma.kycVerification.update({
            where: {
                user_id_type: {
                    user_id: userId,
                    type: 'EMAIL'
                }
            },
            data: {
                status: 'APPROVED',
                verified_at: new Date(),
            }
        });
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                email_verified_at: new Date(),
            },
        });
        console.log(`✅ Email verified for user ${userId}`);
        return {
            message: 'Email verified successfully',
            verified: true,
        };
    }
};
exports.KycService = KycService;
exports.KycService = KycService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], KycService);


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailService = void 0;
const common_1 = __webpack_require__(2);
const nodemailer = __webpack_require__(61);
const fs = __webpack_require__(62);
const path = __webpack_require__(63);
let EmailService = class EmailService {
    transporter;
    verificationTemplate;
    onModuleInit() {
        const port = parseInt(process.env.SMTP_PORT || '587');
        const isSecure = port === 465;
        console.log('📧 Initializing SMTP with configuration:');
        console.log('  Host:', process.env.SMTP_HOST || 'smtp.hostinger.com');
        console.log('  Port:', port);
        console.log('  Secure (SSL):', isSecure);
        console.log('  User:', process.env.SMTP_USER ? process.env.SMTP_USER.substring(0, 3) + '***' : 'NOT SET');
        console.log('  Password:', process.env.SMTP_PASS ? '***' : 'NOT SET');
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.hostinger.com',
            port: port,
            secure: isSecure,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false
            },
            debug: true,
            logger: true
        });
        const templatePath = path.join(__dirname, 'templates', 'verification-email.html');
        try {
            this.verificationTemplate = fs.readFileSync(templatePath, 'utf8');
            console.log('✅ Email template loaded successfully');
        }
        catch (error) {
            console.error('⚠️ Could not load email template, using inline template');
            this.verificationTemplate = null;
        }
        this.transporter.verify((error, success) => {
            if (error) {
                console.error('❌ SMTP configuration error:', error);
            }
            else {
                console.log('✅ SMTP server is ready to send emails');
            }
        });
    }
    async sendVerificationEmail(email, code) {
        try {
            let htmlContent;
            if (this.verificationTemplate) {
                htmlContent = this.verificationTemplate
                    .replace(/{{CODE}}/g, code)
                    .replace(/{{YEAR}}/g, new Date().getFullYear().toString());
            }
            else {
                htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; margin-bottom: 20px;">
                <h1 style="color: white; margin: 0; text-align: center;">NXOLand</h1>
              </div>
              
              <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; border: 1px solid #e0e0e0;">
                <h2 style="color: #333; margin-top: 0;">Email Verification</h2>
                <p>Thank you for signing up with NXOLand! To complete your account verification, please use the verification code below:</p>
                
                <div style="background: white; border: 2px dashed #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
                  <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #667eea; margin: 0;">${code}</p>
                </div>
                
                <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes. If you didn't request this code, please ignore this email.</p>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                  <p style="color: #999; font-size: 12px; margin: 0;">Need help? Contact us at support@nxoland.com</p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
                <p>&copy; ${new Date().getFullYear()} NXOLand. All rights reserved.</p>
              </div>
            </body>
          </html>
        `;
            }
            const mailOptions = {
                from: process.env.SMTP_FROM || 'noreply@nxoland.com',
                to: email,
                subject: 'Verify Your Email - NXOLand',
                html: htmlContent,
            };
            console.log('📧 Attempting to send email to:', email);
            console.log('🔧 SMTP Config:', {
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                user: process.env.SMTP_USER ? process.env.SMTP_USER.substring(0, 3) + '***' : 'NOT SET',
            });
            const info = await this.transporter.sendMail(mailOptions);
            console.log(`✅ Verification email sent to ${email}`, info.messageId);
        }
        catch (error) {
            console.error('❌ Error sending email:', error);
            console.error('Error details:', {
                message: error.message,
                code: error.code,
                responseCode: error.responseCode,
                response: error.response,
            });
            if (error.code === 'EAUTH') {
                throw new Error('SMTP authentication failed. Please check your credentials.');
            }
            else if (error.code === 'ETIMEDOUT') {
                throw new Error('SMTP connection timeout. Please check your network settings.');
            }
            else if (error.responseCode === 550) {
                throw new Error('Invalid recipient email address.');
            }
            else {
                throw new Error(`Failed to send verification email: ${error.message}`);
            }
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)()
], EmailService);


/***/ }),
/* 61 */
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),
/* 62 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 63 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 64 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailModule = void 0;
const common_1 = __webpack_require__(2);
const email_service_1 = __webpack_require__(60);
let EmailModule = class EmailModule {
};
exports.EmailModule = EmailModule;
exports.EmailModule = EmailModule = __decorate([
    (0, common_1.Module)({
        providers: [email_service_1.EmailService],
        controllers: [],
        exports: [email_service_1.EmailService],
    })
], EmailModule);


/***/ }),
/* 65 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SellerModule = void 0;
const common_1 = __webpack_require__(2);
const seller_controller_1 = __webpack_require__(66);
const seller_service_1 = __webpack_require__(67);
const prisma_module_1 = __webpack_require__(10);
let SellerModule = class SellerModule {
};
exports.SellerModule = SellerModule;
exports.SellerModule = SellerModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [seller_controller_1.SellerController],
        providers: [seller_service_1.SellerService],
        exports: [seller_service_1.SellerService],
    })
], SellerModule);


/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SellerController = void 0;
const openapi = __webpack_require__(3);
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(3);
const seller_service_1 = __webpack_require__(67);
const jwt_auth_guard_1 = __webpack_require__(20);
const roles_guard_1 = __webpack_require__(29);
const decorators_1 = __webpack_require__(21);
const decorators_2 = __webpack_require__(21);
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
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, decorators_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "getSellerDashboard", null);
__decorate([
    (0, common_1.Get)('products'),
    (0, swagger_1.ApiOperation)({ summary: 'Get seller products' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Products retrieved successfully' }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, decorators_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "getSellerProducts", null);
__decorate([
    (0, common_1.Get)('orders'),
    (0, swagger_1.ApiOperation)({ summary: 'Get seller orders' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Orders retrieved successfully' }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, decorators_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "getSellerOrders", null);
__decorate([
    (0, common_1.Get)('payouts'),
    (0, swagger_1.ApiOperation)({ summary: 'Get seller payouts' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payouts retrieved successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, decorators_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "getSellerPayouts", null);
__decorate([
    (0, common_1.Get)('notifications'),
    (0, swagger_1.ApiOperation)({ summary: 'Get seller notifications' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notifications retrieved successfully' }),
    openapi.ApiResponse({ status: 200 }),
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


/***/ }),
/* 67 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SellerService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(11);
let SellerService = class SellerService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSellerDashboard(sellerId) {
        const totalProducts = await this.prisma.product.count({
            where: { seller_id: sellerId },
        });
        const totalOrders = await this.prisma.order.count({
            where: {
                items: {
                    some: {
                        product: {
                            seller_id: sellerId,
                        },
                    },
                },
            },
        });
        const totalRevenue = await this.prisma.order.aggregate({
            where: {
                items: {
                    some: {
                        product: {
                            seller_id: sellerId,
                        },
                    },
                },
                status: 'COMPLETED',
            },
            _sum: {
                total_amount: true,
            },
        });
        const recentOrders = await this.prisma.order.findMany({
            where: {
                items: {
                    some: {
                        product: {
                            seller_id: sellerId,
                        },
                    },
                },
            },
            include: {
                buyer: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                items: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: { created_at: 'desc' },
            take: 5,
        });
        return {
            stats: {
                totalProducts,
                totalOrders,
                totalRevenue: totalRevenue._sum.total_amount || 0,
            },
            recentOrders,
        };
    }
    async getSellerProducts(sellerId) {
        return this.prisma.product.findMany({
            where: { seller_id: sellerId },
            include: {
                seller: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                _count: {
                    select: {
                        cart_items: true,
                        wishlist_items: true,
                    },
                },
            },
            orderBy: { created_at: 'desc' },
        });
    }
    async getSellerOrders(sellerId) {
        return this.prisma.order.findMany({
            where: {
                items: {
                    some: {
                        product: {
                            seller_id: sellerId,
                        },
                    },
                },
            },
            include: {
                buyer: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                items: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: { created_at: 'desc' },
        });
    }
    async getSellerPayouts(sellerId) {
        return [
            {
                id: 1,
                amount: 1500.00,
                status: 'completed',
                created_at: new Date(),
                description: 'Monthly payout',
            },
        ];
    }
    async getSellerNotifications(sellerId) {
        return [
            {
                id: 1,
                type: 'order',
                message: 'New order received',
                read: false,
                created_at: new Date(),
            },
            {
                id: 2,
                type: 'payment',
                message: 'Payment received',
                read: true,
                created_at: new Date(),
            },
        ];
    }
};
exports.SellerService = SellerService;
exports.SellerService = SellerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SellerService);


/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminModule = void 0;
const common_1 = __webpack_require__(2);
const admin_controller_1 = __webpack_require__(69);
const admin_service_1 = __webpack_require__(70);
const prisma_module_1 = __webpack_require__(10);
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService],
        exports: [admin_service_1.AdminService],
    })
], AdminModule);


/***/ }),
/* 69 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminController = void 0;
const openapi = __webpack_require__(3);
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(3);
const admin_service_1 = __webpack_require__(70);
const jwt_auth_guard_1 = __webpack_require__(20);
const roles_guard_1 = __webpack_require__(29);
const decorators_1 = __webpack_require__(21);
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getUsers(page = '1', perPage = '10', search, role, status) {
        const pageNum = parseInt(page, 10) || 1;
        const perPageNum = parseInt(perPage, 10) || 10;
        return this.adminService.getUsers(pageNum, perPageNum, search, role, status);
    }
    async getUser(id) {
        return this.adminService.getUser(id);
    }
    async updateUser(id, updateData) {
        return this.adminService.updateUser(id, updateData);
    }
    async deleteUser(id) {
        return this.adminService.deleteUser(id);
    }
    async getOrders(page = '1', perPage = '10', status, dateFrom, dateTo) {
        const pageNum = parseInt(page, 10) || 1;
        const perPageNum = parseInt(perPage, 10) || 10;
        return this.adminService.getOrders(pageNum, perPageNum, status, dateFrom, dateTo);
    }
    async getOrder(id) {
        return this.adminService.getOrder(id);
    }
    async updateOrderStatus(id, statusData) {
        return this.adminService.updateOrderStatus(id, statusData.status);
    }
    async getVendors(page = '1', perPage = '10', search, status) {
        const pageNum = parseInt(page, 10) || 1;
        const perPageNum = parseInt(perPage, 10) || 10;
        return this.adminService.getVendors(pageNum, perPageNum, search, status);
    }
    async getVendor(id) {
        return this.adminService.getVendor(id);
    }
    async updateVendorStatus(id, statusData) {
        return this.adminService.updateVendorStatus(id, statusData.status);
    }
    async getListings(page = '1', perPage = '10', status, category) {
        const pageNum = parseInt(page, 10) || 1;
        const perPageNum = parseInt(perPage, 10) || 10;
        return this.adminService.getListings(pageNum, perPageNum, status, category);
    }
    async getListing(id) {
        return this.adminService.getListing(id);
    }
    async updateListingStatus(id, statusData) {
        return this.adminService.updateListingStatus(id, statusData.status);
    }
    async getPayouts(page = '1', perPage = '10', status, dateFrom, dateTo) {
        const pageNum = parseInt(page, 10) || 1;
        const perPageNum = parseInt(perPage, 10) || 10;
        return this.adminService.getPayouts(pageNum, perPageNum, status, dateFrom, dateTo);
    }
    async getPayout(id) {
        return this.adminService.getPayout(id);
    }
    async updatePayoutStatus(id, statusData) {
        return this.adminService.updatePayoutStatus(id, statusData.status);
    }
    async getDashboardStats() {
        return this.adminService.getDashboardStats();
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('users'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Users retrieved successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('per_page')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('role')),
    __param(4, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('users/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user by ID (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User retrieved successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUser", null);
__decorate([
    (0, common_1.Put)('users/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User updated successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('users/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete user (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User deleted successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)('orders'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all orders (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Orders retrieved successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('per_page')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('date_from')),
    __param(4, (0, common_1.Query)('date_to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Get)('orders/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get order by ID (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order retrieved successfully' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Put)('orders/:id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update order status (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order status updated successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateOrderStatus", null);
__decorate([
    (0, common_1.Get)('vendors'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all vendors (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vendors retrieved successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('per_page')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getVendors", null);
__decorate([
    (0, common_1.Get)('vendors/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get vendor by ID (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vendor retrieved successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getVendor", null);
__decorate([
    (0, common_1.Put)('vendors/:id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update vendor status (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vendor status updated successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateVendorStatus", null);
__decorate([
    (0, common_1.Get)('listings'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all listings (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Listings retrieved successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('per_page')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getListings", null);
__decorate([
    (0, common_1.Get)('listings/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get listing by ID (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Listing retrieved successfully' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getListing", null);
__decorate([
    (0, common_1.Put)('listings/:id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update listing status (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Listing status updated successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateListingStatus", null);
__decorate([
    (0, common_1.Get)('payouts'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all payouts (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payouts retrieved successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('per_page')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('date_from')),
    __param(4, (0, common_1.Query)('date_to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPayouts", null);
__decorate([
    (0, common_1.Get)('payouts/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payout by ID (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payout retrieved successfully' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPayout", null);
__decorate([
    (0, common_1.Put)('payouts/:id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update payout status (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payout status updated successfully' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updatePayoutStatus", null);
__decorate([
    (0, common_1.Get)('dashboard/stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get admin dashboard statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dashboard stats retrieved successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDashboardStats", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('admin'),
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);


/***/ }),
/* 70 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(11);
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUsers(page = 1, perPage = 10, search, role, status) {
        const pageNum = Number(page) || 1;
        const perPageNum = Number(perPage) || 10;
        const validPage = Math.max(1, pageNum);
        const validPerPage = Math.min(Math.max(1, perPageNum), 100);
        const skip = (validPage - 1) * validPerPage;
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { username: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (role) {
            where.user_roles = {
                some: {
                    role: {
                        slug: role
                    }
                }
            };
        }
        if (status) {
            where.is_active = status === 'active';
        }
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: validPerPage,
                select: {
                    id: true,
                    username: true,
                    name: true,
                    email: true,
                    phone: true,
                    user_roles: {
                        include: {
                            role: true
                        }
                    },
                    is_active: true,
                    created_at: true,
                    last_login_at: true,
                },
                orderBy: { created_at: 'desc' },
            }),
            this.prisma.user.count({ where }),
        ]);
        return {
            data: users,
            pagination: {
                page: validPage,
                per_page: validPerPage,
                total,
                total_pages: Math.ceil(total / validPerPage),
            },
        };
    }
    async getUser(id) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                name: true,
                email: true,
                phone: true,
                avatar: true,
                user_roles: { include: { role: true } },
                is_active: true,
                created_at: true,
                updated_at: true,
                last_login_at: true,
            },
        });
    }
    async updateUser(id, updateData) {
        return this.prisma.user.update({
            where: { id },
            data: updateData,
        });
    }
    async deleteUser(id) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
    async getOrders(page = 1, perPage = 10, status, dateFrom, dateTo) {
        const pageNum = Number(page) || 1;
        const perPageNum = Number(perPage) || 10;
        const validPage = Math.max(1, pageNum);
        const validPerPage = Math.min(Math.max(1, perPageNum), 100);
        const skip = (validPage - 1) * validPerPage;
        const where = {};
        if (status) {
            where.status = status;
        }
        if (dateFrom || dateTo) {
            where.created_at = {};
            if (dateFrom)
                where.created_at.gte = new Date(dateFrom);
            if (dateTo)
                where.created_at.lte = new Date(dateTo);
        }
        const [orders, total] = await Promise.all([
            this.prisma.order.findMany({
                where,
                skip,
                take: validPerPage,
                include: {
                    buyer: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            username: true,
                        },
                    },
                    items: {
                        include: {
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    price: true,
                                },
                            },
                        },
                    },
                },
                orderBy: { created_at: 'desc' },
            }),
            this.prisma.order.count({ where }),
        ]);
        return {
            data: orders,
            pagination: {
                page: validPage,
                per_page: validPerPage,
                total,
                total_pages: Math.ceil(total / validPerPage),
            },
        };
    }
    async getOrder(id) {
        return this.prisma.order.findUnique({
            where: { id },
            include: {
                buyer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        username: true,
                    },
                },
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async updateOrderStatus(id, status) {
        return this.prisma.order.update({
            where: { id },
            data: { status: status },
        });
    }
    async getVendors(page = 1, perPage = 10, search, status) {
        const pageNum = Number(page) || 1;
        const perPageNum = Number(perPage) || 10;
        const validPage = Math.max(1, pageNum);
        const validPerPage = Math.min(Math.max(1, perPageNum), 100);
        const skip = (validPage - 1) * validPerPage;
        const where = {
            roles: { contains: 'seller' },
        };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { username: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (status) {
            where.is_active = status === 'active';
        }
        const [vendors, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: validPerPage,
                select: {
                    id: true,
                    username: true,
                    name: true,
                    email: true,
                    phone: true,
                    user_roles: {
                        include: {
                            role: true
                        }
                    },
                    is_active: true,
                    created_at: true,
                    last_login_at: true,
                    products: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            status: true,
                        },
                    },
                },
                orderBy: { created_at: 'desc' },
            }),
            this.prisma.user.count({ where }),
        ]);
        return {
            data: vendors,
            pagination: {
                page: validPage,
                per_page: validPerPage,
                total,
                total_pages: Math.ceil(total / validPerPage),
            },
        };
    }
    async getVendor(id) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                name: true,
                email: true,
                phone: true,
                avatar: true,
                user_roles: { include: { role: true } },
                is_active: true,
                created_at: true,
                updated_at: true,
                last_login_at: true,
                products: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        status: true,
                        created_at: true,
                    },
                },
            },
        });
    }
    async updateVendorStatus(id, status) {
        return this.prisma.user.update({
            where: { id },
            data: { is_active: status === 'active' },
        });
    }
    async getListings(page = 1, perPage = 10, status, category) {
        const pageNum = Number(page) || 1;
        const perPageNum = Number(perPage) || 10;
        const validPage = Math.max(1, pageNum);
        const validPerPage = Math.min(Math.max(1, perPageNum), 100);
        const skip = (validPage - 1) * validPerPage;
        const where = {};
        if (status) {
            where.status = status;
        }
        if (category) {
            where.category = category;
        }
        const [listings, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                skip,
                take: validPerPage,
                include: {
                    seller: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            username: true,
                        },
                    },
                },
                orderBy: { created_at: 'desc' },
            }),
            this.prisma.product.count({ where }),
        ]);
        return {
            data: listings,
            pagination: {
                page: validPage,
                per_page: validPerPage,
                total,
                total_pages: Math.ceil(total / validPerPage),
            },
        };
    }
    async getListing(id) {
        return this.prisma.product.findUnique({
            where: { id },
            include: {
                seller: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        username: true,
                    },
                },
            },
        });
    }
    async updateListingStatus(id, status) {
        return this.prisma.product.update({
            where: { id },
            data: { status },
        });
    }
    async getPayouts(page = 1, perPage = 10, status, dateFrom, dateTo) {
        const pageNum = Number(page) || 1;
        const perPageNum = Number(perPage) || 10;
        const validPage = Math.max(1, pageNum);
        const validPerPage = Math.min(Math.max(1, perPageNum), 100);
        return {
            data: [],
            pagination: {
                page: validPage,
                per_page: validPerPage,
                total: 0,
                total_pages: 0,
            },
        };
    }
    async getPayout(id) {
        return null;
    }
    async updatePayoutStatus(id, status) {
        return null;
    }
    async getDashboardStats() {
        const [totalUsers, activeUsers, totalOrders, totalProducts, totalRevenue, recentOrders,] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.user.count({ where: { is_active: true } }),
            this.prisma.order.count(),
            this.prisma.product.count(),
            this.prisma.order.aggregate({
                _sum: { total_amount: true },
            }),
            this.prisma.order.findMany({
                take: 5,
                include: {
                    buyer: {
                        select: {
                            name: true,
                            email: true,
                        },
                    },
                },
                orderBy: { created_at: 'desc' },
            }),
        ]);
        return {
            totalUsers,
            activeUsers,
            totalOrders,
            totalProducts,
            totalRevenue: totalRevenue._sum.total_amount || 0,
            recentOrders,
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);


/***/ }),
/* 71 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesModule = void 0;
const common_1 = __webpack_require__(2);
const prisma_module_1 = __webpack_require__(10);
const categories_controller_1 = __webpack_require__(72);
const categories_service_1 = __webpack_require__(73);
let CategoriesModule = class CategoriesModule {
};
exports.CategoriesModule = CategoriesModule;
exports.CategoriesModule = CategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [categories_controller_1.CategoriesController],
        providers: [categories_service_1.CategoriesService],
        exports: [categories_service_1.CategoriesService],
    })
], CategoriesModule);


/***/ }),
/* 72 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesController = void 0;
const openapi = __webpack_require__(3);
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(3);
const jwt_auth_guard_1 = __webpack_require__(20);
const categories_service_1 = __webpack_require__(73);
const create_category_dto_1 = __webpack_require__(74);
const update_category_dto_1 = __webpack_require__(75);
let CategoriesController = class CategoriesController {
    categoriesService;
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    create(createCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }
    findAll() {
        return this.categoriesService.findAll();
    }
    findOne(id) {
        return this.categoriesService.findOne(id);
    }
    update(id, updateCategoryDto) {
        return this.categoriesService.update(id, updateCategoryDto);
    }
    remove(id) {
        return this.categoriesService.remove(id);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new category' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Category created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all categories' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Categories retrieved successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a category by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Category retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Category not found' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a category' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Category updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Category not found' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a category' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Category deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Category not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Cannot delete category with products' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "remove", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, swagger_1.ApiTags)('Categories'),
    (0, common_1.Controller)('categories'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);


/***/ }),
/* 73 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(11);
let CategoriesService = class CategoriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCategoryDto) {
        const slug = createCategoryDto.slug || this.generateSlug(createCategoryDto.name);
        const existingCategory = await this.prisma.category.findUnique({
            where: { slug },
        });
        if (existingCategory) {
            throw new common_1.ConflictException('Category with this slug already exists');
        }
        return this.prisma.category.create({
            data: {
                name: createCategoryDto.name,
                description: createCategoryDto.description || '',
                slug,
                is_active: createCategoryDto.isActive !== undefined ? createCategoryDto.isActive : true,
            },
        });
    }
    async findAll() {
        return this.prisma.category.findMany({
            orderBy: { created_at: 'desc' },
        });
    }
    async findOne(id) {
        const category = await this.prisma.category.findUnique({
            where: { id: parseInt(id) },
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        const category = await this.findOne(id);
        let slug = updateCategoryDto.slug;
        if (updateCategoryDto.name && !updateCategoryDto.slug) {
            slug = this.generateSlug(updateCategoryDto.name);
        }
        if (slug && slug !== category.slug) {
            const existingCategory = await this.prisma.category.findUnique({
                where: { slug },
            });
            if (existingCategory) {
                throw new common_1.ConflictException('Category with this slug already exists');
            }
        }
        return this.prisma.category.update({
            where: { id: parseInt(id) },
            data: {
                ...(updateCategoryDto.name && { name: updateCategoryDto.name }),
                ...(updateCategoryDto.description !== undefined && { description: updateCategoryDto.description }),
                ...(slug && { slug }),
                ...(updateCategoryDto.isActive !== undefined && { status: updateCategoryDto.isActive ? 'active' : 'inactive' }),
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        const productsCount = await this.prisma.product.count({
            where: {
                category_id: parseInt(id),
            },
        });
        return this.prisma.category.delete({
            where: { id: parseInt(id) },
        });
    }
    generateSlug(name) {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);


/***/ }),
/* 74 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCategoryDto = void 0;
const openapi = __webpack_require__(3);
const class_validator_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(3);
class CreateCategoryDto {
    name;
    description;
    slug;
    isActive;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: false, type: () => String }, slug: { required: false, type: () => String }, isActive: { required: false, type: () => Boolean } };
    }
}
exports.CreateCategoryDto = CreateCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Category name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Category description', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Category slug (auto-generated if not provided)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Category is active', default: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCategoryDto.prototype, "isActive", void 0);


/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCategoryDto = void 0;
const openapi = __webpack_require__(3);
const swagger_1 = __webpack_require__(3);
const create_category_dto_1 = __webpack_require__(74);
class UpdateCategoryDto extends (0, swagger_1.PartialType)(create_category_dto_1.CreateCategoryDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateCategoryDto = UpdateCategoryDto;


/***/ }),
/* 76 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CouponsModule = void 0;
const common_1 = __webpack_require__(2);
const prisma_module_1 = __webpack_require__(10);
const coupons_controller_1 = __webpack_require__(77);
const coupons_service_1 = __webpack_require__(78);
let CouponsModule = class CouponsModule {
};
exports.CouponsModule = CouponsModule;
exports.CouponsModule = CouponsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [coupons_controller_1.CouponsController],
        providers: [coupons_service_1.CouponsService],
        exports: [coupons_service_1.CouponsService],
    })
], CouponsModule);


/***/ }),
/* 77 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CouponsController = void 0;
const openapi = __webpack_require__(3);
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(3);
const jwt_auth_guard_1 = __webpack_require__(20);
const coupons_service_1 = __webpack_require__(78);
const create_coupon_dto_1 = __webpack_require__(79);
const update_coupon_dto_1 = __webpack_require__(80);
let CouponsController = class CouponsController {
    couponsService;
    constructor(couponsService) {
        this.couponsService = couponsService;
    }
    create(createCouponDto) {
        return this.couponsService.create(createCouponDto);
    }
    findAll() {
        return this.couponsService.findAll();
    }
    findOne(id) {
        return this.couponsService.findOne(id);
    }
    update(id, updateCouponDto) {
        return this.couponsService.update(id, updateCouponDto);
    }
    remove(id) {
        return this.couponsService.remove(id);
    }
};
exports.CouponsController = CouponsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new coupon' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Coupon created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Coupon code already exists' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_coupon_dto_1.CreateCouponDto]),
    __metadata("design:returntype", void 0)
], CouponsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all coupons' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Coupons retrieved successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CouponsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a coupon by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Coupon retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Coupon not found' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CouponsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a coupon' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Coupon updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Coupon not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_coupon_dto_1.UpdateCouponDto]),
    __metadata("design:returntype", void 0)
], CouponsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a coupon' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Coupon deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Coupon not found' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CouponsController.prototype, "remove", null);
exports.CouponsController = CouponsController = __decorate([
    (0, swagger_1.ApiTags)('Coupons'),
    (0, common_1.Controller)('coupons'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [coupons_service_1.CouponsService])
], CouponsController);


/***/ }),
/* 78 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CouponsService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(11);
let CouponsService = class CouponsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCouponDto) {
        const existingCoupon = await this.prisma.coupon.findUnique({
            where: { code: createCouponDto.code },
        });
        if (existingCoupon) {
            throw new common_1.ConflictException('Coupon with this code already exists');
        }
        if (createCouponDto.type.toUpperCase() === 'PERCENTAGE' && createCouponDto.value > 100) {
            throw new common_1.BadRequestException('Percentage discount cannot exceed 100%');
        }
        const expiresAt = createCouponDto.expiresAt ? new Date(createCouponDto.expiresAt) : null;
        return this.prisma.coupon.create({
            data: {
                name: createCouponDto.code,
                code: createCouponDto.code.toUpperCase(),
                description: createCouponDto.description || null,
                type: createCouponDto.type.toUpperCase(),
                value: createCouponDto.value,
                min_amount: createCouponDto.minAmount || null,
                max_discount: createCouponDto.maxDiscount || null,
                usage_limit: createCouponDto.usageLimit || null,
                expires_at: expiresAt,
            },
        });
    }
    async findAll() {
        return this.prisma.coupon.findMany({
            orderBy: { created_at: 'desc' },
        });
    }
    async findOne(id) {
        const coupon = await this.prisma.coupon.findUnique({
            where: { id: parseInt(id) },
        });
        if (!coupon) {
            throw new common_1.NotFoundException(`Coupon with ID ${id} not found`);
        }
        return coupon;
    }
    async update(id, updateCouponDto) {
        const coupon = await this.findOne(id);
        if (updateCouponDto.code && updateCouponDto.code.toUpperCase() !== coupon.code) {
            const existingCoupon = await this.prisma.coupon.findUnique({
                where: { code: updateCouponDto.code.toUpperCase() },
            });
            if (existingCoupon) {
                throw new common_1.ConflictException('Coupon with this code already exists');
            }
        }
        if (updateCouponDto.type === 'percentage' && updateCouponDto.value && updateCouponDto.value > 100) {
            throw new common_1.BadRequestException('Percentage discount cannot exceed 100%');
        }
        const expiresAt = updateCouponDto.expiresAt ? new Date(updateCouponDto.expiresAt) : undefined;
        return this.prisma.coupon.update({
            where: { id: parseInt(id) },
            data: {
                ...(updateCouponDto.code && { code: updateCouponDto.code.toUpperCase() }),
                ...(updateCouponDto.description !== undefined && { description: updateCouponDto.description }),
                ...(updateCouponDto.type && { type: updateCouponDto.type.toUpperCase() }),
                ...(updateCouponDto.value !== undefined && { value: updateCouponDto.value }),
                ...(updateCouponDto.minAmount !== undefined && { min_amount: updateCouponDto.minAmount }),
                ...(updateCouponDto.maxDiscount !== undefined && { max_discount: updateCouponDto.maxDiscount }),
                ...(updateCouponDto.usageLimit !== undefined && { usage_limit: updateCouponDto.usageLimit }),
                ...(updateCouponDto.status && { status: updateCouponDto.status }),
                ...(expiresAt !== undefined && { expires_at: expiresAt }),
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.coupon.delete({
            where: { id: parseInt(id) },
        });
    }
};
exports.CouponsService = CouponsService;
exports.CouponsService = CouponsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CouponsService);


/***/ }),
/* 79 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCouponDto = void 0;
const openapi = __webpack_require__(3);
const class_validator_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(3);
class CreateCouponDto {
    code;
    description;
    type;
    value;
    minAmount;
    maxDiscount;
    usageLimit;
    status;
    expiresAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { code: { required: true, type: () => String }, description: { required: false, type: () => String }, type: { required: true, type: () => Object, enum: ['percentage', 'fixed'] }, value: { required: true, type: () => Number, minimum: 0 }, minAmount: { required: false, type: () => Number, minimum: 0 }, maxDiscount: { required: false, type: () => Number, minimum: 0 }, usageLimit: { required: false, type: () => Number, minimum: 1 }, status: { required: false, type: () => String }, expiresAt: { required: false, type: () => String } };
    }
}
exports.CreateCouponDto = CreateCouponDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Coupon code (must be unique)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Coupon description', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Discount type: percentage or fixed', enum: ['percentage', 'fixed'] }),
    (0, class_validator_1.IsIn)(['percentage', 'fixed']),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Discount value' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateCouponDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Minimum order amount to apply coupon', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCouponDto.prototype, "minAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Maximum discount amount (for percentage coupons)', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCouponDto.prototype, "maxDiscount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Maximum number of times coupon can be used', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCouponDto.prototype, "usageLimit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Coupon status', default: 'active' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Expiry date', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "expiresAt", void 0);


/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCouponDto = void 0;
const openapi = __webpack_require__(3);
const swagger_1 = __webpack_require__(3);
const create_coupon_dto_1 = __webpack_require__(79);
class UpdateCouponDto extends (0, swagger_1.PartialType)(create_coupon_dto_1.CreateCouponDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateCouponDto = UpdateCouponDto;


/***/ }),
/* 81 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutsModule = void 0;
const common_1 = __webpack_require__(2);
const payouts_service_1 = __webpack_require__(82);
const payouts_controller_1 = __webpack_require__(84);
const prisma_module_1 = __webpack_require__(10);
let PayoutsModule = class PayoutsModule {
};
exports.PayoutsModule = PayoutsModule;
exports.PayoutsModule = PayoutsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [payouts_controller_1.PayoutsController],
        providers: [payouts_service_1.PayoutsService],
        exports: [payouts_service_1.PayoutsService],
    })
], PayoutsModule);


/***/ }),
/* 82 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutsService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(11);
const library_1 = __webpack_require__(83);
let PayoutsService = class PayoutsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPayoutDto) {
        const seller = await this.prisma.user.findUnique({
            where: { id: createPayoutDto.seller_id },
        });
        if (!seller) {
            throw new common_1.NotFoundException('Seller not found');
        }
        const userRoles = await this.prisma.userRole.findMany({
            where: { user_id: seller.id },
            include: { role: true }
        });
        const hasSellerRole = userRoles.some(ur => ur.role.slug === 'seller');
        if (!hasSellerRole) {
            throw new common_1.BadRequestException('User is not a seller');
        }
        return this.prisma.payout.create({
            data: {
                user: { connect: { id: createPayoutDto.seller_id } },
                amount: new library_1.Decimal(createPayoutDto.amount),
                method: createPayoutDto.method || 'bank_transfer',
                description: createPayoutDto.description,
                notes: createPayoutDto.notes,
                status: 'PENDING',
            },
        });
    }
    async findAll(filters) {
        const where = {};
        if (filters?.seller_id) {
            where.seller_id = filters.seller_id;
        }
        if (filters?.status) {
            where.status = filters.status;
        }
        return this.prisma.payout.findMany({
            where,
            orderBy: { created_at: 'desc' },
            include: {
                seller: {
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
        const payout = await this.prisma.payout.findUnique({
            where: { id: parseInt(id) },
            include: {
                seller: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        if (!payout) {
            throw new common_1.NotFoundException('Payout not found');
        }
        return payout;
    }
    async update(id, updatePayoutDto) {
        const payout = await this.findOne(id);
        const updateData = {};
        if (updatePayoutDto.status) {
            updateData.status = updatePayoutDto.status;
            const now = new Date();
            if (updatePayoutDto.status === 'processing') {
                updateData.process_date = now;
            }
            else if (updatePayoutDto.status === 'completed') {
                updateData.completed_date = now;
            }
        }
        if (updatePayoutDto.reference !== undefined) {
            updateData.reference = updatePayoutDto.reference;
        }
        if (updatePayoutDto.notes !== undefined) {
            updateData.notes = updatePayoutDto.notes;
        }
        return this.prisma.payout.update({
            where: { id: parseInt(id) },
            data: updateData,
        });
    }
    async remove(id) {
        const payout = await this.findOne(id);
        return this.prisma.payout.delete({
            where: { id: parseInt(id) },
        });
    }
};
exports.PayoutsService = PayoutsService;
exports.PayoutsService = PayoutsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PayoutsService);


/***/ }),
/* 83 */
/***/ ((module) => {

module.exports = require("@prisma/client/runtime/library");

/***/ }),
/* 84 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutsController = void 0;
const openapi = __webpack_require__(3);
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(3);
const jwt_auth_guard_1 = __webpack_require__(20);
const payouts_service_1 = __webpack_require__(82);
const create_payout_dto_1 = __webpack_require__(85);
const update_payout_dto_1 = __webpack_require__(86);
let PayoutsController = class PayoutsController {
    payoutsService;
    constructor(payoutsService) {
        this.payoutsService = payoutsService;
    }
    create(createPayoutDto) {
        return this.payoutsService.create(createPayoutDto);
    }
    findAll(sellerId, status) {
        return this.payoutsService.findAll({ seller_id: sellerId, status });
    }
    findOne(id) {
        return this.payoutsService.findOne(id);
    }
    update(id, updatePayoutDto) {
        return this.payoutsService.update(id, updatePayoutDto);
    }
    remove(id) {
        return this.payoutsService.remove(id);
    }
};
exports.PayoutsController = PayoutsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new payout request' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Payout created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payout_dto_1.CreatePayoutDto]),
    __metadata("design:returntype", void 0)
], PayoutsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all payouts' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payouts retrieved successfully' }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Query)('seller_id')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], PayoutsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a payout by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payout retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payout not found' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayoutsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a payout' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payout updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payout not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_payout_dto_1.UpdatePayoutDto]),
    __metadata("design:returntype", void 0)
], PayoutsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a payout' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Payout deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payout not found' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayoutsController.prototype, "remove", null);
exports.PayoutsController = PayoutsController = __decorate([
    (0, swagger_1.ApiTags)('Payouts'),
    (0, common_1.Controller)('payouts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [payouts_service_1.PayoutsService])
], PayoutsController);


/***/ }),
/* 85 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePayoutDto = void 0;
const openapi = __webpack_require__(3);
const class_validator_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(3);
class CreatePayoutDto {
    seller_id;
    amount;
    method;
    description;
    notes;
    static _OPENAPI_METADATA_FACTORY() {
        return { seller_id: { required: true, type: () => Number }, amount: { required: true, type: () => Number, minimum: 0.01 }, method: { required: false, type: () => String }, description: { required: false, type: () => String }, notes: { required: false, type: () => String } };
    }
}
exports.CreatePayoutDto = CreatePayoutDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Seller ID requesting the payout', example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePayoutDto.prototype, "seller_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Payout amount', example: 500.00 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01, { message: 'Amount must be greater than 0' }),
    __metadata("design:type", Number)
], CreatePayoutDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Payout method', example: 'bank_transfer' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePayoutDto.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Payout description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePayoutDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Additional notes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePayoutDto.prototype, "notes", void 0);


/***/ }),
/* 86 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePayoutDto = void 0;
const openapi = __webpack_require__(3);
const class_validator_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(3);
class UpdatePayoutDto {
    status;
    reference;
    notes;
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: false, type: () => String }, reference: { required: false, type: () => String }, notes: { required: false, type: () => String } };
    }
}
exports.UpdatePayoutDto = UpdatePayoutDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Payout status', example: 'completed' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePayoutDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Reference number' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePayoutDto.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Additional notes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePayoutDto.prototype, "notes", void 0);


/***/ }),
/* 87 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TicketsModule = void 0;
const common_1 = __webpack_require__(2);
const tickets_service_1 = __webpack_require__(88);
const tickets_controller_1 = __webpack_require__(89);
const prisma_module_1 = __webpack_require__(10);
let TicketsModule = class TicketsModule {
};
exports.TicketsModule = TicketsModule;
exports.TicketsModule = TicketsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [tickets_controller_1.TicketsController],
        providers: [tickets_service_1.TicketsService],
        exports: [tickets_service_1.TicketsService],
    })
], TicketsModule);


/***/ }),
/* 88 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TicketsService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(11);
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
                user: { connect: { id: userId } },
                subject: createTicketDto.subject,
                message: createTicketDto.message,
                priority: (createTicketDto.priority || 'MEDIUM').toUpperCase(),
                category: createTicketDto.category || 'general',
                status: 'OPEN',
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
                    include: {
                        user_roles: {
                            include: { role: true }
                        }
                    }
                });
                if (!assignedUser) {
                    throw new common_1.NotFoundException('Assigned user not found');
                }
                const hasAdminRole = assignedUser.user_roles?.some(ur => ur.role.slug === 'admin');
                if (!hasAdminRole) {
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


/***/ }),
/* 89 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TicketsController = void 0;
const openapi = __webpack_require__(3);
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(3);
const jwt_auth_guard_1 = __webpack_require__(20);
const tickets_service_1 = __webpack_require__(88);
const create_ticket_dto_1 = __webpack_require__(90);
const update_ticket_dto_1 = __webpack_require__(91);
let TicketsController = class TicketsController {
    ticketsService;
    constructor(ticketsService) {
        this.ticketsService = ticketsService;
    }
    create(createTicketDto, req) {
        return this.ticketsService.create(createTicketDto, req.user.id);
    }
    findAll(userId, status, priority, assignedTo) {
        return this.ticketsService.findAll({
            user_id: userId,
            status,
            priority,
            assigned_to: assignedTo,
        });
    }
    findOne(id) {
        return this.ticketsService.findOne(id);
    }
    update(id, updateTicketDto) {
        return this.ticketsService.update(id, updateTicketDto);
    }
    remove(id) {
        return this.ticketsService.remove(id);
    }
};
exports.TicketsController = TicketsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new ticket' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Ticket created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ticket_dto_1.CreateTicketDto, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all tickets' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tickets retrieved successfully' }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Query)('user_id')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('priority')),
    __param(3, (0, common_1.Query)('assigned_to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Number]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a ticket by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a ticket' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ticket_dto_1.UpdateTicketDto]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a ticket' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Ticket deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "remove", null);
exports.TicketsController = TicketsController = __decorate([
    (0, swagger_1.ApiTags)('Tickets'),
    (0, common_1.Controller)('tickets'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [tickets_service_1.TicketsService])
], TicketsController);


/***/ }),
/* 90 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTicketDto = void 0;
const openapi = __webpack_require__(3);
const class_validator_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(3);
class CreateTicketDto {
    subject;
    message;
    priority;
    category;
    static _OPENAPI_METADATA_FACTORY() {
        return { subject: { required: true, type: () => String }, message: { required: true, type: () => String }, priority: { required: false, type: () => String }, category: { required: false, type: () => String } };
    }
}
exports.CreateTicketDto = CreateTicketDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ticket subject', example: 'Unable to login' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ticket message', example: 'I am unable to login to my account' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ticket priority', example: 'high', enum: ['low', 'medium', 'high', 'urgent'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ticket category', example: 'technical', enum: ['support', 'technical', 'billing', 'general'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "category", void 0);


/***/ }),
/* 91 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateTicketDto = void 0;
const openapi = __webpack_require__(3);
const class_validator_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(3);
class UpdateTicketDto {
    status;
    priority;
    assigned_to;
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: false, type: () => String }, priority: { required: false, type: () => String }, assigned_to: { required: false, type: () => Number } };
    }
}
exports.UpdateTicketDto = UpdateTicketDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ticket status', enum: ['open', 'in_progress', 'resolved', 'closed'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTicketDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ticket priority', enum: ['low', 'medium', 'high', 'urgent'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTicketDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Admin ID to assign ticket to' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateTicketDto.prototype, "assigned_to", void 0);


/***/ }),
/* 92 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditLogsModule = void 0;
const common_1 = __webpack_require__(2);
const audit_logs_service_1 = __webpack_require__(93);
const audit_logs_controller_1 = __webpack_require__(94);
const prisma_module_1 = __webpack_require__(10);
let AuditLogsModule = class AuditLogsModule {
};
exports.AuditLogsModule = AuditLogsModule;
exports.AuditLogsModule = AuditLogsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [audit_logs_controller_1.AuditLogsController],
        providers: [audit_logs_service_1.AuditLogsService],
        exports: [audit_logs_service_1.AuditLogsService],
    })
], AuditLogsModule);


/***/ }),
/* 93 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditLogsService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(11);
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


/***/ }),
/* 94 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditLogsController = void 0;
const openapi = __webpack_require__(3);
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(3);
const jwt_auth_guard_1 = __webpack_require__(20);
const audit_logs_service_1 = __webpack_require__(93);
const query_audit_logs_dto_1 = __webpack_require__(95);
let AuditLogsController = class AuditLogsController {
    auditLogsService;
    constructor(auditLogsService) {
        this.auditLogsService = auditLogsService;
    }
    findAll(query) {
        return this.auditLogsService.findAll(query);
    }
    export(query) {
        return this.auditLogsService.export(query);
    }
    findOne(id) {
        return this.auditLogsService.findOne(id);
    }
};
exports.AuditLogsController = AuditLogsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all audit logs' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Audit logs retrieved successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_audit_logs_dto_1.QueryAuditLogsDto]),
    __metadata("design:returntype", void 0)
], AuditLogsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('export'),
    (0, swagger_1.ApiOperation)({ summary: 'Export audit logs' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Audit logs exported successfully' }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_audit_logs_dto_1.QueryAuditLogsDto]),
    __metadata("design:returntype", void 0)
], AuditLogsController.prototype, "export", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get an audit log by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Audit log retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Audit log not found' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuditLogsController.prototype, "findOne", null);
exports.AuditLogsController = AuditLogsController = __decorate([
    (0, swagger_1.ApiTags)('Audit Logs'),
    (0, common_1.Controller)('audit-logs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [audit_logs_service_1.AuditLogsService])
], AuditLogsController);


/***/ }),
/* 95 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryAuditLogsDto = void 0;
const openapi = __webpack_require__(3);
const class_validator_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(3);
class QueryAuditLogsDto {
    user_id;
    action;
    entity_type;
    entity_id;
    start_date;
    end_date;
    page;
    limit;
    static _OPENAPI_METADATA_FACTORY() {
        return { user_id: { required: false, type: () => Number }, action: { required: false, type: () => String }, entity_type: { required: false, type: () => String }, entity_id: { required: false, type: () => Number }, start_date: { required: false, type: () => String }, end_date: { required: false, type: () => String }, page: { required: false, type: () => Number }, limit: { required: false, type: () => Number } };
    }
}
exports.QueryAuditLogsDto = QueryAuditLogsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by user ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QueryAuditLogsDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by action' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryAuditLogsDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by entity type' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryAuditLogsDto.prototype, "entity_type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by entity ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QueryAuditLogsDto.prototype, "entity_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by start date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], QueryAuditLogsDto.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by end date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], QueryAuditLogsDto.prototype, "end_date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Page number', default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QueryAuditLogsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Number of items per page', default: 50 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QueryAuditLogsDto.prototype, "limit", void 0);


/***/ }),
/* 96 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadModule = void 0;
const common_1 = __webpack_require__(2);
let UploadModule = class UploadModule {
};
exports.UploadModule = UploadModule;
exports.UploadModule = UploadModule = __decorate([
    (0, common_1.Module)({
        providers: [],
        controllers: [],
        exports: [],
    })
], UploadModule);


/***/ }),
/* 97 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationModule = void 0;
const common_1 = __webpack_require__(2);
let NotificationModule = class NotificationModule {
};
exports.NotificationModule = NotificationModule;
exports.NotificationModule = NotificationModule = __decorate([
    (0, common_1.Module)({
        providers: [],
        controllers: [],
        exports: [],
    })
], NotificationModule);


/***/ }),
/* 98 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthModule = void 0;
const common_1 = __webpack_require__(2);
const health_controller_1 = __webpack_require__(99);
const common_module_1 = __webpack_require__(35);
let HealthModule = class HealthModule {
};
exports.HealthModule = HealthModule;
exports.HealthModule = HealthModule = __decorate([
    (0, common_1.Module)({
        imports: [common_module_1.CommonModule],
        controllers: [health_controller_1.HealthController],
    })
], HealthModule);


/***/ }),
/* 99 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthController = void 0;
const openapi = __webpack_require__(3);
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(3);
const database_health_service_1 = __webpack_require__(36);
const jwt_auth_guard_1 = __webpack_require__(20);
const roles_guard_1 = __webpack_require__(29);
const decorators_1 = __webpack_require__(21);
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
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "check", null);
__decorate([
    (0, common_1.Get)('database'),
    (0, swagger_1.ApiOperation)({ summary: 'Database health check' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Database health status' }),
    openapi.ApiResponse({ status: 200 }),
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
    openapi.ApiResponse({ status: 200 }),
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
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "cleanupOrphanedData", null);
exports.HealthController = HealthController = __decorate([
    (0, swagger_1.ApiTags)('health'),
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [database_health_service_1.DatabaseHealthService])
], HealthController);


/***/ }),
/* 100 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaSerializeInterceptor = void 0;
const common_1 = __webpack_require__(2);
const operators_1 = __webpack_require__(101);
let PrismaSerializeInterceptor = class PrismaSerializeInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => this.transform(data)));
    }
    transform(value) {
        if (value === null || value === undefined) {
            return value;
        }
        if (value && typeof value === 'object' && value.constructor && value.constructor.name === 'Decimal') {
            return Number(value);
        }
        if (Array.isArray(value)) {
            return value.map((item) => this.transform(item));
        }
        if (typeof value === 'object') {
            const transformed = {};
            for (const key in value) {
                if (value.hasOwnProperty(key)) {
                    transformed[key] = this.transform(value[key]);
                }
            }
            return transformed;
        }
        return value;
    }
};
exports.PrismaSerializeInterceptor = PrismaSerializeInterceptor;
exports.PrismaSerializeInterceptor = PrismaSerializeInterceptor = __decorate([
    (0, common_1.Injectable)()
], PrismaSerializeInterceptor);


/***/ }),
/* 101 */
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(3);
const config_1 = __webpack_require__(4);
const helmet_1 = __webpack_require__(5);
const compression = __webpack_require__(6);
const app_module_1 = __webpack_require__(7);
const prisma_serialize_interceptor_1 = __webpack_require__(100);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: [
            'https://nxoland.com',
            'https://www.nxoland.com',
            'http://localhost:3000',
            'http://localhost:5173',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:5173',
            configService.get('CORS_ORIGIN', 'https://www.nxoland.com')
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
            'Origin',
            'X-Requested-With',
            'Access-Control-Request-Method',
            'Access-Control-Request-Headers'
        ],
        exposedHeaders: ['Authorization'],
        preflightContinue: false,
        optionsSuccessStatus: 204
    });
    app.use((0, helmet_1.default)({
        crossOriginEmbedderPolicy: false,
        crossOriginOpenerPolicy: false,
        crossOriginResourcePolicy: false,
    }));
    app.use(compression());
    app.use((req, res, next) => {
        console.log(`🔍 ${req.method} ${req.url}`);
        next();
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalInterceptors(new prisma_serialize_interceptor_1.PrismaSerializeInterceptor());
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle(configService.get('SWAGGER_TITLE', 'NXOLand API'))
        .setDescription(configService.get('SWAGGER_DESCRIPTION', 'Complete Digital Marketplace Platform API'))
        .setVersion(configService.get('SWAGGER_VERSION', '1.0.0'))
        .addBearerAuth()
        .addTag('auth', 'Authentication endpoints')
        .addTag('users', 'User management')
        .addTag('products', 'Product management')
        .addTag('cart', 'Shopping cart')
        .addTag('orders', 'Order management')
        .addTag('wishlist', 'Wishlist management')
        .addTag('disputes', 'Dispute resolution')
        .addTag('seller', 'Seller dashboard')
        .addTag('admin', 'Admin panel')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(configService.get('SWAGGER_PATH', 'api/docs'), app, document);
    const routes = app.getHttpServer()._events.request;
    const registeredRoutes = [];
    app.getHttpAdapter().getInstance()._router?.stack?.forEach((middleware) => {
        if (middleware.route) {
            const methods = Object.keys(middleware.route.methods).join(',').toUpperCase();
            registeredRoutes.push(`${methods} ${middleware.route.path}`);
        }
    });
    console.log('📋 Registered Routes:');
    registeredRoutes.forEach(route => console.log(`  ${route}`));
    const port = configService.get('PORT', 3000);
    await app.listen(port);
    console.log(`🚀 NXOLand API is running on: https://api.nxoland.com/api`);
    console.log(`📚 API Documentation: https://api.nxoland.com/api/${configService.get('SWAGGER_PATH', 'api/docs')}`);
}
bootstrap();

})();

/******/ })()
;