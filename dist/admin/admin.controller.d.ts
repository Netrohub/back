import { AdminService } from './admin.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    getUsers(page?: number, perPage?: number, search?: string, role?: string, status?: string): Promise<{
        data: {
            id: number;
            username: string;
            email: string;
            name: string;
            phone: string;
            roles: import("@prisma/client/runtime/library").JsonValue;
            kyc_verified: boolean;
            is_active: boolean;
            last_login_at: Date;
            created_at: Date;
        }[];
        pagination: {
            page: number;
            per_page: number;
            total: number;
            total_pages: number;
        };
    }>;
    getUser(id: number): Promise<{
        id: number;
        username: string;
        email: string;
        name: string;
        phone: string;
        avatar: string;
        roles: import("@prisma/client/runtime/library").JsonValue;
        kyc_status: import("@prisma/client/runtime/library").JsonValue;
        kyc_verified: boolean;
        is_active: boolean;
        last_login_at: Date;
        created_at: Date;
        updated_at: Date;
    }>;
    updateUser(id: number, updateData: any): Promise<{
        id: number;
        username: string;
        email: string;
        name: string;
        password: string;
        phone: string | null;
        avatar: string | null;
        roles: import("@prisma/client/runtime/library").JsonValue;
        kyc_status: import("@prisma/client/runtime/library").JsonValue;
        kyc_documents: import("@prisma/client/runtime/library").JsonValue | null;
        kyc_verified: boolean;
        kyc_completed_at: Date | null;
        email_verified_at: Date | null;
        phone_verified_at: Date | null;
        identity_verified_at: Date | null;
        is_active: boolean;
        last_login_at: Date | null;
        login_attempts: number;
        locked_until: Date | null;
        created_at: Date;
        updated_at: Date;
    }>;
    deleteUser(id: number): Promise<{
        id: number;
        username: string;
        email: string;
        name: string;
        password: string;
        phone: string | null;
        avatar: string | null;
        roles: import("@prisma/client/runtime/library").JsonValue;
        kyc_status: import("@prisma/client/runtime/library").JsonValue;
        kyc_documents: import("@prisma/client/runtime/library").JsonValue | null;
        kyc_verified: boolean;
        kyc_completed_at: Date | null;
        email_verified_at: Date | null;
        phone_verified_at: Date | null;
        identity_verified_at: Date | null;
        is_active: boolean;
        last_login_at: Date | null;
        login_attempts: number;
        locked_until: Date | null;
        created_at: Date;
        updated_at: Date;
    }>;
    getOrders(page?: number, perPage?: number, status?: string, dateFrom?: string, dateTo?: string): Promise<{
        data: ({
            user: {
                id: number;
                username: string;
                email: string;
                name: string;
            };
            items: ({
                product: {
                    id: number;
                    name: string;
                    price: import("@prisma/client/runtime/library").Decimal;
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
        pagination: {
            page: number;
            per_page: number;
            total: number;
            total_pages: number;
        };
    }>;
    getOrder(id: number): Promise<{
        user: {
            id: number;
            username: string;
            email: string;
            name: string;
        };
        items: ({
            product: {
                id: number;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
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
    }>;
    updateOrderStatus(id: number, statusData: {
        status: string;
    }): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        user_id: number;
        status: string;
        total_amount: import("@prisma/client/runtime/library").Decimal;
        payment_status: string;
        shipping_address: import("@prisma/client/runtime/library").JsonValue | null;
        payment_method: string | null;
    }>;
    getVendors(page?: number, perPage?: number, search?: string, status?: string): Promise<{
        data: {
            id: number;
            username: string;
            email: string;
            name: string;
            phone: string;
            roles: import("@prisma/client/runtime/library").JsonValue;
            kyc_verified: boolean;
            is_active: boolean;
            last_login_at: Date;
            created_at: Date;
            products: {
                id: number;
                name: string;
                status: string;
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
        id: number;
        username: string;
        email: string;
        name: string;
        phone: string;
        avatar: string;
        roles: import("@prisma/client/runtime/library").JsonValue;
        kyc_status: import("@prisma/client/runtime/library").JsonValue;
        kyc_verified: boolean;
        is_active: boolean;
        last_login_at: Date;
        created_at: Date;
        updated_at: Date;
        products: {
            id: number;
            name: string;
            created_at: Date;
            status: string;
            price: import("@prisma/client/runtime/library").Decimal;
        }[];
    }>;
    updateVendorStatus(id: number, statusData: {
        status: string;
    }): Promise<{
        id: number;
        username: string;
        email: string;
        name: string;
        password: string;
        phone: string | null;
        avatar: string | null;
        roles: import("@prisma/client/runtime/library").JsonValue;
        kyc_status: import("@prisma/client/runtime/library").JsonValue;
        kyc_documents: import("@prisma/client/runtime/library").JsonValue | null;
        kyc_verified: boolean;
        kyc_completed_at: Date | null;
        email_verified_at: Date | null;
        phone_verified_at: Date | null;
        identity_verified_at: Date | null;
        is_active: boolean;
        last_login_at: Date | null;
        login_attempts: number;
        locked_until: Date | null;
        created_at: Date;
        updated_at: Date;
    }>;
    getListings(page?: number, perPage?: number, status?: string, category?: string): Promise<{
        data: ({
            seller: {
                id: number;
                username: string;
                email: string;
                name: string;
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
            id: number;
            username: string;
            email: string;
            name: string;
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
    }>;
    updateListingStatus(id: number, statusData: {
        status: string;
    }): Promise<{
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
    updatePayoutStatus(id: number, statusData: {
        status: string;
    }): Promise<any>;
    getDashboardStats(): Promise<{
        totalUsers: number;
        activeUsers: number;
        totalOrders: number;
        totalProducts: number;
        totalRevenue: number | import("@prisma/client/runtime/library").Decimal;
        recentOrders: ({
            user: {
                email: string;
                name: string;
            };
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
}
