import { SocialProviderType, SocialAccount } from '@database';
import { CreateSocialAccountDto } from '../dtos';

export interface SocialAccountService {
  createSocialAccount(
    userId: string,
    dto: CreateSocialAccountDto,
  ): Promise<void>;

  findDuplicateSocialAccount(
    socialId: string,
    type: SocialProviderType,
  ): Promise<SocialAccount | null>;
}
