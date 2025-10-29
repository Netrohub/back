import { Module, Global } from '@nestjs/common';
import { DatabaseHealthService } from './database-health.service';
import { PrismaSerializeInterceptor } from './interceptors/prisma-serialize.interceptor';
import { RequestIdInterceptor } from './interceptors/request-id.interceptor';
import { LoggerService } from './logger.service';

@Global()
@Module({
  providers: [
    LoggerService,
    DatabaseHealthService,
    PrismaSerializeInterceptor,
    RequestIdInterceptor,
  ],
  exports: [
    LoggerService,
    DatabaseHealthService,
    PrismaSerializeInterceptor,
    RequestIdInterceptor,
  ],
})
export class CommonModule {}
