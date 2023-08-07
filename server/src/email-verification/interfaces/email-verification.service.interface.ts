export interface EmailVerificationService {
  /**
   * 이메일 인증 코드 생성 및 발송
   * @param userId 유저 PK
   *
   * @throws {Error} 이메일 인증 코드 생성 중 시스템 오류 발생
   */
  createEmailVerification(userId: string): Promise<void>;

  /**
   * 이메일 인증 코드 검증
   * @param userId 유저 PK
   * @param code 인증 코드 (UUID)
   *
   * @throws {EmailVerificationFailedException} 입력된 인증 코드가 올바르지 않음
   */
  verifyEmail(userId: string, code: string): Promise<boolean>;
}
