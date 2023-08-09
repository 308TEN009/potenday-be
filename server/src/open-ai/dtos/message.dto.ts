import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
} from 'openai';

export class MessageDto implements ChatCompletionRequestMessage {
  readonly role: ChatCompletionRequestMessageRoleEnum;
  readonly content: string;

  constructor(role: ChatCompletionRequestMessageRoleEnum, content: string) {
    this.role = role;
    this.content = content;
  }
}
