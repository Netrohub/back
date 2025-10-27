import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        name: string;
        is_active: boolean;
        slug: string;
        image: string | null;
        sort_order: number;
        parent_id: number | null;
    }>;
    findAll(): Promise<{
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        name: string;
        is_active: boolean;
        slug: string;
        image: string | null;
        sort_order: number;
        parent_id: number | null;
    }[]>;
    findOne(id: string): Promise<{
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        name: string;
        is_active: boolean;
        slug: string;
        image: string | null;
        sort_order: number;
        parent_id: number | null;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        name: string;
        is_active: boolean;
        slug: string;
        image: string | null;
        sort_order: number;
        parent_id: number | null;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        name: string;
        is_active: boolean;
        slug: string;
        image: string | null;
        sort_order: number;
        parent_id: number | null;
    }>;
}
