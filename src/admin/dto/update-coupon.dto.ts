import { IsOptional, IsString, IsEnum, IsNumber, IsDateString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCouponDto {
  @ApiProperty({ description: 'Coupon code', example: 'SUMMER2024', required: false })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ description: 'Coupon name', example: 'Summer Sale 2024', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Coupon description', example: 'Get 10% off on all products', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Coupon type', enum: ['PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SHIPPING'], required: false })
  @IsOptional()
  @IsEnum(['PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SHIPPING'], { message: 'Invalid coupon type' })
  type?: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING';

  @ApiProperty({ description: 'Discount value', example: 10.00, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Discount value must be positive' })
  value?: number;

  @ApiProperty({ description: 'Usage limit (total)', example: 100, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  usage_limit?: number;

  @ApiProperty({ description: 'Per user usage limit', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  user_limit?: number;

  @ApiProperty({ description: 'Start date (when coupon becomes active)', example: '2024-01-01T00:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  starts_at?: string;

  @ApiProperty({ description: 'Expiration date', example: '2024-12-31T23:59:59Z', required: false })
  @IsOptional()
  @IsDateString()
  expires_at?: string;

  @ApiProperty({ description: 'Minimum order amount to apply coupon', example: 50.00, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  min_amount?: number;

  @ApiProperty({ description: 'Maximum discount amount (for percentage coupons)', example: 100.00, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  max_discount?: number;

  @ApiProperty({ description: 'Coupon active status', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  is_active?: number;
}

