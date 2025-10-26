import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { JwtService } from '@nestjs/jwt';
export declare class CartService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    getUserFromToken(token: string): Promise<{
        name: string;
        email: string;
        id: number;
    }>;
    getCart(userId: number): Promise<{
        items: ({
            product: {
                category: string;
                name: string;
                description: string | null;
                id: number;
                created_at: Date;
                updated_at: Date;
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
    }>;
    addToCart(userId: number, addToCartDto: AddToCartDto): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        user_id: number;
        product_id: number;
        quantity: number;
        status: string;
    }>;
    updateCartItem(userId: number, itemId: number, updateCartItemDto: UpdateCartItemDto): Promise<import(".prisma/client").Prisma.BatchPayload>;
    removeFromCart(userId: number, itemId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
    clearCart(userId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
