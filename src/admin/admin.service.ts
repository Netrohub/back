import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // Users Management
  async getUsers(page: number = 1, perPage: number = 10, search?: string, role?: string, status?: string) {
    const skip = (page - 1) * perPage;
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { username: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (role) {
      where.roles = { contains: role };
    }

    if (status) {
      where.is_active = status === 'active';
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: perPage,
        select: {
          id: true,
          username: true,
          name: true,
          email: true,
          phone: true,
          roles: true,
          is_active: true,
          kyc_verified: true,
          created_at: true,
          last_login_at: true,
        },
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users,
      pagination: {
        page,
        per_page: perPage,
        total,
        total_pages: Math.ceil(total / perPage),
      },
    };
  }

  async getUser(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        roles: true,
        is_active: true,
        kyc_verified: true,
        kyc_status: true,
        created_at: true,
        updated_at: true,
        last_login_at: true,
      },
    });
  }

  async updateUser(id: number, updateData: any) {
    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  // Orders Management
  async getOrders(page: number = 1, perPage: number = 10, status?: string, dateFrom?: string, dateTo?: string) {
    const skip = (page - 1) * perPage;
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (dateFrom || dateTo) {
      where.created_at = {};
      if (dateFrom) where.created_at.gte = new Date(dateFrom);
      if (dateTo) where.created_at.lte = new Date(dateTo);
    }

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: perPage,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              username: true,
            },
          },
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      pagination: {
        page,
        per_page: perPage,
        total,
        total_pages: Math.ceil(total / perPage),
      },
    };
  }

  async getOrder(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            username: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });
  }

  async updateOrderStatus(id: number, status: string) {
    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }

  // Vendors Management (using users with seller role)
  async getVendors(page: number = 1, perPage: number = 10, search?: string, status?: string) {
    const skip = (page - 1) * perPage;
    const where: any = {
      roles: { contains: 'seller' },
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { username: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status) {
      where.is_active = status === 'active';
    }

    const [vendors, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: perPage,
        select: {
          id: true,
          username: true,
          name: true,
          email: true,
          phone: true,
          roles: true,
          is_active: true,
          kyc_verified: true,
          created_at: true,
          last_login_at: true,
          products: {
            select: {
              id: true,
              name: true,
              price: true,
              status: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: vendors,
      pagination: {
        page,
        per_page: perPage,
        total,
        total_pages: Math.ceil(total / perPage),
      },
    };
  }

  async getVendor(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        roles: true,
        is_active: true,
        kyc_verified: true,
        kyc_status: true,
        created_at: true,
        updated_at: true,
        last_login_at: true,
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            status: true,
            created_at: true,
          },
        },
      },
    });
  }

  async updateVendorStatus(id: number, status: string) {
    return this.prisma.user.update({
      where: { id },
      data: { is_active: status === 'active' },
    });
  }

  // Listings Management (using products)
  async getListings(page: number = 1, perPage: number = 10, status?: string, category?: string) {
    const skip = (page - 1) * perPage;
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (category) {
      where.category = category;
    }

    const [listings, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: perPage,
        include: {
          seller: {
            select: {
              id: true,
              name: true,
              email: true,
              username: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: listings,
      pagination: {
        page,
        per_page: perPage,
        total,
        total_pages: Math.ceil(total / perPage),
      },
    };
  }

  async getListing(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
            username: true,
          },
        },
      },
    });
  }

  async updateListingStatus(id: number, status: string) {
    return this.prisma.product.update({
      where: { id },
      data: { status },
    });
  }

  // Payouts Management (placeholder - would need actual payout system)
  async getPayouts(page: number = 1, perPage: number = 10, status?: string, dateFrom?: string, dateTo?: string) {
    // This is a placeholder implementation
    // In a real system, you'd have a payouts table
    return {
      data: [],
      pagination: {
        page,
        per_page: perPage,
        total: 0,
        total_pages: 0,
      },
    };
  }

  async getPayout(id: number) {
    // Placeholder implementation
    return null;
  }

  async updatePayoutStatus(id: number, status: string) {
    // Placeholder implementation
    return null;
  }

  // Dashboard Stats
  async getDashboardStats() {
    const [
      totalUsers,
      activeUsers,
      totalOrders,
      totalProducts,
      totalRevenue,
      recentOrders,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { is_active: true } }),
      this.prisma.order.count(),
      this.prisma.product.count(),
      this.prisma.order.aggregate({
        _sum: { total_amount: true },
      }),
      this.prisma.order.findMany({
        take: 5,
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
      }),
    ]);

    return {
      totalUsers,
      activeUsers,
      totalOrders,
      totalProducts,
      totalRevenue: totalRevenue._sum.total_amount || 0,
      recentOrders,
    };
  }
}