import { Module } from '@nestjs/common';
import { EmailVerificationInjector } from './common/email-verification.injector';
import { EmailVerificationService } from './services/email-verification.service';
import { EmailVerificationController } from './email-verification.controller';
import { TransactionModule } from 'typeorm-aop-transaction';
import { EmailVerification } from '@database';

@Module({
  imports: [TransactionModule.setRepository([EmailVerification])],
  providers: [
    {
      provide: EmailVerificationInjector.EMAIL_VERIFICATION_SERVICE,
      useClass: EmailVerificationService,
    },
  ],
  controllers: [EmailVerificationController],
})
export class EmailVerificationModule {}
