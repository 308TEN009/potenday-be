export const TokenMetadata = {
  /**
   * @NOTE 엑세스 토큰의 유효기간은 30분
   */
  ACCESS_TOKEN_EXPIRED_IN: 60 * 30,

  /**
   * @NOTE 리프레시 토큰의 유효기간은 14일
   */
  REFRESH_TOKEN_EXPIRED_DAYS: 14,
} as const;
