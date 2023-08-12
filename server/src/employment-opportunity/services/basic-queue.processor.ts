import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { QueueName } from '@queue';
import { Job } from 'bull';
import { EmploymentOpportunityInjector } from '../common';
import {
  AutoDeleteEmploymentOpportunityJob,
  AutoDeleteEmploymentOpportunityJobName,
  EmploymentOpportunityService,
} from '../interfaces';

@Processor(QueueName.BASIC_QUEUE)
export class BasicQueueProcessor {
  constructor(
    @Inject(EmploymentOpportunityInjector.EMPLOYMENT_OPPORTUNITY_SERVICE)
    private readonly eopService: EmploymentOpportunityService,
  ) {}

  @Process(AutoDeleteEmploymentOpportunityJobName)
  async deleteEmploymentOpportunity(
    job: Job<AutoDeleteEmploymentOpportunityJob>,
  ) {
    await this.eopService.delete(job.data.eopId);
  }
}
