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
        // resolved_by: adminId, // Field not in v2.0 schema
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

  async getDisputeMessages(disputeId: number, userId: number, userRole: string) {
    // Verify dispute exists and user has access
    const dispute = await this.prisma.dispute.findUnique({
      where: { id: disputeId },
      select: {
        buyer_id: true,
        seller_id: true,
        assigned_to: true,
      },
    });

    if (!dispute) {
      throw new NotFoundException('Dispute not found');
    }

    // Check if user has access (buyer, seller, assigned admin, or any admin)
    const hasAccess = 
      dispute.buyer_id === userId ||
      dispute.seller_id === userId ||
      dispute.assigned_to === userId ||
      userRole === 'admin';

    if (!hasAccess) {
      throw new ForbiddenException('Access denied');
    }

    // Get messages (filter internal messages for non-admins)
    const where: any = { dispute_id: disputeId };
    if (userRole !== 'admin') {
      where.is_internal = false;
    }

    return this.prisma.disputeMessage.findMany({
      where,
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { created_at: 'asc' },
    });
  }

  async addDisputeMessage(disputeId: number, userId: number, message: string, isInternal: boolean = false) {
    // Verify dispute exists and user has access
    const dispute = await this.prisma.dispute.findUnique({
      where: { id: disputeId },
      select: {
        buyer_id: true,
        seller_id: true,
        assigned_to: true,
      },
    });

    if (!dispute) {
      throw new NotFoundException('Dispute not found');
    }

    // Only admins can send internal messages
    if (isInternal) {
      // For now, check if user is admin - in production, use RolesGuard
      // This is a simplified check
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          user_roles: {
            include: { role: true },
          },
        },
      });

      const isAdmin = user?.user_roles?.some(ur => ur.role.slug === 'admin') || false;
      if (!isAdmin) {
        throw new ForbiddenException('Only admins can send internal messages');
      }
    }

    // Check if user is buyer, seller, assigned admin, or admin
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        user_roles: {
          include: { role: true },
        },
      },
    });

    const isAdmin = user?.user_roles?.some(ur => ur.role.slug === 'admin') || false;
    const hasAccess =
      dispute.buyer_id === userId ||
      dispute.seller_id === userId ||
      dispute.assigned_to === userId ||
      isAdmin;

    if (!hasAccess) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.disputeMessage.create({
      data: {
        dispute_id: disputeId,
        sender_id: userId,
        message,
        is_internal: isInternal,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async uploadDisputeEvidence(
    disputeId: number,
    userId: number,
    evidenceData: { file_url: string; file_name: string; file_type: string; file_size: number; description?: string },
  ) {
    // Verify dispute exists and user has access
    const dispute = await this.prisma.dispute.findUnique({
      where: { id: disputeId },
      select: {
        buyer_id: true,
        seller_id: true,
      },
    });

    if (!dispute) {
      throw new NotFoundException('Dispute not found');
    }

    // Only buyer or seller can upload evidence
    if (dispute.buyer_id !== userId && dispute.seller_id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.disputeEvidence.create({
      data: {
        dispute_id: disputeId,
        uploaded_by: userId,
        file_url: evidenceData.file_url,
        file_name: evidenceData.file_name,
        file_type: evidenceData.file_type,
        file_size: evidenceData.file_size,
        description: evidenceData.description,
      },
    });
  }
}
