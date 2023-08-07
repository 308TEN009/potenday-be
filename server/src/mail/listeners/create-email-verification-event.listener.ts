import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as ejs from 'ejs';
import { join } from 'path';
import { CreateEmailVerificationEvent } from 'src/email-verification/events/create-email-verificaiton.event';
import { OnSafeEvent } from 'src/event-emitter/decorators/on-safe-event.decorator';
import { DomainEventListener } from 'src/event-emitter/interfaces/domain-event-listener.interface';

@Injectable()
export class CreateEmailVerificationEventListener
  implements DomainEventListener
{
  constructor(private readonly mailerService: MailerService) {}

  @OnSafeEvent(CreateEmailVerificationEvent.EVENT_NAME)
  async handleEvent(event: CreateEmailVerificationEvent): Promise<void> {
    const { emailVerificaiton } = event;

    const data = await ejs.renderFile(
      join(__dirname, '..', 'templates', 'email-verification.ejs'),
      {
        name: emailVerificaiton.user.email.split('@')[0],
        code: emailVerificaiton.code,
      },
    );

    await this.mailerService.sendMail({
      to: emailVerificaiton.user.email,
      from: 'qjqdn1568@naver.com',
      subject: '😀 이메일 인증을 완료해주세요',
      html: data,
    });
  }
}
