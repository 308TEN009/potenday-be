import { EmploymentOpportunity } from '@database';
import { EmploymentOpportunityStatisticDto } from '../dtos/employment-opportunity-statistic.dto';

export interface EmploymentOpportunityService {
  /**
   * 작성중인 모든 지원 공고 조회
   * @param userId 유저 PK
   */
  findAllActiveEmploymentOpportunity(
    userId: string,
  ): Promise<EmploymentOpportunity[]>;

  findEmploymentOpportunityStatistic(
    userId: string,
  ): Promise<EmploymentOpportunityStatisticDto>;
}
