export declare class ValidationService {
    validateEmail(email: string): boolean;
    validatePhone(phone: string): boolean;
    validatePassword(password: string): boolean;
    validateName(name: string): boolean;
    validatePrice(price: number): boolean;
    validateQuantity(quantity: number): boolean;
    validateRole(role: string): boolean;
    validateStatus(status: string, validStatuses: string[]): boolean;
    sanitizeString(input: string, maxLength?: number): string;
    validateJsonData(data: any, requiredFields: string[]): boolean;
    validatePagination(page: number, limit: number): {
        page: number;
        limit: number;
    };
    validateDateRange(startDate: Date, endDate: Date): boolean;
    validateFileUpload(file: Express.Multer.File, maxSize?: number): boolean;
}
