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
      return transformed;
    }

    return value;
  }
}
