import { Module } from '@nestjs/common';
import { EmploymentOpportunityService } from './services/employment-opportunity.service';
import { EmploymentOpportunityController } from './employment-opportunity.controller';
import { EmploymentOpportunity } from '@database';
import { TransactionModule } from 'typeorm-aop-transaction';
import { EmploymentOpportunityInjector } from './common';

@Module({
  imports: [TransactionModule.setRepository([EmploymentOpportunity])],
  providers: [
    {
      provide: EmploymentOpportunityInjector.EMPLOYMENT_OPPORTUNITY_SERVICE,
      useClass: EmploymentOpportunityService,
    },
  ],
  controllers: [EmploymentOpportunityController],
})
export class EmploymentOpportunityModule {}
