import { UsersService } from './users.service';
export declare class PublicUsersController {
    private usersService;
    constructor(usersService: UsersService);
    getMembers(): Promise<{
        name: string;
        email: string;
        phone: string;
        id: number;
        avatar: string;
        roles: import("@prisma/client/runtime/library").JsonValue;
        kyc_status: import("@prisma/client/runtime/library").JsonValue;
        email_verified_at: Date;
        phone_verified_at: Date;
        identity_verified_at: Date;
        created_at: Date;
        updated_at: Date;
    }[]>;
}
