import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization;
    
    console.log('🔐 JWT AuthGuard triggered:', {
      url: request?.url,
      method: request?.method,
      hasToken: !!token,
      tokenPreview: token ? token.substring(0, 30) + '...' : 'none',
      allHeaders: request?.headers,
      rawHeaders: request?.rawHeaders
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
      console.error('❌ JWT AuthGuard: Authentication failed', {
        error: err,
        info: info?.message || info?.name || info
      });
      throw err || new Error(info?.message || 'Authentication failed');
    }
    
    console.log('✅ JWT AuthGuard: Authentication successful for user:', user.id);
    return user;
  }
}
