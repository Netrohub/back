import { DatabaseHealthService } from '../common/database-health.service';
export declare class HealthController {
    private databaseHealthService;
    constructor(databaseHealthService: DatabaseHealthService);
    check(): {
        status: string;
        timestamp: string;
        service: string;
        version: string;
    };
    checkDatabase(): Promise<{
        connection: boolean;
        stats: {
            users: {
                total: number;
                active: number;
                inactive: number;
            };
            products: {
                total: number;
            };
            orders: {
                total: number;
                pending: number;
            };
            disputes: {
                total: number;
                resolved: number;
            };
        };
        integrity: {
            healthy: boolean;
            issues: string[];
            checkedAt: Date;
        };
        timestamp: string;
    }>;
    adminHealthCheck(): Promise<{
        connection: boolean;
        stats: {
            users: {
                total: number;
                active: number;
                inactive: number;
            };
            products: {
                total: number;
            };
            orders: {
                total: number;
                pending: number;
            };
            disputes: {
                total: number;
                resolved: number;
            };
        };
        integrity: {
            healthy: boolean;
            issues: string[];
            checkedAt: Date;
        };
        optimization: {
            message: string;
        };
        timestamp: string;
    }>;
    cleanupOrphanedData(): Promise<{
        results: {
            cartItemsRemoved: number;
            orderItemsRemoved: number;
            wishlistItemsRemoved: number;
        };
        message: string;
        timestamp: string;
    }>;
}
