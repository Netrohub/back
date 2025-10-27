import { PayoutsService } from './payouts.service';
import { CreatePayoutDto } from './dto/create-payout.dto';
import { UpdatePayoutDto } from './dto/update-payout.dto';
export declare class PayoutsController {
    private readonly payoutsService;
    constructor(payoutsService: PayoutsService);
    create(createPayoutDto: CreatePayoutDto): Promise<{
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        status: import(".prisma/client").$Enums.PayoutStatus;
        seller_id: number;
        completed_at: Date | null;
        notes: string | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        method: string | null;
        reference: string | null;
        fee_amount: import("@prisma/client/runtime/library").Decimal;
        net_amount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        requested_at: Date;
        processed_at: Date | null;
        failed_at: Date | null;
    }>;
    findAll(sellerId?: number, status?: string): Promise<({
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
        amount: import("@prisma/client/runtime/library").Decimal;
        method: string | null;
        reference: string | null;
        fee_amount: import("@prisma/client/runtime/library").Decimal;
        net_amount: import("@prisma/client/runtime/library").Decimal;
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
        amount: import("@prisma/client/runtime/library").Decimal;
        method: string | null;
        reference: string | null;
        fee_amount: import("@prisma/client/runtime/library").Decimal;
        net_amount: import("@prisma/client/runtime/library").Decimal;
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
        amount: import("@prisma/client/runtime/library").Decimal;
        method: string | null;
        reference: string | null;
        fee_amount: import("@prisma/client/runtime/library").Decimal;
        net_amount: import("@prisma/client/runtime/library").Decimal;
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
        amount: import("@prisma/client/runtime/library").Decimal;
        method: string | null;
        reference: string | null;
        fee_amount: import("@prisma/client/runtime/library").Decimal;
        net_amount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        requested_at: Date;
        processed_at: Date | null;
        failed_at: Date | null;
    }>;
}
