import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserJWTPayload } from '../interfaces/user-jwt-payload.interface';
import { Request } from 'express';
import { IsAuthenticationConfig } from '@config';
import { extractTokenFromHeader } from '../utils';

/**
 * RT 를 사용한 JWT AT 재발급 전략
 */
@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    public readonly configService: ConfigService<IsAuthenticationConfig, true>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => extractTokenFromHeader(req),
      ]),
      ignoreExpiration: true, // 만료 여부 무시
      secretOrKey: configService.get('jwtPrivateKey'),
    });
  }

  /**
   * 만료 여부 제외 토큰의 유효성만 검증(위변조 여부)
   * @param payload UserJWTPayload
   * @returns UserRefreshJwtPayload, 리프레시 토큰이 쿠키에 존재하고 위변조되지 않은 만료된 엑세스 토큰이 포함된 경우
   * @returns null, 리프레시 토큰이 쿠키에 존재하지 않거나 엑세스 토큰이 위변조된 경우
   */
  validate(accessTokenPayload: UserJWTPayload): UserJWTPayload | null {
    return accessTokenPayload;
  }
}
