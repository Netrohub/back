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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
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
            where.category = category;
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
    async findById(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                seller: {
                    select: {
                        id: true,
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
                description: createProductDto.description,
                price: createProductDto.price,
                category: createProductDto.categoryId,
                images: createProductDto.images,
                seller_id: sellerId,
            },
            include: {
                seller: {
                    select: {
                        id: true,
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
        return this.prisma.product.update({
            where: { id },
            data: updateProductDto,
            include: {
                seller: {
                    select: {
                        id: true,
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
            data: { status: 'deleted' },
        });
    }
    async findBySeller(sellerId) {
        return this.prisma.product.findMany({
            where: { seller_id: sellerId },
            include: {
                seller: {
                    select: {
                        id: true,
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
//# sourceMappingURL=products.service.js.map