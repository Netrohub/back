import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DatabaseHealthService } from '../common/database-health.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private databaseHealthService: DatabaseHealthService) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  async check() {
    // Check database connectivity
    const dbConnected = await this.databaseHealthService.checkConnection();
    
    return {
      status: dbConnected ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      service: 'nxoland-backend',
      version: '1.0.0',
      database: dbConnected ? 'connected' : 'disconnected',
    };
  }

  @Get('database')
  @ApiOperation({ summary: 'Database health check' })
  @ApiResponse({ status: 200, description: 'Database health status' })
  async checkDatabase() {
    const [connection, stats, integrity] = await Promise.all([
      this.databaseHealthService.checkConnection(),
      this.databaseHealthService.getDatabaseStats(),
      this.databaseHealthService.checkDataIntegrity(),
    ]);

    return {
      connection,
      stats,
      integrity,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Admin health check' })
  @ApiResponse({ status: 200, description: 'Admin health status' })
  async adminHealthCheck() {
    const [connection, stats, integrity, optimization] = await Promise.all([
      this.databaseHealthService.checkConnection(),
      this.databaseHealthService.getDatabaseStats(),
      this.databaseHealthService.checkDataIntegrity(),
      this.databaseHealthService.optimizeDatabase(),
    ]);

    return {
      connection,
      stats,
      integrity,
      optimization,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('cleanup')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Cleanup orphaned data' })
  @ApiResponse({ status: 200, description: 'Cleanup completed' })
  async cleanupOrphanedData() {
    const results = await this.databaseHealthService.cleanupOrphanedData();
    return {
      results,
      message: 'Orphaned data cleanup completed',
      timestamp: new Date().toISOString(),
    };
  }
}
