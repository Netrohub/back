import { PrismaService } from '../prisma/prisma.service';
export declare class DisputesService {
    private prisma;
    constructor(prisma: PrismaService);
    getDisputes(userId: number): Promise<({
        order: {
            items: ({
                product: {
                    category: string;
                    id: number;
                    name: string;
                    created_at: Date;
                    updated_at: Date;
                    description: string | null;
                    status: string;
                    price: import("@prisma/client/runtime/library").Decimal;
                    images: import("@prisma/client/runtime/library").JsonValue | null;
                    seller_id: number | null;
                };
            } & {
                id: number;
                created_at: Date;
                product_id: number;
                quantity: number;
                price: import("@prisma/client/runtime/library").Decimal;
                order_id: number;
            })[];
        } & {
            id: number;
            created_at: Date;
            updated_at: Date;
            user_id: number;
            status: string;
            total_amount: import("@prisma/client/runtime/library").Decimal;
            payment_status: string;
            shipping_address: import("@prisma/client/runtime/library").JsonValue | null;
            payment_method: string | null;
        };
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        description: string | null;
        user_id: number;
        status: string;
        seller_id: number | null;
        order_id: number;
        reason: string;
        resolution: string | null;
        resolved_by: number | null;
        resolved_at: Date | null;
        assigned_to: number | null;
        priority: string;
    })[]>;
    getDisputeById(id: number, userId: number): Promise<{
        order: {
            items: ({
                product: {
                    category: string;
                    id: number;
                    name: string;
                    created_at: Date;
                    updated_at: Date;
                    description: string | null;
                    status: string;
                    price: import("@prisma/client/runtime/library").Decimal;
                    images: import("@prisma/client/runtime/library").JsonValue | null;
                    seller_id: number | null;
                };
            } & {
                id: number;
                created_at: Date;
                product_id: number;
                quantity: number;
                price: import("@prisma/client/runtime/library").Decimal;
                order_id: number;
            })[];
        } & {
            id: number;
            created_at: Date;
            updated_at: Date;
            user_id: number;
            status: string;
            total_amount: import("@prisma/client/runtime/library").Decimal;
            payment_status: string;
            shipping_address: import("@prisma/client/runtime/library").JsonValue | null;
            payment_method: string | null;
        };
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        description: string | null;
        user_id: number;
        status: string;
        seller_id: number | null;
        order_id: number;
        reason: string;
        resolution: string | null;
        resolved_by: number | null;
        resolved_at: Date | null;
        assigned_to: number | null;
        priority: string;
    }>;
    createDispute(userId: number, orderId: number, reason: string, description: string): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        description: string | null;
        user_id: number;
        status: string;
        seller_id: number | null;
        order_id: number;
        reason: string;
        resolution: string | null;
        resolved_by: number | null;
        resolved_at: Date | null;
        assigned_to: number | null;
        priority: string;
    }>;
    updateDisputeStatus(id: number, status: string, adminId: number): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        description: string | null;
        user_id: number;
        status: string;
        seller_id: number | null;
        order_id: number;
        reason: string;
        resolution: string | null;
        resolved_by: number | null;
        resolved_at: Date | null;
        assigned_to: number | null;
        priority: string;
    }>;
    getAdminDisputes(): Promise<({
        user: {
            id: number;
            email: string;
            name: string;
        };
        order: {
            items: ({
                product: {
                    category: string;
                    id: number;
                    name: string;
                    created_at: Date;
                    updated_at: Date;
                    description: string | null;
                    status: string;
                    price: import("@prisma/client/runtime/library").Decimal;
                    images: import("@prisma/client/runtime/library").JsonValue | null;
                    seller_id: number | null;
                };
            } & {
                id: number;
                created_at: Date;
                product_id: number;
                quantity: number;
                price: import("@prisma/client/runtime/library").Decimal;
                order_id: number;
            })[];
        } & {
            id: number;
            created_at: Date;
            updated_at: Date;
            user_id: number;
            status: string;
            total_amount: import("@prisma/client/runtime/library").Decimal;
            payment_status: string;
            shipping_address: import("@prisma/client/runtime/library").JsonValue | null;
            payment_method: string | null;
        };
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        description: string | null;
        user_id: number;
        status: string;
        seller_id: number | null;
        order_id: number;
        reason: string;
        resolution: string | null;
        resolved_by: number | null;
        resolved_at: Date | null;
        assigned_to: number | null;
        priority: string;
    })[]>;
}
