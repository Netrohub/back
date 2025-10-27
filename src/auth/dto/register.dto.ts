import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Username', example: 'johndoe' })
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(3, { message: 'Username must be at least 3 characters' })
  @Matches(/^[a-zA-Z0-9_\.]{3,20}$/, { message: 'Username can only contain letters, numbers, underscores, and dots (3-20 characters)' })
  username: string;

  @ApiProperty({ description: 'Full name', example: 'John Doe' })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ description: 'User email', example: 'user@example.com' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({ description: 'User password', example: 'password123' })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @ApiProperty({ description: 'Phone number', example: '+1234567890', required: false })
  @IsOptional()
  @IsString()
  phone?: string;
}
