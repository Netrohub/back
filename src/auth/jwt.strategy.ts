import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { LoggerService } from '../common/logger.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new LoggerService();

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    this.logger.debug('JWT Strategy validate called', 'JwtStrategy', {
      userId: payload.sub,
      email: payload.email,
    });
    
    const user = await this.authService.getCurrentUser(payload.sub);
    
    if (!user) {
      this.logger.warn('JWT Strategy: User not found', 'JwtStrategy', {
        userId: payload.sub,
      });
      throw new UnauthorizedException('User not found');
    }
    
    this.logger.debug('JWT Strategy: User validated successfully', 'JwtStrategy', {
      userId: user.id,
    });
    return user;
  }
}
