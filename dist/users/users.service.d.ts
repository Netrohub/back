import { PrismaService } from '../prisma/prisma.service';
import { ValidationService } from '../common/validation.service';
import { UpdateUserDto, UpdatePasswordDto } from '../types';
export declare class UsersService {
    private prisma;
    private validationService;
    constructor(prisma: PrismaService, validationService: ValidationService);
    findById(id: number): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        username: string;
        email: string;
        phone: string;
        avatar: string;
        email_verified_at: Date;
        phone_verified_at: Date;
        user_roles: ({
            role: {
                description: string | null;
                name: string;
                id: number;
                created_at: Date;
                updated_at: Date;
                is_active: boolean;
                slug: string;
                permissions: import("@prisma/client/runtime/library").JsonValue | null;
            };
        } & {
            id: number;
            user_id: number;
            created_at: Date;
            role_id: number;
            granted_by: number | null;
            granted_at: Date;
            expires_at: Date | null;
        })[];
    }>;
    findByUsername(username: string): Promise<{
        name: string;
        id: number;
        created_at: Date;
        username: string;
        avatar: string;
        bio: string;
        location: string;
        email_verified_at: Date;
        phone_verified_at: Date;
        user_roles: ({
            role: {
                description: string | null;
                name: string;
                id: number;
                created_at: Date;
                updated_at: Date;
                is_active: boolean;
                slug: string;
                permissions: import("@prisma/client/runtime/library").JsonValue | null;
            };
        } & {
            id: number;
            user_id: number;
            created_at: Date;
            role_id: number;
            granted_by: number | null;
            granted_at: Date;
            expires_at: Date | null;
        })[];
        kyc_verifications: {
            type: import(".prisma/client").$Enums.KycType;
            id: number;
            user_id: number;
            status: import(".prisma/client").$Enums.KycStatus;
            created_at: Date;
            updated_at: Date;
            notes: string | null;
            expires_at: Date | null;
            data: import("@prisma/client/runtime/library").JsonValue | null;
            provider: string | null;
            external_id: string | null;
            documents: import("@prisma/client/runtime/library").JsonValue | null;
            verified_at: Date | null;
            rejected_at: Date | null;
        }[];
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        email: string;
        phone: string;
        avatar: string;
        email_verified_at: Date;
        phone_verified_at: Date;
        user_roles: ({
            role: {
                description: string | null;
                name: string;
                id: number;
                created_at: Date;
                updated_at: Date;
                is_active: boolean;
                slug: string;
                permissions: import("@prisma/client/runtime/library").JsonValue | null;
            };
        } & {
            id: number;
            user_id: number;
            created_at: Date;
            role_id: number;
            granted_by: number | null;
            granted_at: Date;
            expires_at: Date | null;
        })[];
    }>;
    updatePassword(id: number, updatePasswordDto: UpdatePasswordDto): Promise<{
        message: string;
    }>;
    findAll(): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        email: string;
        phone: string;
        avatar: string;
        email_verified_at: Date;
        phone_verified_at: Date;
        user_roles: ({
            role: {
                description: string | null;
                name: string;
                id: number;
                created_at: Date;
                updated_at: Date;
                is_active: boolean;
                slug: string;
                permissions: import("@prisma/client/runtime/library").JsonValue | null;
            };
        } & {
            id: number;
            user_id: number;
            created_at: Date;
            role_id: number;
            granted_by: number | null;
            granted_at: Date;
            expires_at: Date | null;
        })[];
    }[]>;
    findAllPublic(page?: number, perPage?: number, search?: string, role?: string): Promise<{
        data: {
            name: string;
            id: number;
            created_at: Date;
            username: string;
            avatar: string;
            user_roles: ({
                role: {
                    description: string | null;
                    name: string;
                    id: number;
                    created_at: Date;
                    updated_at: Date;
                    is_active: boolean;
                    slug: string;
                    permissions: import("@prisma/client/runtime/library").JsonValue | null;
                };
            } & {
                id: number;
                user_id: number;
                created_at: Date;
                role_id: number;
                granted_by: number | null;
                granted_at: Date;
                expires_at: Date | null;
            })[];
        }[];
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
            from: number;
            to: number;
        };
    }>;
    getUserListings(username: string): Promise<{
        data: {
            id: number;
            title: string;
            description: string;
            price: number;
            discount_price: number;
            category: string;
            subcategory: string;
            platform: string;
            level: string;
            type: string;
            images: string[];
            tags: any[];
            status: string;
            created_at: string;
            updated_at: string;
        }[];
        meta: {
            total: number;
            user_id: number;
            username: string;
        };
    }>;
    getUserReviews(username: string): Promise<{
        data: any[];
        meta: {
            total: number;
            user_id: number;
            username: string;
            message: string;
        };
    }>;
}
