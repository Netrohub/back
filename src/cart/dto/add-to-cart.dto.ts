import { IsNumber, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
  @ApiProperty({ description: 'Product ID', example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: 'Product ID is required' })
  productId: string;

  @ApiProperty({ description: 'Quantity', example: 1 })
  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}
