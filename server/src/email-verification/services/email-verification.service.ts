import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { InsertResult, Repository } from 'typeorm';
import {
  InjectTransactionRepository,
  PROPAGATION,
  Transactional,
} from 'typeorm-aop-transaction';
import { addMinutes, isBefore } from 'date-fns';
import { EmailVerificationFailedException } from '../errors/email-verification-failed.exception';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateEmailVerificationEvent } from '../events/create-email-verificaiton.event';
import { EmailVerificationService as IsEmailVerificationService } from '../interfaces/email-verification.service.interface';
import { EmailVerification } from '@database';

@Injectable()
export class EmailVerificationService implements IsEmailVerificationService {
  constructor(
    @InjectTransactionRepository(EmailVerification)
    private readonly emailVerificationRepository: Repository<EmailVerification>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Transactional({
    propagation: PROPAGATION.REQUIRES_NEW,
  })
  async createEmailVerification(userId: string) {
    const result: InsertResult = await this.emailVerificationRepository.insert(
      this.emailVerificationRepository.create({
        userId,
        code: this.generateVerificationCode(), // 인증 코드 생성
        expiredIn: this.getExpiredIn(), // 인증 코드 만료 시각 생성
      }),
    );

    const emailverification = await this.emailVerificationRepository.findOne({
      where: {
        _id: result.identifiers[0]._id,
      },
      relations: {
        user: true,
      },
    });

    if (!emailverification) {
      throw new Error('처리 중 오류가 발생했습니다.');
    }

    this.eventEmitter.emitAsync(
      CreateEmailVerificationEvent.EVENT_NAME,
      new CreateEmailVerificationEvent({
        emailVerificaiton: emailverification,
      }),
    );
  }

  @Transactional({
    propagation: PROPAGATION.SUPPORTS,
  })
  async verifyEmail(userId: string, code: string) {
    const emailVerification = await this.emailVerificationRepository.findOne({
      where: {
        userId,
        code,
      },
    });

    if (
      emailVerification === null ||
      isBefore(emailVerification.expiredIn, new Date(Date.now()))
    ) {
      throw new EmailVerificationFailedException();
    }

    await this.emailVerificationRepository.update(emailVerification._id, {
      isVerified: true,
    });

    return true;
  }

  private generateVerificationCode() {
    const _randomBytes = randomBytes(10);
    const verificationCode = _randomBytes.toString('base64url');
    return verificationCode;
  }

  private getExpiredIn() {
    const now = new Date(Date.now());
    const expiredIn = addMinutes(now, 5);
    return expiredIn;
  }
}
