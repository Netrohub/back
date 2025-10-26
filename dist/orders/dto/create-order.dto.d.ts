export declare class CreateOrderItemDto {
    product_id: number;
    quantity: number;
}
export declare class CreateOrderDto {
    shipping_address: any;
    payment_method: string;
    items: CreateOrderItemDto[];
}
