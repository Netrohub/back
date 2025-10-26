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
        case 'inquiry.completed':
          console.log('✅ Inquiry completed:', data);
          // Update user KYC status based on inquiry result
          await this.kycService.handlePersonaCallback(data);
          break;
        
        case 'inquiry.approved':
          console.log('✅ Inquiry approved:', data);
          // Also update KYC status when approved
          await this.kycService.handlePersonaCallback(data);
          break;
        
        case 'inquiry.created':
          console.log('📝 Inquiry created:', data);
          break;
        
        case 'inquiry.started':
          console.log('▶️ Inquiry started:', data);
          break;
        
        case 'inquiry.declined':
          console.log('❌ Inquiry declined:', data);
          break;
        
        case 'inquiry.failed':
          console.log('❌ Inquiry failed:', data);
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

  @Post('send-email-verification')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Send email verification code' })
  @ApiResponse({ status: 200, description: 'Verification code sent successfully' })
  async sendEmailVerification(@CurrentUser() user: any) {
    return this.kycService.sendEmailVerification(user.id);
  }

  @Post('verify-email')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verify email with code' })
  @ApiResponse({ status: 200, description: 'Email verified successfully' })
  async verifyEmail(
    @CurrentUser() user: any,
    @Body() verifyEmailDto: { code: string },
  ) {
    return this.kycService.verifyEmail(user.id, verifyEmailDto.code);
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

  @Post('complete')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Complete KYC process' })
  @ApiResponse({ status: 200, description: 'KYC completed successfully' })
  async completeKyc(@CurrentUser() user: any) {
    return this.kycService.completeKyc(user.id);
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
}
