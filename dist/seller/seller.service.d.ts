import { PrismaService } from '../prisma/prisma.service';
export declare class SellerService {
    private prisma;
    constructor(prisma: PrismaService);
    getSellerDashboard(sellerId: number): Promise<{
        stats: {
            totalProducts: number;
            totalOrders: number;
            totalRevenue: number | import("@prisma/client/runtime/library").Decimal;
        };
        recentOrders: ({
            buyer: {
                name: string;
                email: string;
            };
            items: ({
                product: {
                    description: string | null;
                    id: number;
                    status: import(".prisma/client").$Enums.ProductStatus;
                    created_at: Date;
                    updated_at: Date;
                    name: string;
                    slug: string;
                    price: import("@prisma/client/runtime/library").Decimal;
                    discount_price: import("@prisma/client/runtime/library").Decimal | null;
                    category_id: number;
                    seller_id: number;
                    platform: string | null;
                    game: string | null;
                    account_level: string | null;
                    account_username: string | null;
                    stock_quantity: number;
                    delivery_time: string;
                    setup_instructions: string | null;
                    views_count: number;
                    sales_count: number;
                    rating_avg: import("@prisma/client/runtime/library").Decimal;
                    rating_count: number;
                    is_featured: boolean;
                    featured_until: Date | null;
                    metadata: import("@prisma/client/runtime/library").JsonValue | null;
                    deleted_at: Date | null;
                };
            } & {
                id: number;
                product_id: number;
                quantity: number;
                created_at: Date;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                order_id: number;
                product_name: string;
                unit_price: import("@prisma/client/runtime/library").Decimal;
                total_price: import("@prisma/client/runtime/library").Decimal;
            })[];
        } & {
            id: number;
            status: import(".prisma/client").$Enums.OrderStatus;
            created_at: Date;
            updated_at: Date;
            seller_id: number;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            order_number: string;
            buyer_id: number;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            service_fee: import("@prisma/client/runtime/library").Decimal;
            discount_amount: import("@prisma/client/runtime/library").Decimal;
            total_amount: import("@prisma/client/runtime/library").Decimal;
            payment_status: import(".prisma/client").$Enums.PaymentStatus;
            payment_method: string | null;
            payment_transaction_id: string | null;
            buyer_email: string | null;
            buyer_phone: string | null;
            payment_completed_at: Date | null;
            delivered_at: Date | null;
            completed_at: Date | null;
            cancelled_at: Date | null;
            refunded_at: Date | null;
            notes: string | null;
        })[];
    }>;
    getSellerProducts(sellerId: number): Promise<({
        seller: {
            id: number;
            name: string;
            email: string;
        };
        _count: {
            cart_items: number;
            wishlist_items: number;
        };
    } & {
        description: string | null;
        id: number;
        status: import(".prisma/client").$Enums.ProductStatus;
        created_at: Date;
        updated_at: Date;
        name: string;
        slug: string;
        price: import("@prisma/client/runtime/library").Decimal;
        discount_price: import("@prisma/client/runtime/library").Decimal | null;
        category_id: number;
        seller_id: number;
        platform: string | null;
        game: string | null;
        account_level: string | null;
        account_username: string | null;
        stock_quantity: number;
        delivery_time: string;
        setup_instructions: string | null;
        views_count: number;
        sales_count: number;
        rating_avg: import("@prisma/client/runtime/library").Decimal;
        rating_count: number;
        is_featured: boolean;
        featured_until: Date | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        deleted_at: Date | null;
    })[]>;
    getSellerOrders(sellerId: number): Promise<({
        buyer: {
            name: string;
            email: string;
        };
        items: ({
            product: {
                description: string | null;
                id: number;
                status: import(".prisma/client").$Enums.ProductStatus;
                created_at: Date;
                updated_at: Date;
                name: string;
                slug: string;
                price: import("@prisma/client/runtime/library").Decimal;
                discount_price: import("@prisma/client/runtime/library").Decimal | null;
                category_id: number;
                seller_id: number;
                platform: string | null;
                game: string | null;
                account_level: string | null;
                account_username: string | null;
                stock_quantity: number;
                delivery_time: string;
                setup_instructions: string | null;
                views_count: number;
                sales_count: number;
                rating_avg: import("@prisma/client/runtime/library").Decimal;
                rating_count: number;
                is_featured: boolean;
                featured_until: Date | null;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                deleted_at: Date | null;
            };
        } & {
            id: number;
            product_id: number;
            quantity: number;
            created_at: Date;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            order_id: number;
            product_name: string;
            unit_price: import("@prisma/client/runtime/library").Decimal;
            total_price: import("@prisma/client/runtime/library").Decimal;
        })[];
    } & {
        id: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        created_at: Date;
        updated_at: Date;
        seller_id: number;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        order_number: string;
        buyer_id: number;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        service_fee: import("@prisma/client/runtime/library").Decimal;
        discount_amount: import("@prisma/client/runtime/library").Decimal;
        total_amount: import("@prisma/client/runtime/library").Decimal;
        payment_status: import(".prisma/client").$Enums.PaymentStatus;
        payment_method: string | null;
        payment_transaction_id: string | null;
        buyer_email: string | null;
        buyer_phone: string | null;
        payment_completed_at: Date | null;
        delivered_at: Date | null;
        completed_at: Date | null;
        cancelled_at: Date | null;
        refunded_at: Date | null;
        notes: string | null;
    })[]>;
    getSellerPayouts(sellerId: number): Promise<{
        id: number;
        amount: number;
        status: string;
        created_at: Date;
        description: string;
    }[]>;
    getSellerNotifications(sellerId: number): Promise<{
        id: number;
        type: string;
        message: string;
        read: boolean;
        created_at: Date;
    }[]>;
}
