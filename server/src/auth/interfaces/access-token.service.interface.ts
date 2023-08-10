import { UserJWTPayload } from './user-jwt-payload.interface';

export interface AccessTokenService {
  /**
   * 엑세스 토큰 발급
   * @param payload UserJWTPayload (토큰 페이로드)
   */
  sign(payload: UserJWTPayload): string;
}
