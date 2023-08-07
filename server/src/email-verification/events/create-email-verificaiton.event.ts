import { EmailVerification } from '@database';
import { DomainEvent, DomainEventProps } from '@event-emitter';

export class CreateEmailVerificationEvent extends DomainEvent {
  static readonly EVENT_NAME = Symbol('CreateEmailVerificationEvent');

  /** 이메일 인증 데이터 */
  readonly emailVerificaiton: EmailVerification;

  constructor(props: DomainEventProps<CreateEmailVerificationEvent>) {
    super(props);
    this.emailVerificaiton = props.emailVerificaiton;
  }
}
