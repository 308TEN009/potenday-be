import { CustomHttpStatus } from '@common';
import { SocialProviderType } from '@database';
import { HttpException } from '@nestjs/common';

export class InvalidRefreshTokenException extends HttpException {
  constructor(authType: SocialProviderType) {
    super(
      {
        message: '해당 리프레시 토큰은 유효하지 않습니다.',
        authType,
      },
      CustomHttpStatus.INVALID_REFRESH_TOKEN,
    );
  }
}
