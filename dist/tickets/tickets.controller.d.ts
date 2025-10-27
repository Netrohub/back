import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    create(createTicketDto: CreateTicketDto, req: any): Promise<{
        id: number;
        user_id: number;
        status: import(".prisma/client").$Enums.TicketStatus;
        created_at: Date;
        updated_at: Date;
        category: string | null;
        subject: string;
        message: string;
        priority: import(".prisma/client").$Enums.TicketPriority;
        assigned_to: number | null;
        resolved_at: Date | null;
        ticket_number: string;
        first_response_at: Date | null;
    }>;
    findAll(userId?: number, status?: string, priority?: string, assignedTo?: number): Promise<({
        user: {
            id: number;
            name: string;
            email: string;
        };
        assigned_admin: {
            id: number;
            name: string;
            email: string;
        };
    } & {
        id: number;
        user_id: number;
        status: import(".prisma/client").$Enums.TicketStatus;
        created_at: Date;
        updated_at: Date;
        category: string | null;
        subject: string;
        message: string;
        priority: import(".prisma/client").$Enums.TicketPriority;
        assigned_to: number | null;
        resolved_at: Date | null;
        ticket_number: string;
        first_response_at: Date | null;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
        };
        assigned_admin: {
            id: number;
            name: string;
            email: string;
        };
    } & {
        id: number;
        user_id: number;
        status: import(".prisma/client").$Enums.TicketStatus;
        created_at: Date;
        updated_at: Date;
        category: string | null;
        subject: string;
        message: string;
        priority: import(".prisma/client").$Enums.TicketPriority;
        assigned_to: number | null;
        resolved_at: Date | null;
        ticket_number: string;
        first_response_at: Date | null;
    }>;
    update(id: string, updateTicketDto: UpdateTicketDto): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
        };
        assigned_admin: {
            id: number;
            name: string;
            email: string;
        };
    } & {
        id: number;
        user_id: number;
        status: import(".prisma/client").$Enums.TicketStatus;
        created_at: Date;
        updated_at: Date;
        category: string | null;
        subject: string;
        message: string;
        priority: import(".prisma/client").$Enums.TicketPriority;
        assigned_to: number | null;
        resolved_at: Date | null;
        ticket_number: string;
        first_response_at: Date | null;
    }>;
    remove(id: string): Promise<{
        id: number;
        user_id: number;
        status: import(".prisma/client").$Enums.TicketStatus;
        created_at: Date;
        updated_at: Date;
        category: string | null;
        subject: string;
        message: string;
        priority: import(".prisma/client").$Enums.TicketPriority;
        assigned_to: number | null;
        resolved_at: Date | null;
        ticket_number: string;
        first_response_at: Date | null;
    }>;
}
