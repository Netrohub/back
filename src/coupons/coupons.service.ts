import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponsService {
  constructor(private prisma: PrismaService) {}

  async create(createCouponDto: CreateCouponDto) {
    // Check if coupon with same code already exists
    const existingCoupon = await this.prisma.coupon.findUnique({
      where: { code: createCouponDto.code },
    });

    if (existingCoupon) {
      throw new ConflictException('Coupon with this code already exists');
    }

    // Validate percentage coupon
    if ((createCouponDto.type as string).toUpperCase() === 'PERCENTAGE' && createCouponDto.value > 100) {
      throw new BadRequestException('Percentage discount cannot exceed 100%');
    }

    // Convert expiresAt string to Date if provided
    const expiresAt = createCouponDto.expiresAt ? new Date(createCouponDto.expiresAt) : null;

    return this.prisma.coupon.create({
      data: {
        name: createCouponDto.code,
        code: createCouponDto.code.toUpperCase(),
        description: createCouponDto.description || null,
        type: createCouponDto.type.toUpperCase() as any,
        value: createCouponDto.value,
        min_amount: createCouponDto.minAmount || null,
        max_discount: createCouponDto.maxDiscount || null,
        usage_limit: createCouponDto.usageLimit || null,
        expires_at: expiresAt,
      } as any,
    });
  }

  async findAll() {
    return this.prisma.coupon.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: string) {
    const coupon = await this.prisma.coupon.findUnique({
      where: { id: parseInt(id) },
    });

    if (!coupon) {
      throw new NotFoundException(`Coupon with ID ${id} not found`);
    }

    return coupon;
  }

  async update(id: string, updateCouponDto: UpdateCouponDto) {
    // Check if coupon exists
    const coupon = await this.findOne(id);

    // Check if code is being changed and conflicts with existing coupon
    if (updateCouponDto.code && updateCouponDto.code.toUpperCase() !== coupon.code) {
      const existingCoupon = await this.prisma.coupon.findUnique({
        where: { code: updateCouponDto.code.toUpperCase() },
      });

      if (existingCoupon) {
        throw new ConflictException('Coupon with this code already exists');
      }
    }

    // Validate percentage coupon
    if (updateCouponDto.type === 'percentage' && updateCouponDto.value && updateCouponDto.value > 100) {
      throw new BadRequestException('Percentage discount cannot exceed 100%');
    }

    // Convert expiresAt string to Date if provided
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
        // ...(updateCouponDto.status && { status: updateCouponDto.status }), // Field not in v2.0 schema
        ...(expiresAt !== undefined && { expires_at: expiresAt }),
      } as any,
    });
  }

  async remove(id: string) {
    // Check if coupon exists
    await this.findOne(id);

    return this.prisma.coupon.delete({
      where: { id: parseInt(id) },
    });
  }
}
