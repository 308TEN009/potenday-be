import { Module } from '@nestjs/common';
import { EmploymentOpportunityService } from './services/employment-opportunity.service';
import { EmploymentOpportunityController } from './employment-opportunity.controller';
import { EmploymentOpportunity, PersonalStatement } from '@database';
import { TransactionModule } from 'typeorm-aop-transaction';
import { EmploymentOpportunityInjector } from './common';
import { PersonalStatementService } from './services/personal-statement.service';
import { BasicQueueProcessor } from './services/basic-queue.processor';

@Module({
  imports: [
    TransactionModule.setRepository([EmploymentOpportunity, PersonalStatement]),
  ],
  providers: [
    BasicQueueProcessor,
    {
      provide: EmploymentOpportunityInjector.EMPLOYMENT_OPPORTUNITY_SERVICE,
      useClass: EmploymentOpportunityService,
    },
    {
      provide: EmploymentOpportunityInjector.PERSONAL_STATEMENT_SERVICE,
      useClass: PersonalStatementService,
    },
  ],
  controllers: [EmploymentOpportunityController],
})
export class EmploymentOpportunityModule {}
