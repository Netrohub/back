import { PrismaService } from '../prisma/prisma.service';
import { CreatePayoutDto } from './dto/create-payout.dto';
import { UpdatePayoutDto } from './dto/update-payout.dto';
import { Decimal } from '@prisma/client/runtime/library';
export declare class PayoutsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPayoutDto: CreatePayoutDto): Promise<{
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        status: import(".prisma/client").$Enums.PayoutStatus;
        seller_id: number;
        completed_at: Date | null;
        notes: string | null;
        amount: Decimal;
        method: string | null;
        reference: string | null;
        fee_amount: Decimal;
        net_amount: Decimal;
        currency: string;
        requested_at: Date;
        processed_at: Date | null;
        failed_at: Date | null;
    }>;
    findAll(filters?: {
        seller_id?: number;
        status?: string;
    }): Promise<({
        seller: {
            id: number;
            name: string;
            email: string;
        };
    } & {
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        status: import(".prisma/client").$Enums.PayoutStatus;
        seller_id: number;
        completed_at: Date | null;
        notes: string | null;
        amount: Decimal;
        method: string | null;
        reference: string | null;
        fee_amount: Decimal;
        net_amount: Decimal;
        currency: string;
        requested_at: Date;
        processed_at: Date | null;
        failed_at: Date | null;
    })[]>;
    findOne(id: string): Promise<{
        seller: {
            id: number;
            name: string;
            email: string;
        };
    } & {
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        status: import(".prisma/client").$Enums.PayoutStatus;
        seller_id: number;
        completed_at: Date | null;
        notes: string | null;
        amount: Decimal;
        method: string | null;
        reference: string | null;
        fee_amount: Decimal;
        net_amount: Decimal;
        currency: string;
        requested_at: Date;
        processed_at: Date | null;
        failed_at: Date | null;
    }>;
    update(id: string, updatePayoutDto: UpdatePayoutDto): Promise<{
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        status: import(".prisma/client").$Enums.PayoutStatus;
        seller_id: number;
        completed_at: Date | null;
        notes: string | null;
        amount: Decimal;
        method: string | null;
        reference: string | null;
        fee_amount: Decimal;
        net_amount: Decimal;
        currency: string;
        requested_at: Date;
        processed_at: Date | null;
        failed_at: Date | null;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        status: import(".prisma/client").$Enums.PayoutStatus;
        seller_id: number;
        completed_at: Date | null;
        notes: string | null;
        amount: Decimal;
        method: string | null;
        reference: string | null;
        fee_amount: Decimal;
        net_amount: Decimal;
        currency: string;
        requested_at: Date;
        processed_at: Date | null;
        failed_at: Date | null;
    }>;
}
