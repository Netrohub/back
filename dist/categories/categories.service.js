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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
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
                status: createCategoryDto.isActive !== undefined ? (createCategoryDto.isActive ? 'active' : 'inactive') : 'active',
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
                category: {
                    contains: '',
                },
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
//# sourceMappingURL=categories.service.js.map