import { Injectable } from '@nestjs/common';
import {
  AIMessageInput,
  AIMessageInputType,
} from '../common/ai-message-input.type';
import { MessageDto } from '../dtos/message.dto';
import { MessageFactory as IsMessageFactory } from '../interfaces/message.factory.interface';

@Injectable()
export class MessageFactory implements IsMessageFactory {
  getInstance(type: AIMessageInputType, content?: string): MessageDto {
    switch (type) {
      case AIMessageInput.QUESTION:
        return new MessageDto(
          'user',
          `${content} 
위의 질문에 대한 답변을 300자 이내로 작성해줘`,
        );
      case AIMessageInput.EXPERIENCE:
        return new MessageDto(
          'assistant',
          `답변에 반영할 내 경험은 아래와 같아.
${content}`,
        );
      case AIMessageInput.EMPLOYMENT_OPPORTUNITY:
        return new MessageDto(
          'assistant',
          `지원할 채용공고는 아래와 같아.
${content}`,
        );
      case AIMessageInput.ROLE:
        return new MessageDto(
          'system',
          `당신은 기업 입사 자기소개서를 작성해주는 사람입니다. 좋은 자기소개서는 구체적인 예시를 들어 설명하고, 두괄식으로 작성해야합니다.`,
        );
      default:
        throw new Error(`처리 할 수 없는 AIMessageInputType(${type})입니다.`);
    }
  }
}
