export declare class QueryAuditLogsDto {
    user_id?: number;
    action?: string;
    entity_type?: string;
    entity_id?: number;
    start_date?: string;
    end_date?: string;
    page?: number;
    limit?: number;
}
