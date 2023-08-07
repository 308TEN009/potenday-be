import { SocialAccount } from '@database';
import { PickType } from '@nestjs/swagger';

export class CreateSocialAccountDto extends PickType(SocialAccount, [
  'accessToken',
  'refreshToken',
  'socialId',
  'type',
]) {
  constructor(data: CreateSocialAccountDto) {
    super();
    Object.assign(this, data);
  }
}
