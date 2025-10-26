import { UsersService } from './users.service';
import { UpdateUserDto, UpdatePasswordDto } from '../types';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUserByUsername(username: string): Promise<{
        name: string;
        username: string;
        id: number;
        avatar: string;
        roles: import("@prisma/client/runtime/library").JsonValue;
        kyc_status: import("@prisma/client/runtime/library").JsonValue;
        email_verified_at: Date;
        phone_verified_at: Date;
        identity_verified_at: Date;
        created_at: Date;
    }>;
    getProfile(user: any): Promise<{
        name: string;
        email: string;
        username: string;
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
    }>;
    updateProfile(user: any, updateUserDto: UpdateUserDto): Promise<{
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
    }>;
    updatePassword(user: any, updatePasswordDto: UpdatePasswordDto): Promise<{
        message: string;
    }>;
}
