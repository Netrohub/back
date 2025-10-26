import {
  Controller,
  Get,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuditLogsService } from './audit-logs.service';
import { QueryAuditLogsDto } from './dto/query-audit-logs.dto';

@ApiTags('Audit Logs')
@Controller('audit-logs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all audit logs' })
  @ApiResponse({ status: 200, description: 'Audit logs retrieved successfully' })
  findAll(@Query() query: QueryAuditLogsDto) {
    return this.auditLogsService.findAll(query);
  }

  @Get('export')
  @ApiOperation({ summary: 'Export audit logs' })
  @ApiResponse({ status: 200, description: 'Audit logs exported successfully' })
  export(@Query() query: QueryAuditLogsDto) {
    return this.auditLogsService.export(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an audit log by ID' })
  @ApiResponse({ status: 200, description: 'Audit log retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Audit log not found' })
  findOne(@Param('id') id: string) {
    return this.auditLogsService.findOne(id);
  }
}
