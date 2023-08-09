import { Module } from '@nestjs/common';
import { ExperienceService } from './services/experience.service';
import { ExperienceController } from './experience.controller';
import { ExperienceInjector } from './common/experience.injector';
import { ExperienceDetailService } from './services/experience-detail.service';
import { Experience, ExperienceDetail } from '@database';
import { TransactionModule } from 'typeorm-aop-transaction';

@Module({
  imports: [TransactionModule.setRepository([Experience, ExperienceDetail])],
  controllers: [ExperienceController],
  providers: [
    {
      provide: ExperienceInjector.EXPERIENCE_SERVICE,
      useClass: ExperienceService,
    },
    {
      provide: ExperienceInjector.EXPERIENCE_DETAIL_SERVICE,
      useClass: ExperienceDetailService,
    },
  ],
})
export class ExperienceModule {}
