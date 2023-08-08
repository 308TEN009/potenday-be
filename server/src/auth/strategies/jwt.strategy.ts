import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { IsAuthenticationConfig } from '@config';
import { AuthInjector } from '../common';
import { BlackListService, UserJWTPayload } from '../interfaces';
import { extractTokenFromHeader } from '../utils';

/**
 * JWT 토큰을 사용한 요청 권한 인가 전략
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    public readonly configService: ConfigService<IsAuthenticationConfig, true>,
    @Inject(AuthInjector.BLACK_LIST_SERVICE)
    private readonly blackListService: BlackListService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => extractTokenFromHeader(req),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwtPrivateKey'),
    });
  }

  async validate(payload: UserJWTPayload) {
    const { _id: userId } = payload;

    // 로그아웃 여부 검증
    if (await this.blackListService.isInBlackList(userId)) {
      return false;
    }

    return payload;
  }
}
