import { IsFacebookAuthenticationConfig } from '@config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  SocialPassportStrategy,
  SocialLoginResonse,
  GoogleProfile,
} from '../interfaces';
import { Strategy } from 'passport-google-oauth20';
import { v4 } from 'uuid';
import { IsGoogleAuthenticationConfig } from 'src/config/interfaces/google-authentication.config.interface';

@Injectable()
export class GoogleAuthenticationStartegy
  extends PassportStrategy(Strategy, 'google')
  implements SocialPassportStrategy
{
  constructor(
    public readonly configService: ConfigService<
      IsGoogleAuthenticationConfig,
      true
    >,
  ) {
    super({
      clientID: configService.get('googleClientId'),
      clientSecret: configService.get('googleClientSecret'),
      callbackURL: configService.get('googleCallbackUrl'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
  ): Promise<SocialLoginResonse | false> {
    try {
      return {
        id: profile.id,
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: profile._json.name || '이름없음',
        email: profile.emails?.[0].value || '',
        phoneNumber: '010-0000-0000',
        type: 'google',
      };
    } catch (e) {
      return false;
    }
  }
}
