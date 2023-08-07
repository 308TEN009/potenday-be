import { HttpException } from '@nestjs/common';
import { CustomHttpStatus } from 'src/common';

export class EmailVerificationFailedException extends HttpException {
  constructor() {
    super(
      `인증코드가 일치하지 않거나 인증 유효 기간이 만료된 코드입니다.`,
      CustomHttpStatus.EMAIL_VERIFICATION_FAILED,
    );
  }
}
