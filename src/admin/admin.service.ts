import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { createPaginatedResponse } from '../common/utils/response.util';

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

    // ✅ Standardize pagination response format
    return createPaginatedResponse(users, validPage, validPerPage, total);
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

  async createUser(createUserDto: any) {
    const { name, email, username, password, phone, role = 'user', is_active = true } = createUserDto;

    // Validate required fields
    if (!name || !email || !username || !password) {
      throw new BadRequestException('Name, email, username, and password are required');
    }

    // Check if email already exists
    const existingUserByEmail = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      throw new ConflictException('Email is already in use');
    }

    // Check if username already exists
    const existingUserByUsername = await this.prisma.user.findUnique({
      where: { username },
    });

    if (existingUserByUsername) {
      throw new ConflictException('Username is already in use');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Get role ID
    const roleRecord = await this.prisma.role.findUnique({
      where: { slug: role },
    });

    if (!roleRecord) {
      throw new BadRequestException(`Role '${role}' does not exist`);
    }

    // Create user with role
    const user = await this.prisma.user.create({
      data: {
        username,
        name,
        email,
        password: hashedPassword,
        phone: phone || null,
        is_active,
        user_roles: {
          create: {
            role_id: roleRecord.id,
            granted_at: new Date(),
          },
        },
      },
      include: {
        user_roles: {
          include: {
            role: true,
          },
        },
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateUser(id: number, updateData: any) {
    // If password is being updated, hash it
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 12);
    }

    // If role is being updated, update user_roles relation
    if (updateData.role) {
      const roleRecord = await this.prisma.role.findUnique({
        where: { slug: updateData.role },
      });

      if (!roleRecord) {
        throw new BadRequestException(`Role '${updateData.role}' does not exist`);
      }

      // Remove old roles and add new one
      await this.prisma.userRole.deleteMany({
        where: { user_id: id },
      });

      await this.prisma.userRole.create({
        data: {
          user_id: id,
          role_id: roleRecord.id,
          granted_at: new Date(),
        },
      });

      // Remove role from updateData as it's handled separately
      delete updateData.role;
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        user_roles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async deleteUser(id: number) {
    // Soft delete: set is_active to false instead of hard delete
    return this.prisma.user.update({
      where: { id },
      data: {
        is_active: false,
      },
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

    // ✅ Standardize pagination response format
    return createPaginatedResponse(orders, validPage, validPerPage, total);
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

    // ✅ Standardize pagination response format
    return createPaginatedResponse(vendors, validPage, validPerPage, total);
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

    // ✅ Standardize pagination response format
    return createPaginatedResponse(listings, validPage, validPerPage, total);
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
    
    // ✅ Standardize pagination response format
    return createPaginatedResponse(payouts, validPage, validPerPage, total);
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
    
    // ✅ Standardize pagination response format
    return createPaginatedResponse(products, page, limit, total);
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
      // Map common status values to Prisma enum values
      const statusMap: { [key: string]: string } = {
        'open': 'PENDING',
        'pending': 'PENDING',
        'investigating': 'INVESTIGATING',
        'resolved': 'RESOLVED',
        'closed': 'CLOSED',
        'escalated': 'ESCALATED',
      };
      
      const normalizedStatus = status.toLowerCase();
      const mappedStatus = statusMap[normalizedStatus] || status.toUpperCase();
      
      // Only add to where clause if it's a valid enum value
      const validStatuses = ['PENDING', 'INVESTIGATING', 'RESOLVED', 'CLOSED', 'ESCALATED'];
      if (validStatuses.includes(mappedStatus)) {
        where.status = mappedStatus;
      }
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
    
    // ✅ Standardize pagination response format
    return createPaginatedResponse(disputes, page, limit, total);
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
        assigned_to: adminId,
        status: 'INVESTIGATING',
        updated_at: new Date(),
      },
    });
  }

  // Tickets Management
  async getTickets(page: number = 1, limit: number = 25, status?: string, priority?: string, search?: string) {
    const pageNum = Number(page) || 1;
    const limitNum = Math.min(Math.max(1, Number(limit) || 25), 100);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (status) {
      where.status = status.toUpperCase();
    }

    if (priority) {
      where.priority = priority.toUpperCase();
    }

    if (search) {
      where.OR = [
        { ticket_number: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } },
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const [tickets, total] = await Promise.all([
      this.prisma.ticket.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          assigned_admin: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.ticket.count({ where }),
    ]);

    // ✅ Standardize pagination response format
    return createPaginatedResponse(tickets, pageNum, limitNum, total);
  }

  async getTicket(id: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        assigned_admin: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        messages: {
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
        },
      },
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    return ticket;
  }

  async createTicket(createTicketDto: any) {
    const { user_id, subject, message, priority = 'MEDIUM', category } = createTicketDto;

    // Generate unique ticket number
    const ticketNumber = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const ticket = await this.prisma.ticket.create({
      data: {
        ticket_number: ticketNumber,
        user_id,
        subject,
        message,
        priority: priority.toUpperCase(),
        category: category || null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return ticket;
  }

  async updateTicket(id: number, updateData: any) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    // Handle status updates
    if (updateData.status) {
      updateData.status = updateData.status.toUpperCase();
      if (updateData.status === 'RESOLVED' && !ticket.resolved_at) {
        updateData.resolved_at = new Date();
      }
    }

    // Handle priority updates
    if (updateData.priority) {
      updateData.priority = updateData.priority.toUpperCase();
    }

    return this.prisma.ticket.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        assigned_admin: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async deleteTicket(id: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    return this.prisma.ticket.delete({
      where: { id },
    });
  }

  // Audit Logs Management
  async getAuditLogs(page: number = 1, limit: number = 50, search?: string, action?: string, entityType?: string) {
    const pageNum = Number(page) || 1;
    const limitNum = Math.min(Math.max(1, Number(limit) || 50), 100);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (action) {
      where.action = { contains: action, mode: 'insensitive' };
    }

    if (entityType) {
      where.entity_type = entityType;
    }

    if (search) {
      where.OR = [
        { action: { contains: search, mode: 'insensitive' } },
        { entity_type: { contains: search, mode: 'insensitive' } },
        { ip_address: { contains: search, mode: 'insensitive' } },
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const [logs, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    // ✅ Standardize pagination response format
    return createPaginatedResponse(logs, pageNum, limitNum, total);
  }

  async exportAuditLogs(startDate?: string, endDate?: string) {
    const where: any = {};

    if (startDate || endDate) {
      where.created_at = {};
      if (startDate) where.created_at.gte = new Date(startDate);
      if (endDate) where.created_at.lte = new Date(endDate);
    }

    return this.prisma.auditLog.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
      take: 10000, // Limit export to 10k records
    });
  }

  // Coupons Management
  async getCoupons(page: number = 1, limit: number = 25, search?: string, status?: string) {
    const pageNum = Number(page) || 1;
    const limitNum = Math.min(Math.max(1, Number(limit) || 25), 100);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (search) {
      where.OR = [
        { code: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status !== undefined) {
      where.is_active = status === 'active' || status === 'true';
    }

    const [coupons, total] = await Promise.all([
      this.prisma.coupon.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.coupon.count({ where }),
    ]);

    // ✅ Standardize pagination response format
    return createPaginatedResponse(coupons, pageNum, limitNum, total);
  }

  async getCoupon(id: number) {
    const coupon = await this.prisma.coupon.findUnique({
      where: { id },
    });

    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }

    return coupon;
  }

  async createCoupon(createCouponDto: any) {
    const {
      code,
      name,
      description,
      type,
      value,
      min_amount,
      max_discount,
      usage_limit,
      user_limit,
      is_active = true,
      starts_at,
      expires_at,
    } = createCouponDto;

    // Check if coupon code already exists
    const existingCoupon = await this.prisma.coupon.findUnique({
      where: { code },
    });

    if (existingCoupon) {
      throw new ConflictException('Coupon code already exists');
    }

    const coupon = await this.prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        name,
        description: description || null,
        type: type.toUpperCase(),
        value,
        min_amount: min_amount || null,
        max_discount: max_discount || null,
        usage_limit: usage_limit || null,
        user_limit: user_limit || null,
        is_active,
        starts_at: starts_at ? new Date(starts_at) : null,
        expires_at: expires_at ? new Date(expires_at) : null,
      },
    });

    return coupon;
  }

  async updateCoupon(id: number, updateData: any) {
    const coupon = await this.prisma.coupon.findUnique({
      where: { id },
    });

    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }

    // If code is being updated, check for conflicts
    if (updateData.code && updateData.code !== coupon.code) {
      const existingCoupon = await this.prisma.coupon.findUnique({
        where: { code: updateData.code },
      });

      if (existingCoupon) {
        throw new ConflictException('Coupon code already exists');
      }
      updateData.code = updateData.code.toUpperCase();
    }

    // Convert type to uppercase if provided
    if (updateData.type) {
      updateData.type = updateData.type.toUpperCase();
    }

    // Convert date strings to Date objects
    if (updateData.starts_at && typeof updateData.starts_at === 'string') {
      updateData.starts_at = new Date(updateData.starts_at);
    }
    if (updateData.expires_at && typeof updateData.expires_at === 'string') {
      updateData.expires_at = new Date(updateData.expires_at);
    }

    return this.prisma.coupon.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteCoupon(id: number) {
    const coupon = await this.prisma.coupon.findUnique({
      where: { id },
    });

    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }

    return this.prisma.coupon.delete({
      where: { id },
    });
  }

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