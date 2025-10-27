import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    create(user: any, createOrderDto: CreateOrderDto): Promise<{
        seller: {
            id: number;
            name: string;
            email: string;
        };
        buyer: {
            id: number;
            name: string;
            email: string;
        };
        items: ({
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
    findAll(user: any): Promise<({
        buyer: {
            id: number;
            name: string;
            email: string;
        };
        items: ({
            product: {
                id: number;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
                images: {
                    id: number;
                    product_id: number;
                    created_at: Date;
                    sort_order: number;
                    image_url: string;
                    alt_text: string | null;
                    is_primary: boolean;
                }[];
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
    })[]>;
    findOne(id: string, user: any): Promise<{
        buyer: {
            id: number;
            name: string;
            email: string;
            phone: string;
        };
        items: ({
            product: {
                description: string;
                id: number;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
                images: {
                    id: number;
                    product_id: number;
                    created_at: Date;
                    sort_order: number;
                    image_url: string;
                    alt_text: string | null;
                    is_primary: boolean;
                }[];
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
    update(id: string, updateOrderDto: UpdateOrderDto, user: any): Promise<{
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
    cancel(id: string, user: any): Promise<{
        items: ({
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
    remove(id: string, user: any): Promise<{
        message: string;
    }>;
}
