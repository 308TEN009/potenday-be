import { CustomHttpStatus } from '@common';
import { HttpException } from '@nestjs/common';

export class DuplicateUserException extends HttpException {
  constructor() {
    super(`이미 존재하는 userId 입니다.`, CustomHttpStatus.DUPLICATED_USER);
  }
}
