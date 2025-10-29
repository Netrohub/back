import { Injectable, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailService implements OnModuleInit {
  private transporter: nodemailer.Transporter;
  private verificationTemplate: string;
  private passwordResetTemplate: string;

  onModuleInit() {
    // Initialize transporter after module is ready and env vars are loaded
    const port = parseInt(process.env.SMTP_PORT || '587');
    const isSecure = port === 465; // Port 465 uses SSL
    
    // Debug logging for SMTP configuration (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Initializing SMTP with configuration:');
      console.log('  Host:', process.env.SMTP_HOST || 'smtp.hostinger.com');
      console.log('  Port:', port);
      console.log('  Secure (SSL):', isSecure);
      console.log('  User:', process.env.SMTP_USER ? process.env.SMTP_USER.substring(0, 3) + '***' : 'NOT SET');
      console.log('  Password:', process.env.SMTP_PASS ? '***' : 'NOT SET');
    }
    
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: port,
      secure: isSecure, // true for 465 (SSL), false for 587 (TLS)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        // Do not fail on invalid certificates (useful for some hosting providers)
        rejectUnauthorized: false
      },
      debug: true, // Enable debug logging
      logger: true  // Enable console logging
    });

    // Load email templates
    const verificationTemplatePath = path.join(__dirname, 'templates', 'verification-email.html');
    const passwordResetTemplatePath = path.join(__dirname, 'templates', 'password-reset.html');
    
    try {
      this.verificationTemplate = fs.readFileSync(verificationTemplatePath, 'utf8');
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Email verification template loaded');
      }
    } catch (error) {
      this.verificationTemplate = null;
    }
    
    try {
      this.passwordResetTemplate = fs.readFileSync(passwordResetTemplatePath, 'utf8');
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Password reset template loaded');
      }
    } catch (error) {
      this.passwordResetTemplate = null;
    }

    // Verify configuration
    this.transporter.verify((error, success) => {
      if (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ SMTP configuration error:', error);
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ SMTP server is ready to send emails');
        }
      }
    });
  }

  async sendVerificationEmail(email: string, code: string): Promise<void> {
    try {
      // Use template if available, otherwise use inline HTML
      let htmlContent: string;
      
      if (this.verificationTemplate) {
        // Replace template variables
        htmlContent = this.verificationTemplate
          .replace(/{{CODE}}/g, code)
          .replace(/{{YEAR}}/g, new Date().getFullYear().toString());
      } else {
        // Fallback inline template
        htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; margin-bottom: 20px;">
                <h1 style="color: white; margin: 0; text-align: center;">NXOLand</h1>
              </div>
              
              <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; border: 1px solid #e0e0e0;">
                <h2 style="color: #333; margin-top: 0;">Email Verification</h2>
                <p>Thank you for signing up with NXOLand! To complete your account verification, please use the verification code below:</p>
                
                <div style="background: white; border: 2px dashed #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
                  <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #667eea; margin: 0;">${code}</p>
                </div>
                
                <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes. If you didn't request this code, please ignore this email.</p>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                  <p style="color: #999; font-size: 12px; margin: 0;">Need help? Contact us at support@nxoland.com</p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
                <p>&copy; ${new Date().getFullYear()} NXOLand. All rights reserved.</p>
              </div>
            </body>
          </html>
        `;
      }

      const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@nxoland.com',
        to: email,
        subject: 'Verify Your Email - NXOLand',
        html: htmlContent,
      };

      if (process.env.NODE_ENV === 'development') {
        console.log('📧 Attempting to send verification email to:', email);
      }

      const info = await this.transporter.sendMail(mailOptions);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Error sending email:', error);
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          responseCode: error.responseCode,
          response: error.response,
        });
      }
      
      // Provide more specific error messages
      if (error.code === 'EAUTH') {
        throw new Error('SMTP authentication failed. Please check your credentials.');
      } else if (error.code === 'ETIMEDOUT') {
        throw new Error('SMTP connection timeout. Please check your network settings.');
      } else if (error.responseCode === 550) {
        throw new Error('Invalid recipient email address.');
      } else {
        throw new Error(`Failed to send verification email: ${error.message}`);
      }
    }
  }

  async sendPasswordResetEmail(email: string, resetToken: string, frontendUrl?: string): Promise<void> {
    try {
      // Construct reset URL
      const baseUrl = frontendUrl || process.env.FRONTEND_URL || 'https://www.nxoland.com';
      const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;
      
      // Use template if available, otherwise use inline HTML
      let htmlContent: string;
      
      if (this.passwordResetTemplate) {
        // Replace template variables
        htmlContent = this.passwordResetTemplate
          .replace(/{{RESET_URL}}/g, resetUrl)
          .replace(/{{YEAR}}/g, new Date().getFullYear().toString());
      } else {
        // Fallback inline template
        htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; margin-bottom: 20px;">
                <h1 style="color: white; margin: 0; text-align: center;">NXOLand</h1>
              </div>
              
              <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; border: 1px solid #e0e0e0;">
                <h2 style="color: #333; margin-top: 0;">Password Reset Request</h2>
                <p>You requested to reset your password for your NXOLand account. Click the link below to reset your password:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${resetUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">Reset Password</a>
                </div>
                
                <p style="color: #666; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
                <p style="color: #667eea; font-size: 14px; word-break: break-all;">${resetUrl}</p>
                
                <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 30px 0; border-radius: 4px;">
                  <p style="margin: 0; color: #856404; font-size: 14px;">
                    <strong>⚠️ Security Notice:</strong> This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.
                  </p>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                  <p style="color: #999; font-size: 12px; margin: 0;">Need help? Contact us at support@nxoland.com</p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
                <p>&copy; ${new Date().getFullYear()} NXOLand. All rights reserved.</p>
              </div>
            </body>
          </html>
        `;
      }

      const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@nxoland.com',
        to: email,
        subject: 'Reset Your Password - NXOLand',
        html: htmlContent,
      };

      const info = await this.transporter.sendMail(mailOptions);
    } catch (error) {
      // Log error but don't throw - password reset token is already saved
      // This allows the reset flow to continue even if email fails
      throw new Error(`Failed to send password reset email: ${error.message}`);
    }
  }
}
