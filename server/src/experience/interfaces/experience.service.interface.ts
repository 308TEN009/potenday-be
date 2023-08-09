import { Experience } from '@database';
import { CreateExperienceDto, UpdateExerienceDto } from '../dtos';

export interface ExperienceService {
  /**
   * 경험 생성
   * @param userId 유저 PK
   * @param dto CreateExperienceDto
   */
  createExperience(userId: string, dto: CreateExperienceDto): Promise<void>;

  /**
   * 경험 수정
   * @param expId 경험 PK
   * @param dto UpdateExerienceDto
   *
   * @throws {NotFoundException} 수정할 경험이 존재하지 않음
   */
  updateExperience(expId: string, dto: UpdateExerienceDto): Promise<void>;

  /**
   * 유저의 모든 경험 목록 조회
   * @param userId 유저 PK
   */
  findAllExperience(userId: string): Promise<Experience[]>;
}
