import { User } from '@database';
import { IsJWT, IsUUID } from 'class-validator';
import { AuthenticationResponse } from '../interfaces';

export class SignInResponseDto extends User implements AuthenticationResponse {
  @IsJWT()
  readonly accessToken: string;

  @IsUUID()
  readonly refreshToken: string;

  constructor(user: User, accessToken: string, refreshToken: string) {
    super(user);
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
