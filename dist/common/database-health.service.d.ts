import { PrismaService } from '../prisma/prisma.service';
export declare class DatabaseHealthService {
    private prisma;
    constructor(prisma: PrismaService);
    checkConnection(): Promise<boolean>;
    getDatabaseStats(): Promise<{
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
    }>;
    checkDataIntegrity(): Promise<{
        healthy: boolean;
        issues: string[];
        checkedAt: Date;
    }>;
    cleanupOrphanedData(): Promise<{
        cartItemsRemoved: number;
        orderItemsRemoved: number;
        wishlistItemsRemoved: number;
    }>;
    optimizeDatabase(): Promise<{
        message: string;
    }>;
    getSlowQueries(): Promise<{
        message: string;
    }>;
}
