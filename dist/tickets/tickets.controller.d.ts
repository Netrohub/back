import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    create(createTicketDto: CreateTicketDto, req: any): Promise<{
        user: {
            id: number;
            email: string;
            name: string;
        };
    } & {
        category: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        user_id: number;
        status: string;
        message: string;
        resolved_at: Date | null;
        assigned_to: number | null;
        priority: string;
        subject: string;
    }>;
    findAll(userId?: number, status?: string, priority?: string, assignedTo?: number): Promise<({
        user: {
            id: number;
            email: string;
            name: string;
        };
        assigned_admin: {
            id: number;
            email: string;
            name: string;
        };
    } & {
        category: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        user_id: number;
        status: string;
        message: string;
        resolved_at: Date | null;
        assigned_to: number | null;
        priority: string;
        subject: string;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            id: number;
            email: string;
            name: string;
        };
        assigned_admin: {
            id: number;
            email: string;
            name: string;
        };
    } & {
        category: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        user_id: number;
        status: string;
        message: string;
        resolved_at: Date | null;
        assigned_to: number | null;
        priority: string;
        subject: string;
    }>;
    update(id: string, updateTicketDto: UpdateTicketDto): Promise<{
        user: {
            id: number;
            email: string;
            name: string;
        };
        assigned_admin: {
            id: number;
            email: string;
            name: string;
        };
    } & {
        category: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        user_id: number;
        status: string;
        message: string;
        resolved_at: Date | null;
        assigned_to: number | null;
        priority: string;
        subject: string;
    }>;
    remove(id: string): Promise<{
        category: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        user_id: number;
        status: string;
        message: string;
        resolved_at: Date | null;
        assigned_to: number | null;
        priority: string;
        subject: string;
    }>;
}
