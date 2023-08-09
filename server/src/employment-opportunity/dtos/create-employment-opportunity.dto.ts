import { EmploymentOpportunity } from '@database';
import { PickType } from '@nestjs/swagger';

/** 지원공고 생성 DTO */
export class CreateEmploymentOpportunityDto extends PickType(
  EmploymentOpportunity,
  ['companyName', 'applicationJob'],
) {}
