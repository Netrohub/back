import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class KycService {
  private readonly PERSONA_API_KEY = process.env.PERSONA_API_KEY || 'sk_test_3ef3be12-87af-444f-9c71-c7546ee971a5';
  private readonly PERSONA_TEMPLATE_ID = process.env.PERSONA_TEMPLATE_ID || 'itmpl_1bNZnx9mrbHZKKJsvJiN9BDDTuD6';

  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

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
        // Create or update identity verification record
        await this.prisma.kycVerification.upsert({
          where: {
            user_id_type: {
              user_id: user.id,
              type: 'IDENTITY'
            }
          },
          create: {
            user_id: user.id,
            type: 'IDENTITY',
            status: 'APPROVED',
            provider: 'persona',
            external_id: inquiryId,
            verified_at: new Date(),
          },
          update: {
            status: 'APPROVED',
            external_id: inquiryId,
            verified_at: new Date(),
          },
        });
        
        // Update user verification flags
        await this.prisma.user.update({
          where: { id: user.id },
          data: {
            identity_verified_at: new Date(),
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
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get all KYC verifications for this user
    const kycVerifications = await this.prisma.kycVerification.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' }
    });

    // Build status object from verifications
    const status = {
      identity: kycVerifications.some(v => v.type === 'IDENTITY' && v.status === 'APPROVED'),
      address: kycVerifications.some(v => v.type === 'ADDRESS' && v.status === 'APPROVED'),
      phone: kycVerifications.some(v => v.type === 'PHONE' && v.status === 'APPROVED'),
      email: kycVerifications.some(v => v.type === 'EMAIL' && v.status === 'APPROVED'),
    };

    return {
      status,
      verifications: kycVerifications,
      hasIdentityVerification: status.identity,
      kycStatus: status.identity ? 'verified' : 'pending'
    };
  }

  async submitKycDocument(userId: number, step: string, documentData: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Map step to KYC verification type
    const typeMapping = {
      'identity': 'IDENTITY',
      'address': 'ADDRESS', 
      'phone': 'PHONE',
      'email': 'EMAIL',
      'documents': 'IDENTITY' // fallback
    };

    const verificationType = typeMapping[step] || 'IDENTITY';

    // Create or update KYC verification record
    const kycVerification = await this.prisma.kycVerification.upsert({
      where: {
        user_id_type: {
          user_id: userId,
          type: verificationType
        }
      },
      create: {
        user_id: userId,
        type: verificationType,
        status: 'PENDING',
        data: documentData,
      },
      update: {
        status: 'PENDING',
        data: documentData,
        updated_at: new Date(),
      },
    });

    return kycVerification;
  }

  async completeKyc(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if all KYC steps are completed using the new table
    const kycVerifications = await this.prisma.kycVerification.findMany({
      where: { user_id: userId }
    });

    const hasIdentity = kycVerifications.some(v => v.type === 'IDENTITY' && v.status === 'APPROVED');
    const hasPhone = kycVerifications.some(v => v.type === 'PHONE' && v.status === 'APPROVED');
    const hasEmail = kycVerifications.some(v => v.type === 'EMAIL' && v.status === 'APPROVED');

    const allStepsCompleted = hasIdentity && hasPhone && hasEmail;

    if (!allStepsCompleted) {
      throw new Error('All KYC steps must be completed before final submission');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
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

    // Create phone verification record
    await this.prisma.kycVerification.upsert({
      where: {
        user_id_type: {
          user_id: userId,
          type: 'PHONE'
        }
      },
      create: {
        user_id: userId,
        type: 'PHONE',
        status: 'APPROVED',
        data: { phone, verificationCode: code },
        verified_at: new Date(),
      },
      update: {
        status: 'APPROVED',
        data: { phone, verificationCode: code },
        verified_at: new Date(),
      },
    });

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        phone,
        phone_verified_at: new Date(),
      },
    });
  }

  async createPersonaInquiry(userId: number) {
    try {
      console.log('🔍 Creating Persona inquiry for user:', userId);
      console.log('🔑 API Key full length:', this.PERSONA_API_KEY ? this.PERSONA_API_KEY.length : 0);
      console.log('🔑 API Key first 50 chars:', this.PERSONA_API_KEY ? this.PERSONA_API_KEY.substring(0, 50) : 'NOT SET');
      console.log('🔑 API Key last 10 chars:', this.PERSONA_API_KEY ? `...${this.PERSONA_API_KEY.substring(this.PERSONA_API_KEY.length - 10)}` : 'NOT SET');
      console.log('📋 Template ID:', this.PERSONA_TEMPLATE_ID);
      
      // Create Persona inquiry via API
      const response = await fetch('https://api.withpersona.com/api/v1/inquiries', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.PERSONA_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            type: 'inquiry',
            attributes: {
              template_id: this.PERSONA_TEMPLATE_ID,
              reference_id: `user_${userId}_${Date.now()}`,
              metadata: {
                userId: userId,
              },
            }
          }
        }),
      });

      const responseText = await response.text();
      console.log('📥 Persona API response status:', response.status);
      console.log('📥 Persona API response body:', responseText);

      if (!response.ok) {
        const error = JSON.parse(responseText);
        console.error('❌ Persona API error:', error);
        throw new Error(error.error?.message || 'Failed to create Persona inquiry');
      }

      const result = JSON.parse(responseText);
      console.log('✅ Persona inquiry created:', result.data);
      
      // Extract the inquiry ID and URL
      const inquiryId = result.data.id;
      const verificationUrl = result.data.attributes?.url;
      
      console.log('🔗 Verification URL:', verificationUrl);

      if (!verificationUrl) {
        // If no URL in response, construct it manually
        const constructedUrl = `https://inquiry.withpersona.com/verify/${inquiryId}`;
        console.log('🔗 Constructed URL:', constructedUrl);
        
        return {
          inquiryId,
          verificationUrl: constructedUrl,
        };
      }

      return {
        inquiryId,
        verificationUrl,
      };
    } catch (error) {
      console.error('❌ Error creating Persona inquiry:', error);
      throw error;
    }
  }

  async sendEmailVerification(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if email is already verified using email_verified_at
    if (user.email_verified_at) {
      return { message: 'Email already verified', alreadyVerified: true };
    }

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store verification code in KYC verification record
    await this.prisma.kycVerification.upsert({
      where: {
        user_id_type: {
          user_id: userId,
          type: 'EMAIL'
        }
      },
      create: {
        user_id: userId,
        type: 'EMAIL',
        status: 'PENDING',
        data: { 
          verificationCode: code, 
          expiresAt: expiryDate.toISOString(),
          email: user.email 
        },
      },
      update: {
        status: 'PENDING',
        data: { 
          verificationCode: code, 
          expiresAt: expiryDate.toISOString(),
          email: user.email 
        },
        updated_at: new Date(),
      },
    });

    // Send verification email
    await this.emailService.sendVerificationEmail(user.email, code);

    console.log(`✅ Verification code sent to ${user.email}`);

    return {
      message: 'Verification code sent to your email',
      expiresIn: 600, // 10 minutes in seconds
    };
  }

  async verifyEmail(userId: number, code: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if email is already verified
    if (user.email_verified_at) {
      return { message: 'Email already verified', verified: true };
    }

    // Get verification record from KYC table
    const emailVerification = await this.prisma.kycVerification.findUnique({
      where: {
        user_id_type: {
          user_id: userId,
          type: 'EMAIL'
        }
      }
    });

    if (!emailVerification) {
      throw new Error('No verification code found. Please request a new code.');
    }

    const verificationData = emailVerification.data as any;
    const storedCode = verificationData?.verificationCode;
    const codeExpiry = verificationData?.expiresAt;

    if (!storedCode) {
      throw new Error('No verification code found. Please request a new code.');
    }

    // Check if code has expired
    if (new Date(codeExpiry) < new Date()) {
      // Update verification record to mark as expired
      await this.prisma.kycVerification.update({
        where: {
          user_id_type: {
            user_id: userId,
            type: 'EMAIL'
          }
        },
        data: {
          status: 'EXPIRED',
        }
      });

      throw new Error('Verification code has expired. Please request a new code.');
    }

    // Verify the code
    if (storedCode !== code) {
      throw new Error('Invalid verification code. Please try again.');
    }
    // Update verification record to approved
    await this.prisma.kycVerification.update({
      where: {
        user_id_type: {
          user_id: userId,
          type: 'EMAIL'
        }
      },
      data: {
        status: 'APPROVED',
        verified_at: new Date(),
      }
    });

    // Update user email verification
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        email_verified_at: new Date(),
      },
    });

    console.log(`✅ Email verified for user ${userId}`);

    return {
      message: 'Email verified successfully',
      verified: true,
    };
  }
}
