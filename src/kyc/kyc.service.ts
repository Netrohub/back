import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class KycService {
  constructor(private prisma: PrismaService) {}

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
