import { EmploymentOpportunity } from '@database';
import {
  CreateEmploymentOpportunityDto,
  EmploymentOpportunityStatisticDto,
  UpdateEmploymentOpportunityDto,
} from '../dtos';

export interface EmploymentOpportunityService {
  /**
   * 지원공고 생성
   * @param dto CreateEmploymentOpportunityDto
   * @description 지원공고가 생성되면 상태를 Pending(작성중)으로 초기화한다.
   *
   * @returns 생성된 지원공고 PK
   */
  createEmploymentOpportunity(
    userId: string,
    dto: CreateEmploymentOpportunityDto,
  ): Promise<string>;

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
  findAllEmploymentOpportunity(
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
   * 지원공고 삭제
   * @param eopId 지원공고 PK
   * @NOTE typeorm-aop-transaction 라이브러리의 버그로 인해 다른 @Transcationl 메서드와 함께 사용 불가능. 2023-08-11
   *
   * @throws {NotFoundException} 존재하지 않는 지원공고 삭제 요청
   */
  delete(eopId: string): Promise<void>;
}
