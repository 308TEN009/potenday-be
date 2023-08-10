import {
  EmploymentOpportunity,
  EmploymentOpportunityStatusType,
} from '@database';
import { UpdateResult } from 'typeorm';
import {
  CreateEmploymentOpportunityDto,
  EmploymentOpportunityStatisticDto,
  UpdateEmploymentOpportunityDto,
} from '../dtos';

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
   * 지원공고 수정
   * @param eopId 지원공고 PK
   * @param dto UpdateEmploymentOpportunityDto
   *
   * @throws {NotFoundException} 존재하지 않는 지원공고 수정요청
   */
  updateEmploymentOpportunity(
    eopId: string,
    dto: UpdateEmploymentOpportunityDto,
  ): Promise<void>;

  /**
   * 지원공고 단일 조회
   * @param eopId 지원공고 PK
   *
   * @throws {NotFoundException} 존재하지 않는 지원공고 조회
   */
  findOneById(eopId: string): Promise<EmploymentOpportunity>;

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

  /**
   * 지원공고 상태 수정
   * @param eopId 지원공고 PK
   * @param status 변경할 상태
   *
   * @throws {NotFoundException} 존재하지 않는 지원공고 수정
   */
  updateOpportunityStatus(
    eopId: string,
    status: EmploymentOpportunityStatusType,
  ): Promise<UpdateResult>;
}
