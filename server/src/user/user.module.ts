import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { TransactionModule } from 'typeorm-aop-transaction';
import { SocialAccountService } from './service/social-account.service';
import { SocialAccount, User } from '@database';
import { UserInjector } from './common';
import { UserController } from './user.controller';

@Module({
  imports: [TransactionModule.setRepository([User, SocialAccount])],
  controllers: [UserController],
  providers: [
    {
      provide: UserInjector.USER_SERVICE,
      useClass: UserService,
    },
    {
      provide: UserInjector.SOCIAL_ACCOUNT_SERVICE,
      useClass: SocialAccountService,
    },
  ],
  exports: [UserInjector.USER_SERVICE, UserInjector.SOCIAL_ACCOUNT_SERVICE],
})
export class UserModule {}
