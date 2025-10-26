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
        status: string;
        seller_id: number;
        method: string | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        notes: string | null;
        reference: string | null;
        request_date: Date;
        process_date: Date | null;
        completed_date: Date | null;
    }>;
    findAll(sellerId?: number, status?: string): Promise<({
        seller: {
            name: string;
            email: string;
            id: number;
        };
    } & {
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        status: string;
        seller_id: number;
        method: string | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        notes: string | null;
        reference: string | null;
        request_date: Date;
        process_date: Date | null;
        completed_date: Date | null;
    })[]>;
    findOne(id: string): Promise<{
        seller: {
            name: string;
            email: string;
            id: number;
        };
    } & {
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        status: string;
        seller_id: number;
        method: string | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        notes: string | null;
        reference: string | null;
        request_date: Date;
        process_date: Date | null;
        completed_date: Date | null;
    }>;
    update(id: string, updatePayoutDto: UpdatePayoutDto): Promise<{
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        status: string;
        seller_id: number;
        method: string | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        notes: string | null;
        reference: string | null;
        request_date: Date;
        process_date: Date | null;
        completed_date: Date | null;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        status: string;
        seller_id: number;
        method: string | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        notes: string | null;
        reference: string | null;
        request_date: Date;
        process_date: Date | null;
        completed_date: Date | null;
    }>;
}
