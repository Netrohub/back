import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators';
import { CreateAdminDto, AssignRoleDto } from '../types';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  // Create new admin
  @Post('create')
  async createAdmin(@Body() createAdminDto: CreateAdminDto, @Request() req) {
    return this.adminService.createAdmin(createAdminDto, req.user.id);
  }

  // Assign role to user
  @Put('users/:id/assign-role')
  async assignRole(
    @Param('id', ParseIntPipe) userId: number,
    @Body() assignRoleDto: AssignRoleDto,
    @Request() req,
  ) {
    return this.adminService.assignRole(userId, assignRoleDto, req.user.id);
  }

  // Remove role from user
  @Delete('users/:id/roles/:role')
  async removeRole(
    @Param('id', ParseIntPipe) userId: number,
    @Param('role') role: string,
    @Request() req,
  ) {
    return this.adminService.removeRole(userId, role, req.user.id);
  }

  // Get all users with pagination
  @Get('users')
  async getUsers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('role') role?: string,
  ) {
    return this.adminService.getUsers(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10,
      search,
      role,
    );
  }

  // Get admin statistics
  @Get('stats')
  async getAdminStats() {
    return this.adminService.getAdminStats();
  }

  // Get admin actions log
  @Get('actions')
  async getAdminActions(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('adminId') adminId?: string,
  ) {
    return this.adminService.getAdminActions(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10,
      adminId ? parseInt(adminId) : undefined,
    );
  }

  // Toggle user active status
  @Put('users/:id/toggle-status')
  async toggleUserStatus(
    @Param('id', ParseIntPipe) userId: number,
    @Body('isActive') isActive: boolean,
    @Request() req,
  ) {
    return this.adminService.toggleUserStatus(userId, isActive, req.user.id);
  }

  // Create admin invite
  @Post('invites')
  async createAdminInvite(
    @Body('email') email: string,
    @Body('role') role: string,
    @Request() req,
  ) {
    return this.adminService.createAdminInvite(email, role, req.user.id);
  }

  // Accept admin invite (public endpoint)
  @Post('invites/accept')
  async acceptAdminInvite(
    @Body('token') token: string,
    @Body('password') password: string,
    @Body('name') name: string,
  ) {
    return this.adminService.acceptAdminInvite(token, password, name);
  }
}
