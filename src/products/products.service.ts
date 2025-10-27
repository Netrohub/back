import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto, ProductFiltersDto } from '../types';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: ProductFiltersDto = {}) {
    const {
      categoryId: category,
      search,
      minPrice: min_price,
      maxPrice: max_price,
      status = 'active',
      page = 1,
      limit: per_page = 20,
      sortBy: sort = 'created_at',
    } = filters;

    const where: any = {
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

  async getTrending(limit: number = 10) {
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

  async getByCategory(categorySlug: string, filters: ProductFiltersDto = {}) {
    const {
      search,
      minPrice: min_price,
      maxPrice: max_price,
      page = 1,
      limit: per_page = 20,
      sortBy: sort = 'created_at',
    } = filters;

    const where: any = {
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

  async findById(id: number) {
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
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(createProductDto: CreateProductDto, sellerId: number) {
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        slug: createProductDto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: createProductDto.description,
        price: createProductDto.price,
        category_id: createProductDto.categoryId,
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

    // Prepare update data
    const updateData: any = {
      ...updateProductDto
    };
    
    // Handle category update
    if (updateProductDto.categoryId) {
      updateData.category_id = updateProductDto.categoryId;
      delete updateData.categoryId;
    }
    
    // Handle image updates
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
      data: { status: 'INACTIVE' },
    });
  }

  async findBySeller(sellerId: number) {
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
}
