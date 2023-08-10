import { SocialProviderType, SocialAccount } from '@database';
import { CreateSocialAccountDto } from '../dtos';

export interface SocialAccountService {
  /**
   * Social 계정 정보 생성
   * @param userId 유저 PK
   * @param dto CreateSocialAccountDto
   */
  createSocialAccount(
    userId: string,
    dto: CreateSocialAccountDto,
  ): Promise<void>;

  /**
   * Social 계정 정보의 중복 여부 검사
   * @param socialId 소셜 PK
   * @param type 소셜 인증 서버 타입
   */
  findDuplicateSocialAccount(
    socialId: string,
    type: SocialProviderType,
  ): Promise<SocialAccount | null>;
}
