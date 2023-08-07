export interface IsMailConfig {
  /** SMTP 메일 호스트 */
  readonly mailHost: string;
  /** SMTP 메일 서버 포트 */
  readonly mailPort: number;

  /** 네이버 유저 ID */
  readonly mailUser: string;
  /** 네이버 유저 PW */
  readonly mailPass: string;

  /** 발신자 메일 주소 */
  readonly mailFrom: string;
}
