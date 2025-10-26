import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, createOrderDto: CreateOrderDto): Promise<{
        user: {
            name: string;
            email: string;
            id: number;
        };
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
            name: string;
            email: string;
            id: number;
        };
        items: ({
            product: {
                name: string;
                id: number;
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
            name: string;
            email: string;
            phone: string;
            id: number;
        };
        items: ({
            product: {
                name: string;
                description: string;
                id: number;
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
            name: string;
            email: string;
            id: number;
        };
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
