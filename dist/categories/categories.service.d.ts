import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        name: string;
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        status: string;
        slug: string;
        image: string | null;
    }>;
    findAll(): Promise<{
        name: string;
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        status: string;
        slug: string;
        image: string | null;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        status: string;
        slug: string;
        image: string | null;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        name: string;
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        status: string;
        slug: string;
        image: string | null;
    }>;
    remove(id: string): Promise<{
        name: string;
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        status: string;
        slug: string;
        image: string | null;
    }>;
    private generateSlug;
}
