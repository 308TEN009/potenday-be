import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenMetadata } from '../common/token-metadata.const';
import {
  AccessTokenService as IsAccessTokenService,
  UserJWTPayload,
} from '../interfaces';

@Injectable()
export class AccessTokenService implements IsAccessTokenService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: UserJWTPayload): string {
    // 엑세스 토큰 발급
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: TokenMetadata.ACCESS_TOKEN_EXPIRED_IN,
    });

    return accessToken;
  }
}
