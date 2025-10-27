import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SellerService {
  constructor(private prisma: PrismaService) {}

  async getSellerDashboard(sellerId: number) {
    // Get seller stats
    const totalProducts = await this.prisma.product.count({
      where: { seller_id: sellerId },
    });

    const totalOrders = await this.prisma.order.count({
      where: {
        items: {
          some: {
            product: {
              seller_id: sellerId,
            },
          },
        },
      },
    });

    const totalRevenue = await this.prisma.order.aggregate({
      where: {
        items: {
          some: {
            product: {
              seller_id: sellerId,
            },
          },
        },
        status: 'COMPLETED',
      },
      _sum: {
        total_amount: true,
      },
    });

    const recentOrders = await this.prisma.order.findMany({
      where: {
        items: {
          some: {
            product: {
              seller_id: sellerId,
            },
          },
        },
      },
      include: {
        buyer: {
          select: {
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
      take: 5,
    });

    return {
      stats: {
        totalProducts,
        totalOrders,
        totalRevenue: totalRevenue._sum.total_amount || 0,
      },
      recentOrders,
    };
  }

  async getSellerProducts(sellerId: number) {
    return this.prisma.product.findMany({
      where: { seller_id: sellerId },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            cart_items: true,
            wishlist_items: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async getSellerOrders(sellerId: number) {
    return this.prisma.order.findMany({
      where: {
        items: {
          some: {
            product: {
              seller_id: sellerId,
            },
          },
        },
      },
      include: {
        buyer: {
          select: {
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async getSellerPayouts(sellerId: number) {
    // In a real implementation, you would have a payouts table
    // For now, we'll return mock data
    return [
      {
        id: 1,
        amount: 1500.00,
        status: 'completed',
        created_at: new Date(),
        description: 'Monthly payout',
      },
    ];
  }

  async getSellerNotifications(sellerId: number) {
    // In a real implementation, you would have a notifications table
    // For now, we'll return mock data
    return [
      {
        id: 1,
        type: 'order',
        message: 'New order received',
        read: false,
        created_at: new Date(),
      },
      {
        id: 2,
        type: 'payment',
        message: 'Payment received',
        read: true,
        created_at: new Date(),
      },
    ];
  }
}
