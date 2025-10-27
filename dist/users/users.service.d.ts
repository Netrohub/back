import { PrismaService } from '../prisma/prisma.service';
import { ValidationService } from '../common/validation.service';
import { UpdateUserDto, UpdatePasswordDto } from '../types';
export declare class UsersService {
    private prisma;
    private validationService;
    constructor(prisma: PrismaService, validationService: ValidationService);
    findById(id: number): Promise<{
        id: number;
        created_at: Date;
        username: string;
        name: string;
        email: string;
        phone: string;
        avatar: string;
        email_verified_at: Date;
        phone_verified_at: Date;
        updated_at: Date;
        user_roles: ({
            role: {
                description: string | null;
                id: number;
                created_at: Date;
                name: string;
                is_active: boolean;
                updated_at: Date;
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
        id: number;
        created_at: Date;
        username: string;
        name: string;
        avatar: string;
        email_verified_at: Date;
        phone_verified_at: Date;
        user_roles: ({
            role: {
                description: string | null;
                id: number;
                created_at: Date;
                name: string;
                is_active: boolean;
                updated_at: Date;
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
            created_at: Date;
            updated_at: Date;
            status: import(".prisma/client").$Enums.KycStatus;
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
        id: number;
        created_at: Date;
        name: string;
        email: string;
        phone: string;
        avatar: string;
        email_verified_at: Date;
        phone_verified_at: Date;
        updated_at: Date;
        user_roles: ({
            role: {
                description: string | null;
                id: number;
                created_at: Date;
                name: string;
                is_active: boolean;
                updated_at: Date;
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
        id: number;
        created_at: Date;
        name: string;
        email: string;
        phone: string;
        avatar: string;
        email_verified_at: Date;
        phone_verified_at: Date;
        updated_at: Date;
        user_roles: ({
            role: {
                description: string | null;
                id: number;
                created_at: Date;
                name: string;
                is_active: boolean;
                updated_at: Date;
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
            id: number;
            created_at: Date;
            username: string;
            name: string;
            avatar: string;
            user_roles: ({
                role: {
                    description: string | null;
                    id: number;
                    created_at: Date;
                    name: string;
                    is_active: boolean;
                    updated_at: Date;
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
}
