import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty({ description: 'Order status', example: 'processing', required: false })
  @IsOptional()
  @IsString()
  @IsEnum(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
  status?: string;

  @ApiProperty({ description: 'Payment status', example: 'paid', required: false })
  @IsOptional()
  @IsString()
  @IsEnum(['pending', 'paid', 'failed', 'refunded'])
  payment_status?: string;

  @ApiProperty({ description: 'Shipping address', required: false })
  @IsOptional()
  shipping_address?: any;
}
