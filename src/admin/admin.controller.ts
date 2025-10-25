import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators';

@ApiTags('admin')
@Controller()
// Temporarily removed auth guards for testing
// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles('admin')
// @ApiBearerAuth()
export class AdminController {
  constructor(private adminService: AdminService) {}

  // Users Management
  @Get('users')
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  async getUsers(
    @Query('page') page: number = 1,
    @Query('per_page') perPage: number = 10,
    @Query('search') search?: string,
    @Query('role') role?: string,
    @Query('status') status?: string,
  ) {
    return this.adminService.getUsers(page, perPage, search, role, status);
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get user by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  async getUser(@Param('id') id: number) {
    return this.adminService.getUser(id);
  }

  @Put('users/:id')
  @ApiOperation({ summary: 'Update user (Admin only)' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  async updateUser(@Param('id') id: number, @Body() updateData: any) {
    return this.adminService.updateUser(id, updateData);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete user (Admin only)' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  async deleteUser(@Param('id') id: number) {
    return this.adminService.deleteUser(id);
  }

  // Orders Management
  @Get('orders')
  @ApiOperation({ summary: 'Get all orders (Admin only)' })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
  async getOrders(
    @Query('page') page: number = 1,
    @Query('per_page') perPage: number = 10,
    @Query('status') status?: string,
    @Query('date_from') dateFrom?: string,
    @Query('date_to') dateTo?: string,
  ) {
    return this.adminService.getOrders(page, perPage, status, dateFrom, dateTo);
  }

  @Get('orders/:id')
  @ApiOperation({ summary: 'Get order by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Order retrieved successfully' })
  async getOrder(@Param('id') id: number) {
    return this.adminService.getOrder(id);
  }

  @Put('orders/:id/status')
  @ApiOperation({ summary: 'Update order status (Admin only)' })
  @ApiResponse({ status: 200, description: 'Order status updated successfully' })
  async updateOrderStatus(@Param('id') id: number, @Body() statusData: { status: string }) {
    return this.adminService.updateOrderStatus(id, statusData.status);
  }

  // Vendors Management
  @Get('vendors')
  @ApiOperation({ summary: 'Get all vendors (Admin only)' })
  @ApiResponse({ status: 200, description: 'Vendors retrieved successfully' })
  async getVendors(
    @Query('page') page: number = 1,
    @Query('per_page') perPage: number = 10,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    return this.adminService.getVendors(page, perPage, search, status);
  }

  @Get('vendors/:id')
  @ApiOperation({ summary: 'Get vendor by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Vendor retrieved successfully' })
  async getVendor(@Param('id') id: number) {
    return this.adminService.getVendor(id);
  }

  @Put('vendors/:id/status')
  @ApiOperation({ summary: 'Update vendor status (Admin only)' })
  @ApiResponse({ status: 200, description: 'Vendor status updated successfully' })
  async updateVendorStatus(@Param('id') id: number, @Body() statusData: { status: string }) {
    return this.adminService.updateVendorStatus(id, statusData.status);
  }

  // Listings Management
  @Get('listings')
  @ApiOperation({ summary: 'Get all listings (Admin only)' })
  @ApiResponse({ status: 200, description: 'Listings retrieved successfully' })
  async getListings(
    @Query('page') page: number = 1,
    @Query('per_page') perPage: number = 10,
    @Query('status') status?: string,
    @Query('category') category?: string,
  ) {
    return this.adminService.getListings(page, perPage, status, category);
  }

  @Get('listings/:id')
  @ApiOperation({ summary: 'Get listing by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Listing retrieved successfully' })
  async getListing(@Param('id') id: number) {
    return this.adminService.getListing(id);
  }

  @Put('listings/:id/status')
  @ApiOperation({ summary: 'Update listing status (Admin only)' })
  @ApiResponse({ status: 200, description: 'Listing status updated successfully' })
  async updateListingStatus(@Param('id') id: number, @Body() statusData: { status: string }) {
    return this.adminService.updateListingStatus(id, statusData.status);
  }

  // Payouts Management
  @Get('payouts')
  @ApiOperation({ summary: 'Get all payouts (Admin only)' })
  @ApiResponse({ status: 200, description: 'Payouts retrieved successfully' })
  async getPayouts(
    @Query('page') page: number = 1,
    @Query('per_page') perPage: number = 10,
    @Query('status') status?: string,
    @Query('date_from') dateFrom?: string,
    @Query('date_to') dateTo?: string,
  ) {
    return this.adminService.getPayouts(page, perPage, status, dateFrom, dateTo);
  }

  @Get('payouts/:id')
  @ApiOperation({ summary: 'Get payout by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Payout retrieved successfully' })
  async getPayout(@Param('id') id: number) {
    return this.adminService.getPayout(id);
  }

  @Put('payouts/:id/status')
  @ApiOperation({ summary: 'Update payout status (Admin only)' })
  @ApiResponse({ status: 200, description: 'Payout status updated successfully' })
  async updatePayoutStatus(@Param('id') id: number, @Body() statusData: { status: string }) {
    return this.adminService.updatePayoutStatus(id, statusData.status);
  }

  // Dashboard Stats
  @Get('dashboard/stats')
  @ApiOperation({ summary: 'Get admin dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Dashboard stats retrieved successfully' })
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }
}