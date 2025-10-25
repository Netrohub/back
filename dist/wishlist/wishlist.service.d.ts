import { PrismaService } from '../prisma/prisma.service';
export declare class WishlistService {
    private prisma;
    constructor(prisma: PrismaService);
    getWishlist(userId: number): Promise<{
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
    addToWishlist(userId: number, productId: number): Promise<({
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
    removeFromWishlist(userId: number, productId: number): Promise<{
        message: string;
    }>;
}
