import { SocialProviderType } from '@database';

export interface SocialLoginResonse {
  /** OAuth 소셜 유저 ID */
  id: number | string;

  /** 이메일 */
  email: string;

  /** 이름 */
  name: string;

  /** OAuth 소셜 엑세스 토큰 */
  accessToken: string;

  /** OAuth 소셜 리프레시 토큰 */
  refreshToken: string;

  /** 전화번호 */
  phoneNumber: string;

  /** 소셜 인증 서버 타입 */
  type: SocialProviderType;
}
