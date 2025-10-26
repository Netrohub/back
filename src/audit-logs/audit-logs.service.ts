import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryAuditLogsDto } from './dto/query-audit-logs.dto';

@Injectable()
export class AuditLogsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: QueryAuditLogsDto) {
    const where: any = {};

    if (query.user_id) {
      where.user_id = query.user_id;
    }

    if (query.action) {
      where.action = query.action;
    }

    if (query.entity_type) {
      where.entity_type = query.entity_type;
    }

    if (query.entity_id) {
      where.entity_id = query.entity_id;
    }

    if (query.start_date || query.end_date) {
      where.created_at = {};
      if (query.start_date) {
        where.created_at.gte = new Date(query.start_date);
      }
      if (query.end_date) {
        where.created_at.lte = new Date(query.end_date);
      }
    }

    const page = query.page || 1;
    const limit = query.limit || 50;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const auditLog = await this.prisma.auditLog.findUnique({
      where: { id: parseInt(id) },
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

    if (!auditLog) {
      throw new NotFoundException('Audit log not found');
    }

    return auditLog;
  }

  async export(query: QueryAuditLogsDto) {
    const where: any = {};

    if (query.user_id) {
      where.user_id = query.user_id;
    }

    if (query.action) {
      where.action = query.action;
    }

    if (query.entity_type) {
      where.entity_type = query.entity_type;
    }

    if (query.entity_id) {
      where.entity_id = query.entity_id;
    }

    if (query.start_date || query.end_date) {
      where.created_at = {};
      if (query.start_date) {
        where.created_at.gte = new Date(query.start_date);
      }
      if (query.end_date) {
        where.created_at.lte = new Date(query.end_date);
      }
    }

    return this.prisma.auditLog.findMany({
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
      },
    });
  }
}
