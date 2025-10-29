import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators';
import { LoggerService } from '../common/logger.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new LoggerService();

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization;
    
    // Log without exposing token (logger redacts it automatically)
    this.logger.debug('JWT AuthGuard triggered', 'JwtAuthGuard', {
      url: request?.url,
      method: request?.method,
      hasToken: !!token,
    });

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      this.logger.warn('JWT AuthGuard: Authentication failed', 'JwtAuthGuard', {
        error: err?.message,
        info: info?.message || info?.name || 'Unknown error',
      });
      throw err || new Error(info?.message || 'Authentication failed');
    }
    
    this.logger.debug('JWT AuthGuard: Authentication successful', 'JwtAuthGuard', {
      userId: user.id,
    });
    return user;
  }
}
