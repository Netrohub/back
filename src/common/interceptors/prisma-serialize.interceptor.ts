import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PrismaSerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => this.transform(data)),
    );
  }

  private transform(value: any): any {
    if (value === null || value === undefined) {
      return value;
    }

    // Check if value is a Prisma Decimal object
    if (value && typeof value === 'object' && value.constructor && value.constructor.name === 'Decimal') {
      return Number(value);
    }

    // Handle arrays
    if (Array.isArray(value)) {
      return value.map((item) => this.transform(item));
    }

    // Handle objects
    if (typeof value === 'object') {
      const transformed: any = {};
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          transformed[key] = this.transform(value[key]);
        }
      }

      // ✅ Transform Product field: name -> title (for frontend compatibility)
      if ('name' in transformed && !('title' in transformed)) {
        transformed.title = transformed.name;
      }

      // ✅ Transform Order field: payment_status -> paymentStatus (camelCase for frontend)
      if ('payment_status' in transformed && !('paymentStatus' in transformed)) {
        transformed.paymentStatus = transformed.payment_status;
      }

      // ✅ Transform Category field: category_id -> categoryId (for frontend)
      if ('category_id' in transformed && typeof transformed.category_id === 'number') {
        transformed.categoryId = transformed.category_id;
      }

      return transformed;
    }

    return value;
  }
}
