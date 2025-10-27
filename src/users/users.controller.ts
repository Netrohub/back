import { Controller, Get, Put, Body, UseGuards, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser, Public } from '../auth/decorators';
import { UpdateUserDto, UpdatePasswordDto } from '../types';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved' })
  async getProfile(@CurrentUser() user: any) {
    return this.usersService.findById(user.id);
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  async updateProfile(
    @CurrentUser() user: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(user.id, updateUserDto);
  }

  @Put('me/password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({ status: 200, description: 'Password updated successfully' })
  async updatePassword(
    @CurrentUser() user: any,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(user.id, updatePasswordDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all public users / members list (filtered)' })
  @ApiResponse({ status: 200, description: 'Users list retrieved' })
  async getUsers(
    @Query('page') page?: number,
    @Query('per_page') perPage?: number,
    @Query('search') search?: string,
    @Query('role') role?: string,
  ) {
    return this.usersService.findAllPublic(page, perPage, search, role);
  }

  @Get('members')
  @Public()
  @ApiOperation({ summary: 'Get all members (public) - alias for /users' })
  @ApiResponse({ status: 200, description: 'Members list retrieved' })
  async getMembers() {
    return this.usersService.findAll();
  }

  @Get(':username')
  @Public()
  @ApiOperation({ summary: 'Get user profile by username (public)' })
  @ApiResponse({ status: 200, description: 'User profile retrieved' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Get(':username/listings')
  @Public()
  @ApiOperation({ summary: 'Get user listings/products by username (public)' })
  @ApiResponse({ status: 200, description: 'User listings retrieved' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserListings(@Param('username') username: string) {
    return this.usersService.getUserListings(username);
  }

  @Get(':username/reviews')
  @Public()
  @ApiOperation({ summary: 'Get user reviews by username (public)' })
  @ApiResponse({ status: 200, description: 'User reviews retrieved' })
  async getUserReviews(@Param('username') username: string) {
    return this.usersService.getUserReviews(username);
  }

}
