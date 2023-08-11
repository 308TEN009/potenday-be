import { News } from '@database';
import { CreateNewsDto, UpdateNewsDto } from '../dtos';

export interface NewsService {
  /**
   * 뉴스 생성
   * @param userId 유저 PK
   * @param dto CreateNewsDto
   */
  create(userId: string, dto: CreateNewsDto): Promise<void>;

  /**
   * 뉴스 수정
   * @param newsId 뉴스 PK
   * @param dto UpdateNewsDto
   *
   * @throws {NotFoundException} 수정할 뉴스가 존재하지 않음.
   */
  update(newsId: string, dto: UpdateNewsDto): Promise<void>;

  /**
   * 뉴스 목록 조회
   * @param userId 유저 PK
   * @description 특정 유저의 모든 뉴스를 수정일 기준 내림차순 정렬해 반환
   */
  findAllNewsList(userId: string): Promise<News[]>;

  /**
   * 뉴스 삭제
   * @param newsId 뉴스 PK
   *
   * @throws {NotFoundException} 삭제할 뉴스가 존재하지 않음.
   */
  delete(newsId: string): Promise<void>;
}
