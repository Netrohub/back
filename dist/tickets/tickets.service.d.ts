import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
export declare class TicketsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTicketDto: CreateTicketDto, userId: number): Promise<{
        user: {
            name: string;
            id: number;
            email: string;
        };
    } & {
        subject: string;
        priority: import(".prisma/client").$Enums.TicketPriority;
        id: number;
        user_id: number;
        status: import(".prisma/client").$Enums.TicketStatus;
        created_at: Date;
        updated_at: Date;
        category: string | null;
        message: string;
        assigned_to: number | null;
        resolved_at: Date | null;
        ticket_number: string;
        first_response_at: Date | null;
    }>;
    findAll(filters?: {
        user_id?: number;
        status?: string;
        priority?: string;
        assigned_to?: number;
    }): Promise<({
        user: {
            name: string;
            id: number;
            email: string;
        };
        assigned_admin: {
            name: string;
            id: number;
            email: string;
        };
    } & {
        subject: string;
        priority: import(".prisma/client").$Enums.TicketPriority;
        id: number;
        user_id: number;
        status: import(".prisma/client").$Enums.TicketStatus;
        created_at: Date;
        updated_at: Date;
        category: string | null;
        message: string;
        assigned_to: number | null;
        resolved_at: Date | null;
        ticket_number: string;
        first_response_at: Date | null;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            name: string;
            id: number;
            email: string;
        };
        assigned_admin: {
            name: string;
            id: number;
            email: string;
        };
    } & {
        subject: string;
        priority: import(".prisma/client").$Enums.TicketPriority;
        id: number;
        user_id: number;
        status: import(".prisma/client").$Enums.TicketStatus;
        created_at: Date;
        updated_at: Date;
        category: string | null;
        message: string;
        assigned_to: number | null;
        resolved_at: Date | null;
        ticket_number: string;
        first_response_at: Date | null;
    }>;
    update(id: string, updateTicketDto: UpdateTicketDto): Promise<{
        user: {
            name: string;
            id: number;
            email: string;
        };
        assigned_admin: {
            name: string;
            id: number;
            email: string;
        };
    } & {
        subject: string;
        priority: import(".prisma/client").$Enums.TicketPriority;
        id: number;
        user_id: number;
        status: import(".prisma/client").$Enums.TicketStatus;
        created_at: Date;
        updated_at: Date;
        category: string | null;
        message: string;
        assigned_to: number | null;
        resolved_at: Date | null;
        ticket_number: string;
        first_response_at: Date | null;
    }>;
    remove(id: string): Promise<{
        subject: string;
        priority: import(".prisma/client").$Enums.TicketPriority;
        id: number;
        user_id: number;
        status: import(".prisma/client").$Enums.TicketStatus;
        created_at: Date;
        updated_at: Date;
        category: string | null;
        message: string;
        assigned_to: number | null;
        resolved_at: Date | null;
        ticket_number: string;
        first_response_at: Date | null;
    }>;
}
