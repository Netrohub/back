import { Controller, Get, Post, Put, Body, Param, UseGuards, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { KycService } from './kyc.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators';

@ApiTags('kyc')
@Controller('kyc')
export class KycController {
  constructor(private kycService: KycService) {}

  @Post('webhooks/persona')
  @ApiOperation({ summary: 'Persona webhook for verification callbacks' })
  @ApiResponse({ status: 200, description: 'Webhook processed successfully' })
  async handlePersonaWebhook(@Body() payload: any, @Headers() headers: any) {
    console.log('📥 Persona webhook received:', payload);
    
    // Verify webhook signature (optional but recommended)
    // const signature = headers['persona-signature'];
    
    try {
      // Handle different Persona webhook events
      const { type, data } = payload;
      
      switch (type) {
        case 'inquiry.finished':
          console.log('✅ Inquiry finished:', data);
          // Update user KYC status based on inquiry result
          await this.kycService.handlePersonaCallback(data);
          break;
        
        case 'inquiry.updated':
          console.log('📝 Inquiry updated:', data);
          break;
        
        default:
          console.log('ℹ️ Unhandled webhook type:', type);
      }
      
      return { success: true };
    } catch (error) {
      console.error('❌ Error processing Persona webhook:', error);
      return { success: false, error: error.message };
    }
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get KYC status' })
  @ApiResponse({ status: 200, description: 'KYC status retrieved successfully' })
  async getKycStatus(@CurrentUser() user: any) {
    return this.kycService.getKycStatus(user.id);
  }

  @Post(':step')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Complete KYC process' })
  @ApiResponse({ status: 200, description: 'KYC completed successfully' })
  async completeKyc(@CurrentUser() user: any) {
    return this.kycService.completeKyc(user.id);
  }

  @Post('verify-phone')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verify phone number' })
  @ApiResponse({ status: 200, description: 'Phone verified successfully' })
  async verifyPhone(
    @CurrentUser() user: any,
    @Body() verifyPhoneDto: { phone: string; code: string },
  ) {
    return this.kycService.verifyPhone(user.id, verifyPhoneDto.phone, verifyPhoneDto.code);
  }
}
