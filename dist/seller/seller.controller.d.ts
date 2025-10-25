import { SellerService } from './seller.service';
export declare class SellerController {
    private sellerService;
    constructor(sellerService: SellerService);
    getSellerDashboard(user: any): Promise<{
        stats: {
            totalProducts: number;
            totalOrders: number;
            totalRevenue: number | import("@prisma/client/runtime/library").Decimal;
        };
        recentOrders: ({
            user: {
                email: string;
                name: string;
            };
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
        })[];
    }>;
    getSellerProducts(user: any): Promise<({
        seller: {
            id: number;
            email: string;
            name: string;
        };
        _count: {
            cart_items: number;
            wishlist_items: number;
        };
    } & {
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
    })[]>;
    getSellerOrders(user: any): Promise<({
        user: {
            email: string;
            name: string;
        };
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
    })[]>;
    getSellerPayouts(user: any): Promise<{
        id: number;
        amount: number;
        status: string;
        created_at: Date;
        description: string;
    }[]>;
    getSellerNotifications(user: any): Promise<{
        id: number;
        type: string;
        message: string;
        read: boolean;
        created_at: Date;
    }[]>;
}
