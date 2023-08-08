import { SocialProviderType } from '@database';

export interface UserJWTPayload {
  /** 유저 PK */
  readonly _id: string;
  /** 권한 */
  readonly role: string;
  /** 소셜 인증 서버 타입 */
  readonly authType: SocialProviderType;
}

/**
 * @deprecated Not Using Cookie
 */
export interface UserRefreshJwtPayload extends UserJWTPayload {
  /** 리프레시 토큰 PK */
  readonly refreshToken: string;
}
