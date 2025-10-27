import { AuditLogsService } from './audit-logs.service';
import { QueryAuditLogsDto } from './dto/query-audit-logs.dto';
export declare class AuditLogsController {
    private readonly auditLogsService;
    constructor(auditLogsService: AuditLogsService);
    findAll(query: QueryAuditLogsDto): Promise<{
        data: ({
            user: {
                id: number;
                name: string;
                email: string;
            };
        } & {
            id: number;
            user_id: number | null;
            action: string;
            entity_type: string;
            entity_id: number;
            old_values: import("@prisma/client/runtime/library").JsonValue | null;
            new_values: import("@prisma/client/runtime/library").JsonValue | null;
            ip_address: string | null;
            user_agent: string | null;
            created_at: Date;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            total_pages: number;
        };
    }>;
    export(query: QueryAuditLogsDto): Promise<({
        user: {
            id: number;
            name: string;
            email: string;
        };
    } & {
        id: number;
        user_id: number | null;
        action: string;
        entity_type: string;
        entity_id: number;
        old_values: import("@prisma/client/runtime/library").JsonValue | null;
        new_values: import("@prisma/client/runtime/library").JsonValue | null;
        ip_address: string | null;
        user_agent: string | null;
        created_at: Date;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
        };
    } & {
        id: number;
        user_id: number | null;
        action: string;
        entity_type: string;
        entity_id: number;
        old_values: import("@prisma/client/runtime/library").JsonValue | null;
        new_values: import("@prisma/client/runtime/library").JsonValue | null;
        ip_address: string | null;
        user_agent: string | null;
        created_at: Date;
    }>;
}
