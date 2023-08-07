export enum CustomHttpStatus {
  /** 중복된 유저 */
  DUPLICATED_USER = 435,

  /** 이메일 인증 실패 */
  EMAIL_VERIFICATION_FAILED = 436,

  /** 리프레시 토큰을 사용한 엑세스 토큰 재발급 실패 */
  INVALID_REFRESH_TOKEN = 437,
}
