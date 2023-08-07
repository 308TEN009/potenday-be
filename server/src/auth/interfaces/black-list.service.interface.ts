export interface BlackListService {
  /**
   * 특정 유저를 블랙리스트에 추가
   * @param userId 유저 PK
   * @description 블랙리스트에 추가된 유저는 AuthGuard 에 의해 API 접근 권한이 차단됩니다.
   */
  addToBlackList(userId: string): Promise<void>;

  /**
   * 특정 유저가 블랙리스트에 있는지 확인
   * @param userId 유저 PK
   * @returns true  - 해당 유저가 블랙리스트에 존재함.
   * @returns false - 해당 유저는 블랙리스트에 존재하지 않음.
   */
  isInBlackList(userId: string): Promise<boolean>;

  /**
   * 특정 유저를 블랙리스트에서 제거
   * @param userId 유저 PK
   */
  deleteBlackList(userId: string): Promise<void>;
}
