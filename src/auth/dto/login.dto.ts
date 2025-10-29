import { IsNotEmpty, IsString, MinLength, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmailOrUsername } from './custom-validators';

export class LoginDto {
  @ApiProperty({ description: 'User email or username', example: 'user@example.com' })
  @IsNotEmpty({ message: 'Email or username is required' })
  @IsString()
  @IsEmailOrUsername({ message: 'Must be a valid email address or username (3-30 alphanumeric characters)' })
  email: string; // Backend accepts email or username, frontend passes identifier here

  @ApiProperty({ description: 'User password', example: 'password123' })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @ApiProperty({ description: 'Remember me', example: false, required: false })
  @IsOptional()
  @IsBoolean()
  remember?: boolean;
}
