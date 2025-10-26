import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, createOrderDto: CreateOrderDto): Promise<{
        user: {
            id: number;
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
    }>;
    findAll(userId: number, userRole: string): Promise<({
        user: {
            id: number;
            email: string;
            name: string;
        };
        items: ({
            product: {
                id: number;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
                images: import("@prisma/client/runtime/library").JsonValue;
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
    findOne(id: number, userId: number, userRole: string): Promise<{
        user: {
            id: number;
            email: string;
            name: string;
            phone: string;
        };
        items: ({
            product: {
                id: number;
                name: string;
                description: string;
                price: import("@prisma/client/runtime/library").Decimal;
                images: import("@prisma/client/runtime/library").JsonValue;
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
    update(id: number, updateOrderDto: UpdateOrderDto, userId: number, userRole: string): Promise<{
        user: {
            id: number;
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
    }>;
    cancel(id: number, userId: number): Promise<{
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
    }>;
    remove(id: number, userId: number, userRole: string): Promise<{
        message: string;
    }>;
}
