import { Module } from '@nestjs/common';
import { ValidationService } from './validation.service';
import { DatabaseHealthService } from './database-health.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ValidationService, DatabaseHealthService],
  exports: [ValidationService, DatabaseHealthService],
})
export class CommonModule {}
