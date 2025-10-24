import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto, ProductFiltersDto } from '../types';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: ProductFiltersDto = {}) {
    const {
      category,
      search,
      min_price,
      max_price,
      status = 'active',
      page = 1,
      per_page = 20,
      sort = 'created_at',
    } = filters;

    const where: any = {
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

  async findById(id: number) {
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
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(createProductDto: CreateProductDto, sellerId: number) {
    return this.prisma.product.create({
      data: {
        ...createProductDto,
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

  async update(id: number, updateProductDto: UpdateProductDto, sellerId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.seller_id !== sellerId) {
      throw new ForbiddenException('You can only update your own products');
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

  async remove(id: number, sellerId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.seller_id !== sellerId) {
      throw new ForbiddenException('You can only delete your own products');
    }

    return this.prisma.product.update({
      where: { id },
      data: { status: 'deleted' },
    });
  }

  async findBySeller(sellerId: number) {
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
}
