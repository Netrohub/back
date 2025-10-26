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
        status: string;
        seller_id: number;
        method: string | null;
        amount: Decimal;
        notes: string | null;
        reference: string | null;
        request_date: Date;
        process_date: Date | null;
        completed_date: Date | null;
    }>;
    findAll(filters?: {
        seller_id?: number;
        status?: string;
    }): Promise<({
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
        amount: Decimal;
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
        amount: Decimal;
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
        amount: Decimal;
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
        amount: Decimal;
        notes: string | null;
        reference: string | null;
        request_date: Date;
        process_date: Date | null;
        completed_date: Date | null;
    }>;
}
