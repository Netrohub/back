export declare class CreateCouponDto {
    code: string;
    description?: string;
    type: 'percentage' | 'fixed';
    value: number;
    minAmount?: number;
    maxDiscount?: number;
    usageLimit?: number;
    status?: string;
    expiresAt?: string;
}
