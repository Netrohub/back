import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, ProductFiltersDto } from '../types';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    findAll(filters: ProductFiltersDto): Promise<{
        data: ({
            seller: {
                id: number;
                name: string;
                avatar: string;
            };
        } & {
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
        })[];
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
            from: number;
            to: number;
        };
    }>;
    findOne(id: string): Promise<{
        seller: {
            id: number;
            name: string;
            avatar: string;
        };
    } & {
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
    }>;
    create(createProductDto: CreateProductDto, req: any): Promise<{
        seller: {
            id: number;
            name: string;
            avatar: string;
        };
    } & {
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
    }>;
    update(id: string, updateProductDto: UpdateProductDto, req: any): Promise<{
        seller: {
            id: number;
            name: string;
            avatar: string;
        };
    } & {
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
    }>;
    remove(id: string, req: any): Promise<{
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
    }>;
}
