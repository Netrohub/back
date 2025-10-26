import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class KycService {
  constructor(private prisma: PrismaService) {}

  async handlePersonaCallback(data: any) {
    console.log('🔍 Processing Persona callback:', data);
    
    try {
      // Extract inquiry information
      const inquiryId = data?.inquiry?.id;
      const status = data?.inquiry?.status;
      const userId = data?.metadata?.userId; // You should pass userId in metadata when creating inquiry
      
      console.log(`📋 Inquiry ${inquiryId} status: ${status}`);
      
      // Convert userId to number if it's a string
      const userIdNum = userId ? parseInt(String(userId), 10) : null;
      
      // Find user by inquiry ID or other identifier
      // For now, we'll need to store the mapping between inquiry and user
      // This should be done when the inquiry is created
      
      // Example: Find user by stored inquiry ID
      // Note: This assumes we store the inquiry ID in the user's metadata or create a separate mapping
      // For now, we'll skip finding the user by inquiry ID and use metadata instead
      const user = userIdNum ? await this.prisma.user.findUnique({
        where: { id: userIdNum },
      }) : null;
      
      if (!user) {
        console.warn('⚠️ User not found for inquiry:', inquiryId);
        return;
      }
      
      // Update KYC status based on Persona result
      if (status === 'passed') {
        const currentStatus = user.kyc_status as any || {};
        const updatedStatus = {
          ...currentStatus,
          identity: true,
          persona_inquiry_id: inquiryId,
          persona_verified_at: new Date().toISOString(),
        };
        
        await this.prisma.user.update({
          where: { id: user.id },
          data: {
            kyc_status: updatedStatus,
            kyc_verified: true,
          },
        });
        
        console.log(`✅ User ${user.id} KYC verified via Persona`);
      } else if (status === 'failed') {
        console.log(`❌ User ${user.id} KYC failed verification`);
        // Handle failure case
      }
      
      return { success: true };
    } catch (error) {
      console.error('❌ Error handling Persona callback:', error);
      throw error;
    }
  }

  async getKycStatus(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        kyc_status: true,
        kyc_documents: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      status: user.kyc_status,
      documents: user.kyc_documents,
    };
  }

  async submitKycDocument(userId: number, step: string, documentData: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update KYC status based on step
    const currentStatus = user.kyc_status as any || {};
    const updatedStatus = {
      ...currentStatus,
      [step]: true,
    };

    // Update documents
    const currentDocuments = user.kyc_documents as any || {};
    const updatedDocuments = {
      ...currentDocuments,
      [step]: documentData,
    };

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        kyc_status: updatedStatus,
        kyc_documents: updatedDocuments,
      },
    });
  }

  async completeKyc(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if all KYC steps are completed
    const kycStatus = user.kyc_status as any;
    const allStepsCompleted = kycStatus?.email && kycStatus?.phone && kycStatus?.identity;

    if (!allStepsCompleted) {
      throw new Error('All KYC steps must be completed before final submission');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        kyc_verified: true,
        kyc_completed_at: new Date(),
      },
    });
  }

  async verifyPhone(userId: number, phone: string, code: string) {
    // In a real implementation, you would verify the code with your SMS service
    // For now, we'll just update the phone number and mark as verified
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update phone and mark as verified
    const currentStatus = user.kyc_status as any || {};
    const updatedStatus = {
      ...currentStatus,
      phone: true,
    };

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        phone,
        kyc_status: updatedStatus,
      },
    });
  }
}
