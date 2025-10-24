import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DisputesService } from './disputes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators';
import { CurrentUser } from '../auth/decorators';

@ApiTags('disputes')
@Controller('disputes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DisputesController {
  constructor(private disputesService: DisputesService) {}

  @Get()
  @ApiOperation({ summary: 'Get user disputes' })
  @ApiResponse({ status: 200, description: 'Disputes retrieved successfully' })
  async getDisputes(@CurrentUser() user: any) {
    return this.disputesService.getDisputes(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get dispute by ID' })
  @ApiResponse({ status: 200, description: 'Dispute retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Dispute not found' })
  async getDisputeById(@CurrentUser() user: any, @Param('id') id: string) {
    return this.disputesService.getDisputeById(+id, user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new dispute' })
  @ApiResponse({ status: 201, description: 'Dispute created successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async createDispute(
    @CurrentUser() user: any,
    @Body() createDisputeDto: { orderId: number; reason: string; description: string },
  ) {
    return this.disputesService.createDispute(
      user.id,
      createDisputeDto.orderId,
      createDisputeDto.reason,
      createDisputeDto.description,
    );
  }

  @Get('admin/all')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get all disputes (Admin only)' })
  @ApiResponse({ status: 200, description: 'All disputes retrieved successfully' })
  async getAdminDisputes() {
    return this.disputesService.getAdminDisputes();
  }

  @Put(':id/status')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update dispute status (Admin only)' })
  @ApiResponse({ status: 200, description: 'Dispute status updated successfully' })
  async updateDisputeStatus(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() updateStatusDto: { status: string },
  ) {
    return this.disputesService.updateDisputeStatus(+id, updateStatusDto.status, user.id);
  }
}
