import { IsNotEmpty, IsString, IsEnum, IsOptional, IsNumber, IsDateString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCouponDto {
  @ApiProperty({ description: 'Coupon code', example: 'SUMMER2024' })
  @IsString()
  @IsNotEmpty({ message: 'Coupon code is required' })
  code: string;

  @ApiProperty({ description: 'Coupon name', example: 'Summer Sale 2024' })
  @IsString()
  @IsNotEmpty({ message: 'Coupon name is required' })
  name: string;

  @ApiProperty({ description: 'Coupon description', example: 'Get 10% off on all products', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Coupon type', enum: ['PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SHIPPING'], example: 'PERCENTAGE' })
  @IsEnum(['PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SHIPPING'], { message: 'Invalid coupon type' })
  @IsNotEmpty({ message: 'Coupon type is required' })
  type: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING';

  @ApiProperty({ description: 'Discount value', example: 10.00 })
  @IsNumber()
  @IsNotEmpty({ message: 'Discount value is required' })
  @Min(0, { message: 'Discount value must be positive' })
  value: number;

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

  @ApiProperty({ description: 'Start date (when coupon becomes active)', example: '2024-01-01T00:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  starts_at?: string;

  @ApiProperty({ description: 'Coupon active status', example: true, required: false })
  @IsOptional()
  @IsNumber() // Boolean converted to number
  is_active?: number;
}

