import { EmploymentOpportunity } from '@database';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { CreateEmploymentOpportunityDto } from './create-employment-opportunity.dto';

/** 지원공고 수정 DTO */
export class UpdateEmploymentOpportunityDto extends IntersectionType(
  PartialType(CreateEmploymentOpportunityDto),
  PartialType(PickType(EmploymentOpportunity, ['applyStatus', 'status'])),
) {}
