import { CacheInjector } from '@cache';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { BlackListService as IsBlackListService } from '../interfaces';

@Injectable()
export class BlackListService implements IsBlackListService {
  /** inMemory db Black List key prefix */
  private static readonly BLACK_LIST_KEY_PREFIX = 'black_list_';

  constructor(
    @Inject(CacheInjector.REDIS_CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  addToBlackList(userId: string) {
    // 특정 유저를 블랙리스트에 추가
    return this.cacheManager.set(
      BlackListService.BLACK_LIST_KEY_PREFIX + userId,
      true,
      1800, // ttl 은 엑세스 토큰의 최대 유효기간만큼
    );
  }

  async isInBlackList(userId: string) {
    // 해당 유저가 블랙리스트에 있는지 확인
    const isIn = await this.cacheManager.get<boolean>(
      BlackListService.BLACK_LIST_KEY_PREFIX + userId,
    );

    if (isIn) {
      return true;
    } else {
      return false;
    }
  }

  deleteBlackList(userId: string): Promise<void> {
    return this.cacheManager.del(
      BlackListService.BLACK_LIST_KEY_PREFIX + userId,
    );
  }
}
