import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SellerService } from './seller.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators';
import { CurrentUser } from '../auth/decorators';

@ApiTags('seller')
@Controller('seller')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('seller', 'admin')
@ApiBearerAuth()
export class SellerController {
  constructor(private sellerService: SellerService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get seller dashboard' })
  @ApiResponse({ status: 200, description: 'Dashboard data retrieved successfully' })
  async getSellerDashboard(@CurrentUser() user: any) {
    return this.sellerService.getSellerDashboard(user.id);
  }

  @Get('products')
  @ApiOperation({ summary: 'Get seller products' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  async getSellerProducts(@CurrentUser() user: any) {
    return this.sellerService.getSellerProducts(user.id);
  }

  @Get('orders')
  @ApiOperation({ summary: 'Get seller orders' })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
  async getSellerOrders(@CurrentUser() user: any) {
    return this.sellerService.getSellerOrders(user.id);
  }

  @Get('payouts')
  @ApiOperation({ summary: 'Get seller payouts' })
  @ApiResponse({ status: 200, description: 'Payouts retrieved successfully' })
  async getSellerPayouts(@CurrentUser() user: any) {
    return this.sellerService.getSellerPayouts(user.id);
  }

  @Get('notifications')
  @ApiOperation({ summary: 'Get seller notifications' })
  @ApiResponse({ status: 200, description: 'Notifications retrieved successfully' })
  async getSellerNotifications(@CurrentUser() user: any) {
    return this.sellerService.getSellerNotifications(user.id);
  }
}
