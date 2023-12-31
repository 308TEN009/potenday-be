import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import {
  TransactionMiddleware,
  TransactionModule,
} from 'typeorm-aop-transaction';
import { AopModule } from '@toss/nestjs-aop';
import { ConfigModule, NestEnvUtil, NEST_ENV } from '@config';
import { DatabaseModule } from '@database';
import { QueueModule } from '@queue';
import { ServerCacheModule } from '@cache';
import { EventEmitterModule } from '@event-emitter';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { MailModule } from './mail';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { LoggerModule } from './logger';
import { HealthCheckModule } from './health-check';
import { EmploymentOpportunityModule } from './employment-opportunity';
import { ExperienceModule } from './experience';
import { BookmarkSiteModule } from './bookmark-site';
import { OpenAiModule } from './open-ai';
import { NewsModule } from './news';

@Module({
  imports: [
    AopModule,
    TransactionModule.regist({
      logging: NestEnvUtil.getNodeEnv() === NEST_ENV.DEV ? 'all' : 'error',
    }),
    ConfigModule,
    ServerCacheModule,
    QueueModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    MailModule,
    EventEmitterModule,
    LoggerModule,
    HealthCheckModule,
    EmploymentOpportunityModule,
    ExperienceModule,
    BookmarkSiteModule,
    OpenAiModule,
    NewsModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TransactionMiddleware).forRoutes('*');
  }
}
