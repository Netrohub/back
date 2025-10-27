import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DisputesService {
  constructor(private prisma: PrismaService) {}

  async getDisputes(userId: number) {
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

  async getDisputeById(id: number, userId: number) {
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
      throw new NotFoundException('Dispute not found');
    }

    if (dispute.buyer_id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return dispute;
  }

  async createDispute(userId: number, orderId: number, reason: string, description: string) {
    // Check if order exists and belongs to user
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        buyer_id: userId,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Check if dispute already exists for this order
    const existingDispute = await this.prisma.dispute.findFirst({
      where: { order_id: orderId },
    });

    if (existingDispute) {
      throw new ForbiddenException('Dispute already exists for this order');
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

  async updateDisputeStatus(id: number, status: string, adminId: number) {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id },
    });

    if (!dispute) {
      throw new NotFoundException('Dispute not found');
    }

    return this.prisma.dispute.update({
      where: { id },
      data: {
        status: status.toUpperCase() as any,
        resolved_by: adminId,
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
}
