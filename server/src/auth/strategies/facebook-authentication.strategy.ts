import { IsFacebookAuthenticationConfig } from '@config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  SocialPassportStrategy,
  SocialLoginResonse,
  FacebookProfile,
} from '../interfaces';
import { Strategy } from 'passport-facebook';

@Injectable()
export class FacebookAuthenticationStartegy
  extends PassportStrategy(Strategy, 'facebook')
  implements SocialPassportStrategy
{
  constructor(
    public readonly configService: ConfigService<
      IsFacebookAuthenticationConfig,
      true
    >,
  ) {
    super({
      clientID: configService.get('facebookClientId'),
      clientSecret: configService.get('facebookClientSecret'),
      callbackURL: configService.get('facebookCallbackUrl'),
      scope: ['email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: FacebookProfile,
  ): Promise<SocialLoginResonse | false> {
    try {
      return {
        id: profile.id,
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: profile.username || '이름없음',
        email: profile.email,
        phoneNumber: '010-0000-0000',
        type: 'facebook',
      };
    } catch (e) {
      return false;
    }
  }
}
