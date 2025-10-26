import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePayoutDto } from './dto/create-payout.dto';
import { UpdatePayoutDto } from './dto/update-payout.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class PayoutsService {
  constructor(private prisma: PrismaService) {}

  async create(createPayoutDto: CreatePayoutDto) {
    // Validate seller exists
    const seller = await this.prisma.user.findUnique({
      where: { id: createPayoutDto.seller_id },
    });

    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    // Validate seller has seller role
    const roles = Array.isArray(seller.roles) ? seller.roles : [seller.roles];
    if (!roles.includes('seller')) {
      throw new BadRequestException('User is not a seller');
    }

    // Create payout
    return this.prisma.payout.create({
      data: {
        seller_id: createPayoutDto.seller_id,
        amount: new Decimal(createPayoutDto.amount),
        method: createPayoutDto.method || 'bank_transfer',
        description: createPayoutDto.description,
        notes: createPayoutDto.notes,
        status: 'pending',
      },
    });
  }

  async findAll(filters?: { seller_id?: number; status?: string }) {
    const where: any = {};

    if (filters?.seller_id) {
      where.seller_id = filters.seller_id;
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    return this.prisma.payout.findMany({
      where,
      orderBy: { request_date: 'desc' },
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

  async findOne(id: string) {
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
      throw new NotFoundException('Payout not found');
    }

    return payout;
  }

  async update(id: string, updatePayoutDto: UpdatePayoutDto) {
    const payout = await this.findOne(id);

    const updateData: any = {};

    if (updatePayoutDto.status) {
      updateData.status = updatePayoutDto.status;

      // Update dates based on status
      const now = new Date();
      if (updatePayoutDto.status === 'processing') {
        updateData.process_date = now;
      } else if (updatePayoutDto.status === 'completed') {
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

  async remove(id: string) {
    const payout = await this.findOne(id);

    return this.prisma.payout.delete({
      where: { id: parseInt(id) },
    });
  }
}
