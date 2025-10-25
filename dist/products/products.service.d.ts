import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto, ProductFiltersDto } from '../types';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(filters?: ProductFiltersDto): Promise<{
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
    findById(id: number): Promise<{
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
    create(createProductDto: CreateProductDto, sellerId: number): Promise<{
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
    update(id: number, updateProductDto: UpdateProductDto, sellerId: number): Promise<{
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
    remove(id: number, sellerId: number): Promise<{
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
    findBySeller(sellerId: number): Promise<({
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
    })[]>;
}
