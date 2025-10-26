import { Injectable, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailService implements OnModuleInit {
  private transporter: nodemailer.Transporter;
  private verificationTemplate: string;

  onModuleInit() {
    // Initialize transporter after module is ready and env vars are loaded
    const port = parseInt(process.env.SMTP_PORT || '587');
    const isSecure = port === 465; // Port 465 uses SSL
    
    // Debug logging for SMTP configuration
    console.log('📧 Initializing SMTP with configuration:');
    console.log('  Host:', process.env.SMTP_HOST || 'smtp.hostinger.com');
    console.log('  Port:', port);
    console.log('  Secure (SSL):', isSecure);
    console.log('  User:', process.env.SMTP_USER ? process.env.SMTP_USER.substring(0, 3) + '***' : 'NOT SET');
    console.log('  Password:', process.env.SMTP_PASS ? '***' : 'NOT SET');
    
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

    // Load email template
    const templatePath = path.join(__dirname, 'templates', 'verification-email.html');
    try {
      this.verificationTemplate = fs.readFileSync(templatePath, 'utf8');
      console.log('✅ Email template loaded successfully');
    } catch (error) {
      console.error('⚠️ Could not load email template, using inline template');
      this.verificationTemplate = null;
    }

    // Verify configuration
    this.transporter.verify((error, success) => {
      if (error) {
        console.error('❌ SMTP configuration error:', error);
      } else {
        console.log('✅ SMTP server is ready to send emails');
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

      console.log('📧 Attempting to send email to:', email);
      console.log('🔧 SMTP Config:', {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER ? process.env.SMTP_USER.substring(0, 3) + '***' : 'NOT SET',
      });

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Verification email sent to ${email}`, info.messageId);
    } catch (error) {
      console.error('❌ Error sending email:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        responseCode: error.responseCode,
        response: error.response,
      });
      
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
}
