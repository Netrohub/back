import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getUsers(page?: number, perPage?: number, search?: string, role?: string, status?: string): Promise<{
        data: {
            name: string;
            id: number;
            created_at: Date;
            username: string;
            email: string;
            phone: string;
            is_active: boolean;
            last_login_at: Date;
            user_roles: ({
                role: {
                    description: string | null;
                    name: string;
                    id: number;
                    created_at: Date;
                    updated_at: Date;
                    is_active: boolean;
                    slug: string;
                    permissions: import("@prisma/client/runtime/library").JsonValue | null;
                };
            } & {
                id: number;
                user_id: number;
                created_at: Date;
                role_id: number;
                granted_by: number | null;
                granted_at: Date;
                expires_at: Date | null;
            })[];
        }[];
        pagination: {
            page: number;
            per_page: number;
            total: number;
            total_pages: number;
        };
    }>;
    getUser(id: number): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        username: string;
        email: string;
        phone: string;
        avatar: string;
        is_active: boolean;
        last_login_at: Date;
        user_roles: ({
            role: {
                description: string | null;
                name: string;
                id: number;
                created_at: Date;
                updated_at: Date;
                is_active: boolean;
                slug: string;
                permissions: import("@prisma/client/runtime/library").JsonValue | null;
            };
        } & {
            id: number;
            user_id: number;
            created_at: Date;
            role_id: number;
            granted_by: number | null;
            granted_at: Date;
            expires_at: Date | null;
        })[];
    }>;
    updateUser(id: number, updateData: any): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        username: string;
        email: string;
        password: string;
        phone: string | null;
        avatar: string | null;
        email_verified_at: Date | null;
        phone_verified_at: Date | null;
        is_active: boolean;
        is_banned: boolean;
        banned_until: Date | null;
        ban_reason: string | null;
        last_login_at: Date | null;
        login_attempts: number;
        locked_until: Date | null;
    }>;
    deleteUser(id: number): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        username: string;
        email: string;
        password: string;
        phone: string | null;
        avatar: string | null;
        email_verified_at: Date | null;
        phone_verified_at: Date | null;
        is_active: boolean;
        is_banned: boolean;
        banned_until: Date | null;
        ban_reason: string | null;
        last_login_at: Date | null;
        login_attempts: number;
        locked_until: Date | null;
    }>;
    getOrders(page?: number, perPage?: number, status?: string, dateFrom?: string, dateTo?: string): Promise<{
        data: ({
            buyer: {
                name: string;
                id: number;
                username: string;
                email: string;
            };
            items: ({
                product: {
                    name: string;
                    id: number;
                    price: import("@prisma/client/runtime/library").Decimal;
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
        pagination: {
            page: number;
            per_page: number;
            total: number;
            total_pages: number;
        };
    }>;
    getOrder(id: number): Promise<{
        buyer: {
            name: string;
            id: number;
            username: string;
            email: string;
        };
        items: ({
            product: {
                name: string;
                id: number;
                price: import("@prisma/client/runtime/library").Decimal;
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
    }>;
    updateOrderStatus(id: number, status: string): Promise<{
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
    }>;
    getVendors(page?: number, perPage?: number, search?: string, status?: string): Promise<{
        data: {
            name: string;
            id: number;
            created_at: Date;
            username: string;
            email: string;
            phone: string;
            is_active: boolean;
            last_login_at: Date;
            user_roles: ({
                role: {
                    description: string | null;
                    name: string;
                    id: number;
                    created_at: Date;
                    updated_at: Date;
                    is_active: boolean;
                    slug: string;
                    permissions: import("@prisma/client/runtime/library").JsonValue | null;
                };
            } & {
                id: number;
                user_id: number;
                created_at: Date;
                role_id: number;
                granted_by: number | null;
                granted_at: Date;
                expires_at: Date | null;
            })[];
            products: {
                name: string;
                id: number;
                status: import(".prisma/client").$Enums.ProductStatus;
                price: import("@prisma/client/runtime/library").Decimal;
            }[];
        }[];
        pagination: {
            page: number;
            per_page: number;
            total: number;
            total_pages: number;
        };
    }>;
    getVendor(id: number): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        username: string;
        email: string;
        phone: string;
        avatar: string;
        is_active: boolean;
        last_login_at: Date;
        user_roles: ({
            role: {
                description: string | null;
                name: string;
                id: number;
                created_at: Date;
                updated_at: Date;
                is_active: boolean;
                slug: string;
                permissions: import("@prisma/client/runtime/library").JsonValue | null;
            };
        } & {
            id: number;
            user_id: number;
            created_at: Date;
            role_id: number;
            granted_by: number | null;
            granted_at: Date;
            expires_at: Date | null;
        })[];
        products: {
            name: string;
            id: number;
            status: import(".prisma/client").$Enums.ProductStatus;
            created_at: Date;
            price: import("@prisma/client/runtime/library").Decimal;
        }[];
    }>;
    updateVendorStatus(id: number, status: string): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        username: string;
        email: string;
        password: string;
        phone: string | null;
        avatar: string | null;
        email_verified_at: Date | null;
        phone_verified_at: Date | null;
        is_active: boolean;
        is_banned: boolean;
        banned_until: Date | null;
        ban_reason: string | null;
        last_login_at: Date | null;
        login_attempts: number;
        locked_until: Date | null;
    }>;
    getListings(page?: number, perPage?: number, status?: string, category?: string): Promise<{
        data: ({
            seller: {
                name: string;
                id: number;
                username: string;
                email: string;
            };
        } & {
            description: string | null;
            name: string;
            id: number;
            status: import(".prisma/client").$Enums.ProductStatus;
            created_at: Date;
            updated_at: Date;
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
        })[];
        pagination: {
            page: number;
            per_page: number;
            total: number;
            total_pages: number;
        };
    }>;
    getListing(id: number): Promise<{
        seller: {
            name: string;
            id: number;
            username: string;
            email: string;
        };
    } & {
        description: string | null;
        name: string;
        id: number;
        status: import(".prisma/client").$Enums.ProductStatus;
        created_at: Date;
        updated_at: Date;
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
    }>;
    updateListingStatus(id: number, status: string): Promise<{
        description: string | null;
        name: string;
        id: number;
        status: import(".prisma/client").$Enums.ProductStatus;
        created_at: Date;
        updated_at: Date;
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
    }>;
    getPayouts(page?: number, perPage?: number, status?: string, dateFrom?: string, dateTo?: string): Promise<{
        data: any[];
        pagination: {
            page: number;
            per_page: number;
            total: number;
            total_pages: number;
        };
    }>;
    getPayout(id: number): Promise<any>;
    updatePayoutStatus(id: number, status: string): Promise<any>;
    getDashboardStats(): Promise<{
        totalUsers: number;
        activeUsers: number;
        totalOrders: number;
        totalProducts: number;
        totalRevenue: number | import("@prisma/client/runtime/library").Decimal;
        recentOrders: ({
            buyer: {
                name: string;
                email: string;
            };
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
}
