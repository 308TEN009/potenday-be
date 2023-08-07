import { IsKakaoAuthenticationConfig } from '@config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import {
  SocialPassportStrategy,
  KakaoProfile,
  SocialLoginResonse,
} from '../interfaces';

@Injectable()
export class KakaoAuthenticationStartegy
  extends PassportStrategy(Strategy, 'kakao')
  implements SocialPassportStrategy
{
  constructor(
    public readonly configService: ConfigService<
      IsKakaoAuthenticationConfig,
      true
    >,
  ) {
    super({
      clientID: configService.get('kakaoClientId'),
      clientSecret: '',
      callbackURL: configService.get('kakaoCallbackUrl'),
      scope: ['account_email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    payload: { _json: KakaoProfile },
  ): Promise<SocialLoginResonse | false> {
    try {
      const kakaoProfile: KakaoProfile = payload._json;

      return {
        id: kakaoProfile.id,
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: '이름 없음',
        email: kakaoProfile.kakao_account.email,
        phoneNumber: '010-3252-2568',
        type: 'kakao',
      };
    } catch (e) {
      return false;
    }
  }
}
