import { PersonalStatement } from '@database';
import { CreatePersonalStatementDto } from '../dtos';

export interface PersonalStatementService {
  /**
   * 자소서 생성
   * @param eopId 지원공고 PK
   * @param dto CreatePersonalStatementDto
   *
   * @throws {} 해당 지원공고에 작성가능한 자소서 수 초과
   */
  createPersonalStatement(
    eopId: string,
    dto: CreatePersonalStatementDto,
  ): Promise<void>;

  /**
   * 지원공고의 모든 자소서 목록 조회
   * @param eopId 지원공고 PK
   */
  findAllPersonalStatementInEOP(eopId: string): Promise<PersonalStatement[]>;
}
