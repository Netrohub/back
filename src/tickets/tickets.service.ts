import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto, userId: number) {
    // Validate user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Create ticket
    return this.prisma.ticket.create({
      data: {
        user: { connect: { id: userId } },
        subject: createTicketDto.subject,
        message: createTicketDto.message,
        priority: (createTicketDto.priority || 'MEDIUM').toUpperCase() as any,
        category: createTicketDto.category || 'general',
        status: 'OPEN',
      } as any,
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
  }

  async findAll(filters?: { user_id?: number; status?: string; priority?: string; assigned_to?: number }) {
    const where: any = {};

    if (filters?.user_id) {
      where.user_id = filters.user_id;
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.priority) {
      where.priority = filters.priority;
    }

    if (filters?.assigned_to !== undefined) {
      if (filters.assigned_to === null) {
        where.assigned_to = null;
      } else {
        where.assigned_to = filters.assigned_to;
      }
    }

    return this.prisma.ticket.findMany({
      where,
      orderBy: { created_at: 'desc' },
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

  async findOne(id: string) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id: parseInt(id) },
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

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    return ticket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.findOne(id);

    const updateData: any = {};

    if (updateTicketDto.status) {
      updateData.status = updateTicketDto.status;

      // Set resolved_at if status is resolved
      if (updateTicketDto.status === 'resolved') {
        updateData.resolved_at = new Date();
      }
    }

    if (updateTicketDto.priority) {
      updateData.priority = updateTicketDto.priority;
    }

    if (updateTicketDto.assigned_to !== undefined) {
      if (updateTicketDto.assigned_to === null || updateTicketDto.assigned_to === 0) {
        updateData.assigned_to = null;
      } else {
        // Validate assigned user exists and has admin role
        const assignedUser = await this.prisma.user.findUnique({
          where: { id: updateTicketDto.assigned_to },
          include: {
            user_roles: {
              include: { role: true }
            }
          }
        });

        if (!assignedUser) {
          throw new NotFoundException('Assigned user not found');
        }

        const hasAdminRole = assignedUser.user_roles?.some(ur => ur.role.slug === 'admin');
        if (!hasAdminRole) {
          throw new BadRequestException('Assigned user must be an admin');
        }

        updateData.assigned_to = updateTicketDto.assigned_to;
      }
    }

    return this.prisma.ticket.update({
      where: { id: parseInt(id) },
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

  async remove(id: string) {
    const ticket = await this.findOne(id);

    return this.prisma.ticket.delete({
      where: { id: parseInt(id) },
    });
  }
}
