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
    // ✅ FIXED: Fetch real payouts from database
    return this.prisma.payout.findMany({
      where: {
        seller_id: sellerId,
      },
      orderBy: {
        created_at: 'desc',
      },
        select: {
            id: true,
            amount: true,
            status: true,
            method: true,
            reference: true,
            notes: true,
            created_at: true,
            processed_at: true,
          },
    });
  }

  async getSellerNotifications(sellerId: number) {
    // ✅ FIXED: Return order-related notifications from actual orders
    // Get recent orders for this seller
    const recentOrders = await this.prisma.order.findMany({
      where: {
        seller_id: sellerId,
        created_at: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 20,
      select: {
        id: true,
        order_number: true,
        status: true,
        payment_status: true,
        total_amount: true,
        created_at: true,
        buyer: {
          select: {
            name: true,
          },
        },
      },
    });

    // Transform orders into notification format
    return recentOrders.map((order) => ({
      id: order.id,
      type: 'order',
      message: `${order.status === 'PENDING' ? 'New order' : `Order ${order.status.toLowerCase()}`} #${order.order_number} from ${order.buyer.name} - $${order.total_amount}`,
      read: order.status !== 'PENDING', // Mark pending orders as unread
      created_at: order.created_at,
      order_id: order.id,
      order_status: order.status,
      payment_status: order.payment_status,
    }));
  }
}
