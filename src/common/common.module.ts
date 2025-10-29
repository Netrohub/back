import { Module, Global } from '@nestjs/common';
import { DatabaseHealthService } from './database-health.service';
import { PrismaSerializeInterceptor } from './interceptors/prisma-serialize.interceptor';
import { RequestIdInterceptor } from './interceptors/request-id.interceptor';
import { LoggerService } from './logger.service';
import { ValidationService } from './validation.service';

@Global()
@Module({
  providers: [
    LoggerService,
    DatabaseHealthService,
    PrismaSerializeInterceptor,
    RequestIdInterceptor,
    ValidationService,
  ],
  exports: [
    LoggerService,
    DatabaseHealthService,
    PrismaSerializeInterceptor,
    RequestIdInterceptor,
    ValidationService,
  ],
})
export class CommonModule {}
