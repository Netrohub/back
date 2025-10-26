import { PrismaService } from '../prisma/prisma.service';
import { ValidationService } from '../common/validation.service';
import { UpdateUserDto, UpdatePasswordDto } from '../types';
export declare class UsersService {
    private prisma;
    private validationService;
    constructor(prisma: PrismaService, validationService: ValidationService);
    findById(id: number): Promise<{
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
    findByUsername(username: string): Promise<{
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
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
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
    updatePassword(id: number, updatePasswordDto: UpdatePasswordDto): Promise<{
        message: string;
    }>;
    findAll(): Promise<{
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
