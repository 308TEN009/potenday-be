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

@Injectable()
export class GoogleAuthenticationStartegy
  extends PassportStrategy(Strategy, 'google')
  implements SocialPassportStrategy
{
  constructor(
    public readonly configService: ConfigService<
      IsFacebookAuthenticationConfig,
      true
    >,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
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
        email: profile._json.email || v4(),
        phoneNumber: '010-0000-0000',
        type: 'google',
      };
    } catch (e) {
      return false;
    }
  }
}
