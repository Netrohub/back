import { PrismaService } from '../prisma/prisma.service';
import { QueryAuditLogsDto } from './dto/query-audit-logs.dto';
export declare class AuditLogsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: QueryAuditLogsDto): Promise<{
        data: ({
            user: {
                id: number;
                email: string;
                name: string;
            };
        } & {
            id: number;
            created_at: Date;
            user_id: number | null;
            action: string;
            entity_type: string;
            entity_id: number;
            old_values: import("@prisma/client/runtime/library").JsonValue | null;
            new_values: import("@prisma/client/runtime/library").JsonValue | null;
            ip_address: string | null;
            user_agent: string | null;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            total_pages: number;
        };
    }>;
    findOne(id: string): Promise<{
        user: {
            id: number;
            email: string;
            name: string;
        };
    } & {
        id: number;
        created_at: Date;
        user_id: number | null;
        action: string;
        entity_type: string;
        entity_id: number;
        old_values: import("@prisma/client/runtime/library").JsonValue | null;
        new_values: import("@prisma/client/runtime/library").JsonValue | null;
        ip_address: string | null;
        user_agent: string | null;
    }>;
    export(query: QueryAuditLogsDto): Promise<({
        user: {
            id: number;
            email: string;
            name: string;
        };
    } & {
        id: number;
        created_at: Date;
        user_id: number | null;
        action: string;
        entity_type: string;
        entity_id: number;
        old_values: import("@prisma/client/runtime/library").JsonValue | null;
        new_values: import("@prisma/client/runtime/library").JsonValue | null;
        ip_address: string | null;
        user_agent: string | null;
    })[]>;
}
