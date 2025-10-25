"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const bull_1 = require("@nestjs/bull");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const products_module_1 = require("./products/products.module");
const cart_module_1 = require("./cart/cart.module");
const orders_module_1 = require("./orders/orders.module");
const wishlist_module_1 = require("./wishlist/wishlist.module");
const disputes_module_1 = require("./disputes/disputes.module");
const kyc_module_1 = require("./kyc/kyc.module");
const seller_module_1 = require("./seller/seller.module");
const admin_module_1 = require("./admin/admin.module");
const categories_module_1 = require("./categories/categories.module");
const upload_module_1 = require("./upload/upload.module");
const email_module_1 = require("./email/email.module");
const notification_module_1 = require("./notification/notification.module");
const health_module_1 = require("./health/health.module");
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
            upload_module_1.UploadModule,
            email_module_1.EmailModule,
            notification_module_1.NotificationModule,
            health_module_1.HealthModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map