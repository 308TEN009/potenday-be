import { IsNaverAuthenticationConfig } from '@config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver-v2';
import {
  SocialPassportStrategy,
  NaverProfile,
  SocialLoginResonse,
} from '../interfaces';

@Injectable()
export class NaverAuthenticationStartegy
  extends PassportStrategy(Strategy, 'naver')
  implements SocialPassportStrategy
{
  constructor(
    public readonly configService: ConfigService<
      IsNaverAuthenticationConfig,
      true
    >,
  ) {
    super({
      clientID: configService.get('naverClientId'),
      clientSecret: configService.get('naverClientSecret'),
      callbackURL: configService.get('naverCallbackUrl'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: NaverProfile,
  ): Promise<SocialLoginResonse | false> {
    try {
      return {
        id: profile.id,
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: profile.name,
        email: profile.email,
        phoneNumber: profile.mobile,
        type: 'naver',
      };
    } catch (e) {
      return false;
    }
  }
}
