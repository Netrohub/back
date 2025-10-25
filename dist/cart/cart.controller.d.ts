import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto } from '../types';
export declare class CartController {
    private cartService;
    constructor(cartService: CartService);
    getCart(req: any): Promise<{
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
            updated_at: Date;
            user_id: number;
            product_id: number;
            quantity: number;
            status: string;
        })[];
        subtotal: number;
        service_fee: number;
        total: number;
        items_count: number;
    } | {
        items: any[];
        total: number;
        count: number;
    }>;
    addToCart(user: any, addToCartDto: AddToCartDto): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        user_id: number;
        product_id: number;
        quantity: number;
        status: string;
    }>;
    updateCartItem(user: any, id: string, updateCartItemDto: UpdateCartItemDto): Promise<import(".prisma/client").Prisma.BatchPayload>;
    removeFromCart(user: any, id: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    clearCart(user: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
