import { PrismaService } from '../prisma/prisma.service';
import { ValidationService } from '../common/validation.service';
import { UpdateUserDto, UpdatePasswordDto } from '../types';
export declare class UsersService {
    private prisma;
    private validationService;
    constructor(prisma: PrismaService, validationService: ValidationService);
    findById(id: number): Promise<{
        id: number;
        username: string;
        email: string;
        name: string;
        phone: string;
        avatar: string;
        roles: import("@prisma/client/runtime/library").JsonValue;
        kyc_status: import("@prisma/client/runtime/library").JsonValue;
        email_verified_at: Date;
        phone_verified_at: Date;
        identity_verified_at: Date;
        created_at: Date;
        updated_at: Date;
    }>;
    findByUsername(username: string): Promise<{
        id: number;
        username: string;
        name: string;
        avatar: string;
        roles: import("@prisma/client/runtime/library").JsonValue;
        kyc_status: import("@prisma/client/runtime/library").JsonValue;
        email_verified_at: Date;
        phone_verified_at: Date;
        identity_verified_at: Date;
        created_at: Date;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        email: string;
        name: string;
        phone: string;
        avatar: string;
        roles: import("@prisma/client/runtime/library").JsonValue;
        kyc_status: import("@prisma/client/runtime/library").JsonValue;
        email_verified_at: Date;
        phone_verified_at: Date;
        identity_verified_at: Date;
        created_at: Date;
        updated_at: Date;
    }>;
    updatePassword(id: number, updatePasswordDto: UpdatePasswordDto): Promise<{
        message: string;
    }>;
    findAll(): Promise<{
        id: number;
        email: string;
        name: string;
        phone: string;
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
