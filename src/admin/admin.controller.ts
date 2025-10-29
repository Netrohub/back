import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators';

@ApiTags('admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiBearerAuth()
export class AdminController {
  constructor(private adminService: AdminService) {}

  // Users Management
  @Get('users')
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  async getUsers(
    @Query('page') page: string = '1',
    @Query('per_page') perPage: string = '10',
    @Query('search') search?: string,
    @Query('role') role?: string,
    @Query('status') status?: string,
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const perPageNum = parseInt(perPage, 10) || 10;
    return this.adminService.getUsers(pageNum, perPageNum, search, role, status);
  }

  @Post('users')
  @ApiOperation({ summary: 'Create new user (Admin only)' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'Email or username already exists' })
  async createUser(@Body() createUserDto: any) {
    return this.adminService.createUser(createUserDto);
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
    @Query('page') page: string = '1',
    @Query('per_page') perPage: string = '10',
    @Query('status') status?: string,
    @Query('date_from') dateFrom?: string,
    @Query('date_to') dateTo?: string,
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const perPageNum = parseInt(perPage, 10) || 10;
    return this.adminService.getOrders(pageNum, perPageNum, status, dateFrom, dateTo);
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
    @Query('page') page: string = '1',
    @Query('per_page') perPage: string = '10',
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const perPageNum = parseInt(perPage, 10) || 10;
    return this.adminService.getVendors(pageNum, perPageNum, search, status);
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
    @Query('page') page: string = '1',
    @Query('per_page') perPage: string = '10',
    @Query('status') status?: string,
    @Query('category') category?: string,
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const perPageNum = parseInt(perPage, 10) || 10;
    return this.adminService.getListings(pageNum, perPageNum, status, category);
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
    @Query('page') page: string = '1',
    @Query('per_page') perPage: string = '10',
    @Query('status') status?: string,
    @Query('date_from') dateFrom?: string,
    @Query('date_to') dateTo?: string,
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const perPageNum = parseInt(perPage, 10) || 10;
    return this.adminService.getPayouts(pageNum, perPageNum, status, dateFrom, dateTo);
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

  // Products Management
  @Get('products')
  @ApiOperation({ summary: 'Get all products (Admin only)' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  async getProducts(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '25',
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('category') category?: string,
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 25;
    return this.adminService.getProducts(pageNum, limitNum, search, status, category);
  }

  @Get('products/:id')
  @ApiOperation({ summary: 'Get product by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
  async getProduct(@Param('id') id: number) {
    return this.adminService.getProduct(id);
  }

  @Put('products/:id/status')
  @ApiOperation({ summary: 'Update product status (Admin only)' })
  @ApiResponse({ status: 200, description: 'Product status updated successfully' })
  async updateProductStatus(@Param('id') id: number, @Body() statusData: { status: string }) {
    return this.adminService.updateProductStatus(id, statusData.status);
  }

  @Delete('products/:id')
  @ApiOperation({ summary: 'Delete product (Admin only)' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  async deleteProduct(@Param('id') id: number) {
    return this.adminService.deleteProduct(id);
  }

  // Disputes Management
  @Get('disputes')
  @ApiOperation({ summary: 'Get all disputes (Admin only)' })
  @ApiResponse({ status: 200, description: 'Disputes retrieved successfully' })
  async getDisputes(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '25',
    @Query('status') status?: string,
    @Query('priority') priority?: string,
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 25;
    return this.adminService.getDisputes(pageNum, limitNum, status, priority);
  }

  @Get('disputes/:id')
  @ApiOperation({ summary: 'Get dispute by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Dispute retrieved successfully' })
  async getDispute(@Param('id') id: number) {
    return this.adminService.getDispute(id);
  }

  @Put('disputes/:id/status')
  @ApiOperation({ summary: 'Update dispute status (Admin only)' })
  @ApiResponse({ status: 200, description: 'Dispute status updated successfully' })
  async updateDisputeStatus(@Param('id') id: number, @Body() statusData: { status: string; resolution?: string }) {
    return this.adminService.updateDisputeStatus(id, statusData.status, statusData.resolution);
  }

  @Post('disputes/:id/assign')
  @ApiOperation({ summary: 'Assign dispute to admin (Admin only)' })
  @ApiResponse({ status: 200, description: 'Dispute assigned successfully' })
  async assignDispute(@Param('id') id: number, @Body() assignData: { admin_id: number }) {
    return this.adminService.assignDispute(id, assignData.admin_id);
  }

  // Tickets Management
  @Get('tickets')
  @ApiOperation({ summary: 'Get all tickets (Admin only)' })
  @ApiResponse({ status: 200, description: 'Tickets retrieved successfully' })
  async getTickets(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '25',
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('search') search?: string,
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 25;
    return this.adminService.getTickets(pageNum, limitNum, status, priority, search);
  }

  @Get('tickets/:id')
  @ApiOperation({ summary: 'Get ticket by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Ticket retrieved successfully' })
  async getTicket(@Param('id') id: number) {
    return this.adminService.getTicket(id);
  }

  @Post('tickets')
  @ApiOperation({ summary: 'Create new ticket (Admin only)' })
  @ApiResponse({ status: 201, description: 'Ticket created successfully' })
  async createTicket(@Body() createTicketDto: any) {
    return this.adminService.createTicket(createTicketDto);
  }

  @Patch('tickets/:id')
  @ApiOperation({ summary: 'Update ticket (Admin only)' })
  @ApiResponse({ status: 200, description: 'Ticket updated successfully' })
  async updateTicket(@Param('id') id: number, @Body() updateData: any) {
    return this.adminService.updateTicket(id, updateData);
  }

  @Delete('tickets/:id')
  @ApiOperation({ summary: 'Delete ticket (Admin only)' })
  @ApiResponse({ status: 200, description: 'Ticket deleted successfully' })
  async deleteTicket(@Param('id') id: number) {
    return this.adminService.deleteTicket(id);
  }

  // Audit Logs Management
  @Get('audit-logs')
  @ApiOperation({ summary: 'Get all audit logs (Admin only)' })
  @ApiResponse({ status: 200, description: 'Audit logs retrieved successfully' })
  async getAuditLogs(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '50',
    @Query('search') search?: string,
    @Query('action') action?: string,
    @Query('entity_type') entityType?: string,
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 50;
    return this.adminService.getAuditLogs(pageNum, limitNum, search, action, entityType);
  }

  @Get('audit-logs/export')
  @ApiOperation({ summary: 'Export audit logs (Admin only)' })
  @ApiResponse({ status: 200, description: 'Audit logs exported successfully' })
  async exportAuditLogs(
    @Query('start_date') startDate?: string,
    @Query('end_date') endDate?: string,
  ) {
    return this.adminService.exportAuditLogs(startDate, endDate);
  }

  // Coupons Management
  @Get('coupons')
  @ApiOperation({ summary: 'Get all coupons (Admin only)' })
  @ApiResponse({ status: 200, description: 'Coupons retrieved successfully' })
  async getCoupons(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '25',
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 25;
    return this.adminService.getCoupons(pageNum, limitNum, search, status);
  }

  @Get('coupons/:id')
  @ApiOperation({ summary: 'Get coupon by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Coupon retrieved successfully' })
  async getCoupon(@Param('id') id: number) {
    return this.adminService.getCoupon(id);
  }

  @Post('coupons')
  @ApiOperation({ summary: 'Create new coupon (Admin only)' })
  @ApiResponse({ status: 201, description: 'Coupon created successfully' })
  async createCoupon(@Body() createCouponDto: any) {
    return this.adminService.createCoupon(createCouponDto);
  }

  @Patch('coupons/:id')
  @ApiOperation({ summary: 'Update coupon (Admin only)' })
  @ApiResponse({ status: 200, description: 'Coupon updated successfully' })
  async updateCoupon(@Param('id') id: number, @Body() updateData: any) {
    return this.adminService.updateCoupon(id, updateData);
  }

  @Delete('coupons/:id')
  @ApiOperation({ summary: 'Delete coupon (Admin only)' })
  @ApiResponse({ status: 200, description: 'Coupon deleted successfully' })
  async deleteCoupon(@Param('id') id: number) {
    return this.adminService.deleteCoupon(id);
  }

  // Dashboard Stats
  @Get('dashboard/stats')
  @ApiOperation({ summary: 'Get admin dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Dashboard stats retrieved successfully' })
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }
}