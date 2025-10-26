import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
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
    console.log('🔐 JWT Strategy validate called with payload:', {
      sub: payload.sub,
      email: payload.email,
      iat: payload.iat,
      exp: payload.exp
    });
    
    const user = await this.authService.getCurrentUser(payload.sub);
    
    if (!user) {
      console.error('❌ JWT Strategy: User not found for id:', payload.sub);
      throw new UnauthorizedException('User not found');
    }
    
    console.log('✅ JWT Strategy: User validated successfully:', user.id, user.email);
    return user;
  }
}
