import { WishlistService } from './wishlist.service';
export declare class WishlistController {
    private wishlistService;
    constructor(wishlistService: WishlistService);
    getWishlist(user: any): Promise<{
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
    }[]>;
    addToWishlist(user: any, productId: string): Promise<({
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
        user_id: number;
        product_id: number;
    }) | {
        message: string;
    }>;
    removeFromWishlist(user: any, productId: string): Promise<{
        message: string;
    }>;
}
