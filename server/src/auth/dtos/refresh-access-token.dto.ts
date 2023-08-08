import { IsUUID } from 'class-validator';

export class RefreshAccessTokenDto {
  @IsUUID()
  readonly refreshToken!: string;
}
