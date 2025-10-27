import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ValidationService } from '../common/validation.service';
import { UpdateUserDto, UpdatePasswordDto } from '../types';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private validationService: ValidationService,
  ) {}

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        email_verified_at: true,
        phone_verified_at: true,
        created_at: true,
        updated_at: true,
        user_roles: {
          include: {
            role: true
          }
        }
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
        email_verified_at: true,
        user_roles: {
          include: {
            role: true
          }
        },
        phone_verified_at: true,
        identity_verified_at: true,
        created_at: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // Validate input data
    if (updateUserDto.name) {
      this.validationService.validateName(updateUserDto.name);
    }

    if (updateUserDto.phone) {
      this.validationService.validatePhone(updateUserDto.phone);
    }

    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // Sanitize data
    const sanitizedData: any = {};
    if (updateUserDto.name) {
      sanitizedData.name = this.validationService.sanitizeString(updateUserDto.name, 255);
    }
    if (updateUserDto.phone) {
      sanitizedData.phone = this.validationService.sanitizeString(updateUserDto.phone, 20);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: sanitizedData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        email_verified_at: true,
        phone_verified_at: true,
        created_at: true,
        updated_at: true,
        user_roles: {
          include: {
            role: true
          }
        }
      },
    });

    return user;
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    // Validate new password
    this.validationService.validatePassword(updatePasswordDto.newPassword);

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verify current password
    const bcrypt = require('bcrypt');
    const isCurrentPasswordValid = await bcrypt.compare(
      updatePasswordDto.currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    // Check if new password is different from current
    const isSamePassword = await bcrypt.compare(
      updatePasswordDto.newPassword,
      user.password,
    );

    if (isSamePassword) {
      throw new BadRequestException('New password must be different from current password');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 12);

    await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return { message: 'Password updated successfully' };
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        email_verified_at: true,
        phone_verified_at: true,
        created_at: true,
        updated_at: true,
        user_roles: {
          include: {
            role: true
          }
        }
      },
    });
  }

  async findAllPublic(page: number = 1, perPage: number = 20, search?: string, role?: string) {
    const where: any = {
      is_active: true, // Only show active users
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
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

    const skip = (page - 1) * perPage;
    const take = perPage;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take,
        orderBy: { created_at: 'desc' },
        select: {
          id: true,
          username: true,
          name: true,
          avatar: true,
          created_at: true,
          user_roles: {
            include: {
              role: true
            }
          }
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users,
      meta: {
        current_page: page,
        last_page: Math.ceil(total / perPage),
        per_page: perPage,
        total,
        from: skip + 1,
        to: Math.min(skip + perPage, total),
      },
    };
  }
}
