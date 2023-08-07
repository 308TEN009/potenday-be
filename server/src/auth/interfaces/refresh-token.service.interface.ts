import { RefreshToken } from '@database';
import { FindUserRefreshTokenDto } from '../dtos';

export interface RefreshTokenService {
  /**
   * 리프레시 토큰 생성
   * @param userId 유저 PK
   * @returns 발급된 리프레시 토큰 문자열
   */
  sign(userId: string): Promise<string>;

  /**
   * 리프레시 토큰 재발급
   * @param dto FindUserRefreshTokenDto
   * @returns 재발급된 리프레시 토큰 문자열
   */
  refresh(dto: FindUserRefreshTokenDto): Promise<string>;

  /**
   * 유효한 리프레시 토큰 조회
   * @param dto FindUserRefreshTokenDto
   * @returns `RefreshToken`, 입력된 정보에 해당하는 유효한 리프레시 토큰 객체
   * @returns `null`, 유효한 리프레시 토큰이 없는 경우 반환
   */
  findOneActiveRefreshToken(
    dto: FindUserRefreshTokenDto,
  ): Promise<RefreshToken | null>;

  /**
   * 유저의 모든 리프레시 토큰 삭제
   * @param userId 유저 PK
   */
  deleteAllToken(userId: string): Promise<void>;
}
