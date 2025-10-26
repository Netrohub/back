import { IsArray, IsNotEmpty, IsString, IsOptional, IsNumber, ValidateNested, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({ description: 'Product ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({ description: 'Quantity', example: 2 })
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ 
    description: 'Shipping address', 
    example: { 
      street: '123 Main St', 
      city: 'New York', 
      state: 'NY', 
      zip: '10001', 
      country: 'USA' 
    } 
  })
  @IsNotEmpty()
  shipping_address: any;

  @ApiProperty({ description: 'Payment method', example: 'stripe' })
  @IsString()
  @IsNotEmpty()
  payment_method: string;

  @ApiProperty({ description: 'Order items', type: [CreateOrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
