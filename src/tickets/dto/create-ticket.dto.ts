import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty({ description: 'Ticket subject', example: 'Unable to login' })
  @IsNotEmpty()
  @IsString()
  subject: string;

  @ApiProperty({ description: 'Ticket message', example: 'I am unable to login to my account' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiPropertyOptional({ description: 'Ticket priority', example: 'high', enum: ['low', 'medium', 'high', 'urgent'] })
  @IsOptional()
  @IsString()
  priority?: string;

  @ApiPropertyOptional({ description: 'Ticket category', example: 'technical', enum: ['support', 'technical', 'billing', 'general'] })
  @IsOptional()
  @IsString()
  category?: string;
}
