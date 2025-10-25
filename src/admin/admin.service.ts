import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminDto, AssignRoleDto, AdminStatsDto } from '../types';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // Create admin account
  async createAdmin(createAdminDto: CreateAdminDto, createdBy: number) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createAdminDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 12);

    // Create admin user
    const admin = await this.prisma.user.create({
      data: {
        name: createAdminDto.name,
        email: createAdminDto.email,
        password: hashedPassword,
        phone: createAdminDto.phone,
        roles: JSON.stringify([createAdminDto.role]),
        is_active: true,
        kyc_verified: true, // Admins are auto-verified
        kyc_completed_at: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        roles: true,
        is_active: true,
        created_at: true,
      },
    });

    // Log admin creation
    await this.logAdminAction(createdBy, 'CREATE_ADMIN', 'User', admin.id, {
      admin_email: admin.email,
      role: createAdminDto.role,
    });

    return admin;
  }

  // Assign role to existing user
  async assignRole(userId: number, assignRoleDto: AssignRoleDto, assignedBy: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const currentRoles = typeof user.roles === 'string' ? JSON.parse(user.roles) : user.roles;
    
    // Check if user already has this role
    if (currentRoles.includes(assignRoleDto.role)) {
      throw new BadRequestException('User already has this role');
    }

    // Add new role
    const updatedRoles = [...currentRoles, assignRoleDto.role];

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        roles: JSON.stringify(updatedRoles),
        kyc_verified: assignRoleDto.role === 'admin' ? true : user.kyc_verified,
        kyc_completed_at: assignRoleDto.role === 'admin' ? new Date() : user.kyc_completed_at,
      },
      select: {
        id: true,
        name: true,
        email: true,
        roles: true,
        is_active: true,
        updated_at: true,
      },
    });

    // Log role assignment
    await this.logAdminAction(assignedBy, 'ASSIGN_ROLE', 'User', userId, {
      new_role: assignRoleDto.role,
      user_email: user.email,
    });

    return updatedUser;
  }

  // Remove role from user
  async removeRole(userId: number, role: string, removedBy: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const currentRoles = typeof user.roles === 'string' ? JSON.parse(user.roles) : user.roles;
    
    // Check if user has this role
    if (!currentRoles.includes(role)) {
      throw new BadRequestException('User does not have this role');
    }

    // Remove role
    const updatedRoles = currentRoles.filter(r => r !== role);

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        roles: JSON.stringify(updatedRoles),
      },
      select: {
        id: true,
        name: true,
        email: true,
        roles: true,
        is_active: true,
        updated_at: true,
      },
    });

    // Log role removal
    await this.logAdminAction(removedBy, 'REMOVE_ROLE', 'User', userId, {
      removed_role: role,
      user_email: user.email,
    });

    return updatedUser;
  }

  // Get all users with pagination and filtering
  async getUsers(page: number = 1, limit: number = 10, search?: string, role?: string) {
    const skip = (page - 1) * limit;
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
      ];
    }

    if (role) {
      where.roles = { contains: role };
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          roles: true,
          is_active: true,
          kyc_verified: true,
          last_login_at: true,
          created_at: true,
          updated_at: true,
        },
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Get admin statistics
  async getAdminStats(): Promise<AdminStatsDto> {
    const [
      totalUsers,
      activeUsers,
      totalAdmins,
      totalSellers,
      totalProducts,
      totalOrders,
      totalDisputes,
      pendingDisputes,
      recentUsers,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { is_active: true } }),
      this.prisma.user.count({ where: { roles: { contains: 'admin' } } }),
      this.prisma.user.count({ where: { roles: { contains: 'seller' } } }),
      this.prisma.product.count(),
      this.prisma.order.count(),
      this.prisma.dispute.count(),
      this.prisma.dispute.count({ where: { status: 'pending' } }),
      this.prisma.user.count({
        where: {
          created_at: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
          },
        },
      }),
    ]);

    return {
      totalUsers,
      activeUsers,
      totalAdmins,
      totalSellers,
      totalProducts,
      totalOrders,
      totalDisputes,
      pendingDisputes,
      recentUsers,
    };
  }

  // Get admin actions log
  async getAdminActions(page: number = 1, limit: number = 10, adminId?: number) {
    const skip = (page - 1) * limit;
    
    const where = adminId ? { admin_id: adminId } : {};

    const [actions, total] = await Promise.all([
      this.prisma.adminAction.findMany({
        where,
        skip,
        take: limit,
        include: {
          admin: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.adminAction.count({ where }),
    ]);

    return {
      actions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Toggle user active status
  async toggleUserStatus(userId: number, isActive: boolean, toggledBy: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { is_active: isActive },
      select: {
        id: true,
        name: true,
        email: true,
        is_active: true,
        updated_at: true,
      },
    });

    // Log status change
    await this.logAdminAction(toggledBy, 'TOGGLE_USER_STATUS', 'User', userId, {
      new_status: isActive,
      user_email: user.email,
    });

    return updatedUser;
  }

  // Create admin invite
  async createAdminInvite(email: string, role: string, invitedBy: number) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const invite = await this.prisma.adminInvite.create({
      data: {
        email,
        invited_by: invitedBy,
        role,
        token,
        expires_at: expiresAt,
      },
    });

    // Log invite creation
    await this.logAdminAction(invitedBy, 'CREATE_ADMIN_INVITE', 'AdminInvite', invite.id, {
      invited_email: email,
      role,
    });

    return {
      token,
      expiresAt,
      email,
    };
  }

  // Accept admin invite
  async acceptAdminInvite(token: string, password: string, name: string) {
    const invite = await this.prisma.adminInvite.findUnique({
      where: { token },
    });

    if (!invite) {
      throw new NotFoundException('Invalid invite token');
    }

    if (invite.used_at) {
      throw new BadRequestException('Invite has already been used');
    }

    if (invite.expires_at < new Date()) {
      throw new BadRequestException('Invite has expired');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin user
    const admin = await this.prisma.user.create({
      data: {
        name,
        email: invite.email,
        password: hashedPassword,
        roles: JSON.stringify([invite.role]),
        is_active: true,
        kyc_verified: true,
        kyc_completed_at: new Date(),
      },
    });

    // Mark invite as used
    await this.prisma.adminInvite.update({
      where: { id: invite.id },
      data: { used_at: new Date() },
    });

    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: invite.role,
    };
  }

  // Helper method to log admin actions
  private async logAdminAction(
    adminId: number,
    actionType: string,
    targetType: string,
    targetId: number,
    metadata?: any,
  ) {
    await this.prisma.adminAction.create({
      data: {
        admin_id: adminId,
        action_type: actionType,
        target_type: targetType,
        target_id: targetId,
        metadata,
      },
    });
  }
}
