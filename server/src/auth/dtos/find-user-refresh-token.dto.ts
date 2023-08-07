import { IsUUID } from 'class-validator';

export class FindUserRefreshTokenDto {
  @IsUUID()
  refreshToken!: string;

  @IsUUID()
  userId!: string;

  constructor(refreshToken: string, userId: string) {
    this.refreshToken = refreshToken;
    this.userId = userId;
  }
}
