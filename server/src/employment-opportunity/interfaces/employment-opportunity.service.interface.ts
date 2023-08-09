import { EmploymentOpportunity } from '@database';
import { CreateEmploymentOpportunityDto } from '../dtos/create-employment-opportunity.dto';
import { EmploymentOpportunityStatisticDto } from '../dtos/employment-opportunity-statistic.dto';

export interface EmploymentOpportunityService {
  /**
   * 지원공고 생성
   * @param dto CreateEmploymentOpportunityDto
   */
  createEmploymentOpportunity(
    userId: string,
    dto: CreateEmploymentOpportunityDto,
  ): Promise<void>;

  /**
   * 작성중인 모든 지원공고 조회
   * @param userId 유저 PK
   */
  findAllActiveEmploymentOpportunity(
    userId: string,
  ): Promise<EmploymentOpportunity[]>;

  /**
   * 지원공고 현황 조회
   * @param userId 유저 PK
   */
  findEmploymentOpportunityStatistic(
    userId: string,
  ): Promise<EmploymentOpportunityStatisticDto>;
}
