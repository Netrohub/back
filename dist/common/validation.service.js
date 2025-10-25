"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationService = void 0;
const common_1 = require("@nestjs/common");
const validator = require("validator");
let ValidationService = class ValidationService {
    validateEmail(email) {
        if (!email || !validator.isEmail(email)) {
            throw new common_1.BadRequestException('Invalid email format');
        }
        return true;
    }
    validatePhone(phone) {
        if (!phone)
            return true;
        const cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length < 10 || cleanPhone.length > 15) {
            throw new common_1.BadRequestException('Invalid phone number format');
        }
        return true;
    }
    validatePassword(password) {
        if (!password || password.length < 8) {
            throw new common_1.BadRequestException('Password must be at least 8 characters long');
        }
        if (!/(?=.*[a-z])/.test(password)) {
            throw new common_1.BadRequestException('Password must contain at least one lowercase letter');
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            throw new common_1.BadRequestException('Password must contain at least one uppercase letter');
        }
        if (!/(?=.*\d)/.test(password)) {
            throw new common_1.BadRequestException('Password must contain at least one number');
        }
        if (!/(?=.*[@$!%*?&])/.test(password)) {
            throw new common_1.BadRequestException('Password must contain at least one special character');
        }
        return true;
    }
    validateName(name) {
        if (!name || name.trim().length < 2) {
            throw new common_1.BadRequestException('Name must be at least 2 characters long');
        }
        if (name.trim().length > 100) {
            throw new common_1.BadRequestException('Name must be less than 100 characters');
        }
        if (!/^[a-zA-Z\s\-'\.]+$/.test(name.trim())) {
            throw new common_1.BadRequestException('Name contains invalid characters');
        }
        return true;
    }
    validatePrice(price) {
        if (price < 0) {
            throw new common_1.BadRequestException('Price cannot be negative');
        }
        if (price > 999999.99) {
            throw new common_1.BadRequestException('Price cannot exceed $999,999.99');
        }
        return true;
    }
    validateQuantity(quantity) {
        if (!Number.isInteger(quantity) || quantity < 1) {
            throw new common_1.BadRequestException('Quantity must be a positive integer');
        }
        if (quantity > 1000) {
            throw new common_1.BadRequestException('Quantity cannot exceed 1000');
        }
        return true;
    }
    validateRole(role) {
        const validRoles = ['user', 'seller', 'admin', 'moderator', 'super_admin'];
        if (!validRoles.includes(role)) {
            throw new common_1.BadRequestException(`Invalid role. Must be one of: ${validRoles.join(', ')}`);
        }
        return true;
    }
    validateStatus(status, validStatuses) {
        if (!validStatuses.includes(status)) {
            throw new common_1.BadRequestException(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
        }
        return true;
    }
    sanitizeString(input, maxLength = 255) {
        if (!input)
            return '';
        return validator.escape(input.trim().substring(0, maxLength));
    }
    validateJsonData(data, requiredFields) {
        if (!data || typeof data !== 'object') {
            throw new common_1.BadRequestException('Invalid data format');
        }
        for (const field of requiredFields) {
            if (!(field in data)) {
                throw new common_1.BadRequestException(`Missing required field: ${field}`);
            }
        }
        return true;
    }
    validatePagination(page, limit) {
        const validPage = Math.max(1, Math.floor(page) || 1);
        const validLimit = Math.min(100, Math.max(1, Math.floor(limit) || 10));
        return { page: validPage, limit: validLimit };
    }
    validateDateRange(startDate, endDate) {
        if (startDate >= endDate) {
            throw new common_1.BadRequestException('Start date must be before end date');
        }
        const maxRange = 365 * 24 * 60 * 60 * 1000;
        if (endDate.getTime() - startDate.getTime() > maxRange) {
            throw new common_1.BadRequestException('Date range cannot exceed 1 year');
        }
        return true;
    }
    validateFileUpload(file, maxSize = 5 * 1024 * 1024) {
        if (!file) {
            throw new common_1.BadRequestException('No file provided');
        }
        if (file.size > maxSize) {
            throw new common_1.BadRequestException(`File size cannot exceed ${maxSize / (1024 * 1024)}MB`);
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
            throw new common_1.BadRequestException('Invalid file type');
        }
        return true;
    }
};
exports.ValidationService = ValidationService;
exports.ValidationService = ValidationService = __decorate([
    (0, common_1.Injectable)()
], ValidationService);
//# sourceMappingURL=validation.service.js.map