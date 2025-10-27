import { WishlistService } from './wishlist.service';
export declare class WishlistController {
    private wishlistService;
    constructor(wishlistService: WishlistService);
    getWishlist(user: any): Promise<{
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
    }[]>;
    addToWishlist(user: any, productId: string): Promise<({
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
        user_id: number;
        product_id: number;
        created_at: Date;
    }) | {
        message: string;
    }>;
    removeFromWishlist(user: any, productId: string): Promise<{
        message: string;
    }>;
}
