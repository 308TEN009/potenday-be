import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserJWTPayload } from 'src/auth/interfaces/user-jwt-payload.interface';
import { EmailVerificationInjector } from './common/email-verification.injector';
import { EmailVerificationService } from './interfaces/email-verification.service.interface';

@Controller('email-verification')
@ApiTags('Email Verification API')
export class EmailVerificationController {
  constructor(
    @Inject(EmailVerificationInjector.EMAIL_VERIFICATION_SERVICE)
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @ApiOperation({
    summary: '인증 코드 이메일 발송',
  })
  @Post('email-verification')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  createEmailVerification(@Query('userId', ParseUUIDPipe) userId: string) {
    return this.emailVerificationService.createEmailVerification(userId);
  }

  @ApiOperation({
    summary: '이메일 인증 코드 검증',
  })
  @Post('email-verification/verify')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  verifyEmailVerificationCode(
    @Query('code') code: string,
    @User() user: UserJWTPayload,
  ) {
    return this.emailVerificationService.verifyEmail(user._id, code);
  }
}
