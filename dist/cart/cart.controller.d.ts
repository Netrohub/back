import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
export declare class CartController {
    private cartService;
    constructor(cartService: CartService);
    getCart(req: any): Promise<{
        items: ({
            product: {
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
            };
        } & {
            id: number;
            user_id: number;
            product_id: number;
            quantity: number;
            status: import(".prisma/client").$Enums.CartStatus;
            created_at: Date;
            updated_at: Date;
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
        user_id: number;
        product_id: number;
        quantity: number;
        status: import(".prisma/client").$Enums.CartStatus;
        created_at: Date;
        updated_at: Date;
    }>;
    updateCartItem(user: any, id: string, updateCartItemDto: UpdateCartItemDto): Promise<import(".prisma/client").Prisma.BatchPayload>;
    removeFromCart(user: any, id: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    clearCart(user: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
