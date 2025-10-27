import { UsersService } from './users.service';
export declare class PublicUsersController {
    private usersService;
    constructor(usersService: UsersService);
    getMembers(): Promise<{
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
}
