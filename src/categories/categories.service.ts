import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    // Generate slug from name if not provided
    const slug = createCategoryDto.slug || this.generateSlug(createCategoryDto.name);

    // Check if category with same slug already exists
    const existingCategory = await this.prisma.category.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      throw new ConflictException('Category with this slug already exists');
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

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    // Check if category exists
    const category = await this.findOne(id);

    // Generate slug if name is being updated
    let slug = updateCategoryDto.slug;
    if (updateCategoryDto.name && !updateCategoryDto.slug) {
      slug = this.generateSlug(updateCategoryDto.name);
    }

    // Check if slug is being changed and conflicts with existing category
    if (slug && slug !== category.slug) {
      const existingCategory = await this.prisma.category.findUnique({
        where: { slug },
      });

      if (existingCategory) {
        throw new ConflictException('Category with this slug already exists');
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

  async remove(id: string) {
    // Check if category exists
    await this.findOne(id);

    // Check if category has products (using category field as string)
    const productsCount = await this.prisma.product.count({
      where: { 
        category: {
          contains: '', // We'll check if any products reference this category
        },
      },
    });

    // Note: The schema doesn't have a proper relationship, so we can't easily check this
    // For now, we'll allow deletion. In production, you'd want to add a proper relation.

    return this.prisma.category.delete({
      where: { id: parseInt(id) },
    });
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}
