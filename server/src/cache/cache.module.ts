import { IsRedisConfig } from '@config';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { CacheInjector } from './common';

/**
 * Cache Module
 * - The module is a global module with global reference.
 * - Various stores such as redis and mongo can be registered as providers and expanded.
 */
@Global()
@Module({
  providers: [
    {
      /**
       * how to use
       * - @Inject(CacheInjector.<<Symbol>>) cacheManager: Cache
       */
      provide: CacheInjector.REDIS_CACHE_MANAGER,
      useFactory: async (configService: ConfigService<IsRedisConfig>) =>
        await redisStore({
          socket: {
            host: configService.get('redisHost'),
            port: configService.get('redisPort'),
          },
          password: configService.get('redisPassword'),
        }),
      inject: [ConfigService<IsRedisConfig>],
    },
  ],
  exports: [CacheInjector.REDIS_CACHE_MANAGER],
})
export class ServerCacheModule {}
