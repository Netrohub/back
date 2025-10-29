import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/**
 * Custom validator that accepts either email or username format
 * Email: standard email format (e.g., user@example.com)
 * Username: alphanumeric with optional underscore/dash, 3-30 chars
 */
export function IsEmailOrUsername(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isEmailOrUsername',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }

          // Email regex pattern
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          
          // Username regex pattern: 3-30 chars, alphanumeric, underscore, or dash
          const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/;

          // Check if it matches either email or username format
          return emailRegex.test(value) || usernameRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Value must be a valid email address or username (3-30 alphanumeric characters with optional _ or -)';
        },
      },
    });
  };
}

