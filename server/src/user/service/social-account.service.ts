import { Injectable } from '@nestjs/common';
import { SocialAccount, SocialProviderType } from '@database';
import { Repository } from 'typeorm';
import {
  InjectTransactionRepository,
  Transactional,
} from 'typeorm-aop-transaction';
import { CreateSocialAccountDto } from '../dtos';
import { SocialAccountService as IsSocialAccountService } from '../interfaces';

@Injectable()
export class SocialAccountService implements IsSocialAccountService {
  constructor(
    @InjectTransactionRepository(SocialAccount)
    private readonly socialAccountRepository: Repository<SocialAccount>,
  ) {}

  @Transactional()
  async createSocialAccount(userId: string, dto: CreateSocialAccountDto) {
    const socialAccount = this.socialAccountRepository.create({
      ...dto,
      userId,
    });

    await this.socialAccountRepository.insert(socialAccount);
  }

  @Transactional()
  async findDuplicateSocialAccount(socialId: string, type: SocialProviderType) {
    const result = await this.socialAccountRepository.findOne({
      where: {
        socialId,
        type,
      },
      relations: {
        user: true,
      },
    });

    return result;
  }
}
