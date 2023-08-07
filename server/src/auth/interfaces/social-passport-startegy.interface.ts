import { SocialLoginResonse } from './social-login-response.interface';

export interface SocialPassportStrategy {
  validate(
    accessToken: string,
    refreshToken: string,
    profile: unknown,
  ): Promise<SocialLoginResonse | false>;
}
