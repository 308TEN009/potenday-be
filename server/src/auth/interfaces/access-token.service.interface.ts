import { UserJWTPayload } from './user-jwt-payload.interface';

export interface AccessTokenService {
  sign(payload: UserJWTPayload): string;
}
