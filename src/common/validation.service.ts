import { Injectable, BadRequestException } from '@nestjs/common';
import * as validator from 'validator';

@Injectable()
export class ValidationService {
  // Email validation
  validateEmail(email: string): boolean {
    if (!email || !validator.isEmail(email)) {
      throw new BadRequestException('Invalid email format');
    }
    return true;
  }

  // Phone validation
  validatePhone(phone: string): boolean {
    if (!phone) return true; // Phone is optional
    
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      throw new BadRequestException('Invalid phone number format');
    }
    return true;
  }

  // Password validation
  validatePassword(password: string): boolean {
    if (!password || password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters long');
    }

    if (!/(?=.*[a-z])/.test(password)) {
      throw new BadRequestException('Password must contain at least one lowercase letter');
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      throw new BadRequestException('Password must contain at least one uppercase letter');
    }

    if (!/(?=.*\d)/.test(password)) {
      throw new BadRequestException('Password must contain at least one number');
    }

    if (!/(?=.*[@$!%*?&])/.test(password)) {
      throw new BadRequestException('Password must contain at least one special character');
    }

    return true;
  }

  // Name validation
  validateName(name: string): boolean {
    if (!name || name.trim().length < 2) {
      throw new BadRequestException('Name must be at least 2 characters long');
    }

    if (name.trim().length > 100) {
      throw new BadRequestException('Name must be less than 100 characters');
    }

    if (!/^[a-zA-Z\s\-'\.]+$/.test(name.trim())) {
      throw new BadRequestException('Name contains invalid characters');
    }

    return true;
  }

  // Price validation
  validatePrice(price: number): boolean {
    if (price < 0) {
      throw new BadRequestException('Price cannot be negative');
    }

    if (price > 999999.99) {
      throw new BadRequestException('Price cannot exceed $999,999.99');
    }

    return true;
  }

  // Quantity validation
  validateQuantity(quantity: number): boolean {
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new BadRequestException('Quantity must be a positive integer');
    }

    if (quantity > 1000) {
      throw new BadRequestException('Quantity cannot exceed 1000');
    }

    return true;
  }

  // Role validation
  validateRole(role: string): boolean {
    const validRoles = ['user', 'seller', 'admin', 'moderator', 'super_admin'];
    
    if (!validRoles.includes(role)) {
      throw new BadRequestException(`Invalid role. Must be one of: ${validRoles.join(', ')}`);
    }

    return true;
  }

  // Status validation
  validateStatus(status: string, validStatuses: string[]): boolean {
    if (!validStatuses.includes(status)) {
      throw new BadRequestException(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    return true;
  }

  // Sanitize string input
  sanitizeString(input: string, maxLength: number = 255): string {
    if (!input) return '';
    
    return validator.escape(input.trim().substring(0, maxLength));
  }

  // Validate JSON data
  validateJsonData(data: any, requiredFields: string[]): boolean {
    if (!data || typeof data !== 'object') {
      throw new BadRequestException('Invalid data format');
    }

    for (const field of requiredFields) {
      if (!(field in data)) {
        throw new BadRequestException(`Missing required field: ${field}`);
      }
    }

    return true;
  }

  // Validate pagination parameters
  validatePagination(page: number, limit: number): { page: number; limit: number } {
    const validPage = Math.max(1, Math.floor(page) || 1);
    const validLimit = Math.min(100, Math.max(1, Math.floor(limit) || 10));

    return { page: validPage, limit: validLimit };
  }

  // Validate date range
  validateDateRange(startDate: Date, endDate: Date): boolean {
    if (startDate >= endDate) {
      throw new BadRequestException('Start date must be before end date');
    }

    const maxRange = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds
    if (endDate.getTime() - startDate.getTime() > maxRange) {
      throw new BadRequestException('Date range cannot exceed 1 year');
    }

    return true;
  }

  // Validate file upload
  validateFileUpload(file: Express.Multer.File, maxSize: number = 5 * 1024 * 1024): boolean {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (file.size > maxSize) {
      throw new BadRequestException(`File size cannot exceed ${maxSize / (1024 * 1024)}MB`);
    }

    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'text/plain',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }

    return true;
  }
}
