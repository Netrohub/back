import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // Users Management
  async getUsers(page: number = 1, perPage: number = 10, search?: string, role?: string, status?: string) {
    // Ensure page and perPage are valid numbers
    const pageNum = Number(page) || 1;
    const perPageNum = Number(perPage) || 10;
    
    // Validate and set reasonable limits
    const validPage = Math.max(1, pageNum);
    const validPerPage = Math.min(Math.max(1, perPageNum), 100); // Max 100 items per page
    
    const skip = (validPage - 1) * validPerPage;
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { username: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (role) {
      where.user_roles = {
        some: {
          role: {
            slug: role
          }
        }
      };
    }

    if (status) {
      where.is_active = status === 'active';
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: validPerPage,
        select: {
          id: true,
          username: true,
          name: true,
          email: true,
          phone: true,
          user_roles: {
            include: {
              role: true
            }
          },
          is_active: true,
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
        page: validPage,
        per_page: validPerPage,
        total,
        total_pages: Math.ceil(total / validPerPage),
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
            user_roles: { include: { role: true } },
        is_active: true,
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
    // Ensure page and perPage are valid numbers
    const pageNum = Number(page) || 1;
    const perPageNum = Number(perPage) || 10;
    
    // Validate and set reasonable limits
    const validPage = Math.max(1, pageNum);
    const validPerPage = Math.min(Math.max(1, perPageNum), 100); // Max 100 items per page
    
    const skip = (validPage - 1) * validPerPage;
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
        take: validPerPage,
        include: {
          buyer: {
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
        page: validPage,
        per_page: validPerPage,
        total,
        total_pages: Math.ceil(total / validPerPage),
      },
    };
  }

  async getOrder(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        buyer: {
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
      data: { status: status as any },
    });
  }

  // Vendors Management (using users with seller role)
  async getVendors(page: number = 1, perPage: number = 10, search?: string, status?: string) {
    // Ensure page and perPage are valid numbers
    const pageNum = Number(page) || 1;
    const perPageNum = Number(perPage) || 10;
    
    // Validate and set reasonable limits
    const validPage = Math.max(1, pageNum);
    const validPerPage = Math.min(Math.max(1, perPageNum), 100); // Max 100 items per page
    
    const skip = (validPage - 1) * validPerPage;
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
        take: validPerPage,
        select: {
          id: true,
          username: true,
          name: true,
          email: true,
          phone: true,
          user_roles: {
            include: {
              role: true
            }
          },
          is_active: true,
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
        page: validPage,
        per_page: validPerPage,
        total,
        total_pages: Math.ceil(total / validPerPage),
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
            user_roles: { include: { role: true } },
        is_active: true,
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
    // Ensure page and perPage are valid numbers
    const pageNum = Number(page) || 1;
    const perPageNum = Number(perPage) || 10;
    
    // Validate and set reasonable limits
    const validPage = Math.max(1, pageNum);
    const validPerPage = Math.min(Math.max(1, perPageNum), 100); // Max 100 items per page
    
    const skip = (validPage - 1) * validPerPage;
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
        take: validPerPage,
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
        page: validPage,
        per_page: validPerPage,
        total,
        total_pages: Math.ceil(total / validPerPage),
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
      data: { status: status as any },
    });
  }

  // ✅ FIXED: Payouts Management - Real implementation
  async getPayouts(page: number = 1, perPage: number = 10, status?: string, dateFrom?: string, dateTo?: string) {
    // Ensure page and perPage are valid numbers
    const pageNum = Number(page) || 1;
    const perPageNum = Number(perPage) || 10;
    
    // Validate and set reasonable limits
    const validPage = Math.max(1, pageNum);
    const validPerPage = Math.min(Math.max(1, perPageNum), 100); // Max 100 items per page
    
    // Build where clause
    const where: any = {};
    
    if (status) {
      where.status = status.toUpperCase();
    }
    
    if (dateFrom || dateTo) {
      where.created_at = {};
      if (dateFrom) {
        where.created_at.gte = new Date(dateFrom);
      }
      if (dateTo) {
        where.created_at.lte = new Date(dateTo);
      }
    }
    
    // Fetch payouts with pagination
    const [payouts, total] = await Promise.all([
      this.prisma.payout.findMany({
        where,
        take: validPerPage,
        skip: (validPage - 1) * validPerPage,
        orderBy: {
          created_at: 'desc',
        },
        include: {
          seller: {
            select: {
              id: true,
              name: true,
              username: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.payout.count({ where }),
    ]);
    
    return {
      data: payouts,
      pagination: {
        page: validPage,
        per_page: validPerPage,
        total,
        total_pages: Math.ceil(total / validPerPage),
      },
    };
  }

  async getPayout(id: number) {
    // ✅ FIXED: Fetch real payout from database
    const payout = await this.prisma.payout.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
          },
        },
      },
    });
    
    if (!payout) {
      throw new NotFoundException(`Payout with ID ${id} not found`);
    }
    
    return payout;
  }

  async updatePayoutStatus(id: number, status: string) {
    // ✅ FIXED: Update payout status
    const payout = await this.prisma.payout.findUnique({
      where: { id },
    });
    
    if (!payout) {
      throw new NotFoundException(`Payout with ID ${id} not found`);
    }
    
    // Update payout status
    const updatedPayout = await this.prisma.payout.update({
      where: { id },
      data: {
        status: status.toUpperCase() as any,
        processed_at: status.toUpperCase() === 'COMPLETED' ? new Date() : null,
      },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
          },
        },
      },
    });
    
    return updatedPayout;
  }

  // Products Management
  async getProducts(page: number = 1, limit: number = 25, search?: string, status?: string, category?: string) {
    const skip = (page - 1) * limit;
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (status) {
      where.status = status.toUpperCase();
    }
    
    if (category) {
      where.category_id = parseInt(category);
    }
    
    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: {
          seller: {
            select: {
              id: true,
              name: true,
              username: true,
              email: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);
    
    return {
      data: products,
      pagination: {
        page,
        limit,
        total,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  async getProduct(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
          },
        },
        category: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
              },
            },
          },
          orderBy: { created_at: 'desc' },
          take: 10,
        },
      },
    });
    
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    return product;
  }

  async updateProductStatus(id: number, status: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    return this.prisma.product.update({
      where: { id },
      data: { status: status.toUpperCase() as any },
    });
  }

  async deleteProduct(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    await this.prisma.product.delete({
      where: { id },
    });
    
    return { message: 'Product deleted successfully' };
  }

  // Disputes Management
  async getDisputes(page: number = 1, limit: number = 25, status?: string, priority?: string) {
    const skip = (page - 1) * limit;
    
    const where: any = {};
    
    if (status) {
      where.status = status.toUpperCase();
    }
    
    if (priority) {
      where.priority = priority.toUpperCase();
    }
    
    const [disputes, total] = await Promise.all([
      this.prisma.dispute.findMany({
        where,
        skip,
        take: limit,
        include: {
          buyer: {
            select: {
              id: true,
              name: true,
              username: true,
              email: true,
            },
          },
          seller: {
            select: {
              id: true,
              name: true,
              username: true,
              email: true,
            },
          },
          order: {
            select: {
              id: true,
              order_number: true,
              total_amount: true,
            },
          },
          assigned_admin: {
            select: {
              id: true,
              name: true,
              username: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.dispute.count({ where }),
    ]);
    
    return {
      data: disputes,
      pagination: {
        page,
        limit,
        total,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  async getDispute(id: number) {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id },
      include: {
        buyer: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
          },
        },
        seller: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
          },
        },
        order: {
          select: {
            id: true,
            order_number: true,
            total_amount: true,
            items: {
              include: {
                product: true,
              },
            },
          },
        },
        assigned_admin: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                username: true,
              },
            },
          },
          orderBy: { created_at: 'asc' },
        },
      },
    });
    
    if (!dispute) {
      throw new NotFoundException(`Dispute with ID ${id} not found`);
    }
    
    return dispute;
  }

  async updateDisputeStatus(id: number, status: string, resolution?: string) {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id },
    });
    
    if (!dispute) {
      throw new NotFoundException(`Dispute with ID ${id} not found`);
    }
    
    const updateData: any = {
      status: status.toUpperCase(),
      updated_at: new Date(),
    };
    
    if (status.toUpperCase() === 'RESOLVED' && resolution) {
      updateData.resolution_details = resolution;
      updateData.resolved_at = new Date();
    }
    
    return this.prisma.dispute.update({
      where: { id },
      data: updateData,
    });
  }

  async assignDispute(id: number, adminId: number) {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id },
    });
    
    if (!dispute) {
      throw new NotFoundException(`Dispute with ID ${id} not found`);
    }
    
    return this.prisma.dispute.update({
      where: { id },
      data: {
        assigned_admin: {
          connect: { id: adminId },
        },
        status: 'INVESTIGATING',
        updated_at: new Date(),
      },
    });
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
          buyer: {
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