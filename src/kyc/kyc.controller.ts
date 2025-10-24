import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { KycService } from './kyc.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators';

@ApiTags('kyc')
@Controller('kyc')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class KycController {
  constructor(private kycService: KycService) {}

  @Get('status')
  @ApiOperation({ summary: 'Get KYC status' })
  @ApiResponse({ status: 200, description: 'KYC status retrieved successfully' })
  async getKycStatus(@CurrentUser() user: any) {
    return this.kycService.getKycStatus(user.id);
  }

  @Post(':step')
  @ApiOperation({ summary: 'Submit KYC document for specific step' })
  @ApiResponse({ status: 200, description: 'Document submitted successfully' })
  async submitKycDocument(
    @CurrentUser() user: any,
    @Param('step') step: string,
    @Body() documentData: any,
  ) {
    return this.kycService.submitKycDocument(user.id, step, documentData);
  }

  @Post('complete')
  @ApiOperation({ summary: 'Complete KYC process' })
  @ApiResponse({ status: 200, description: 'KYC completed successfully' })
  async completeKyc(@CurrentUser() user: any) {
    return this.kycService.completeKyc(user.id);
  }

  @Post('verify-phone')
  @ApiOperation({ summary: 'Verify phone number' })
  @ApiResponse({ status: 200, description: 'Phone verified successfully' })
  async verifyPhone(
    @CurrentUser() user: any,
    @Body() verifyPhoneDto: { phone: string; code: string },
  ) {
    return this.kycService.verifyPhone(user.id, verifyPhoneDto.phone, verifyPhoneDto.code);
  }
}
