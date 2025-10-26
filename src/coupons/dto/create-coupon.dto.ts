import { IsString, IsNotEmpty, IsOptional, IsNumber, IsIn, IsDateString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCouponDto {
  @ApiProperty({ description: 'Coupon code (must be unique)' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: 'Coupon description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Discount type: percentage or fixed', enum: ['percentage', 'fixed'] })
  @IsIn(['percentage', 'fixed'])
  @IsNotEmpty()
  type: 'percentage' | 'fixed';

  @ApiProperty({ description: 'Discount value' })
  @IsNumber()
  @Min(0)
  value: number;

  @ApiProperty({ description: 'Minimum order amount to apply coupon', required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minAmount?: number;

  @ApiProperty({ description: 'Maximum discount amount (for percentage coupons)', required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  maxDiscount?: number;

  @ApiProperty({ description: 'Maximum number of times coupon can be used', required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  usageLimit?: number;

  @ApiProperty({ description: 'Coupon status', default: 'active' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ description: 'Expiry date', required: false })
  @IsDateString()
  @IsOptional()
  expiresAt?: string;
}
