import { Inject, Injectable } from '@nestjs/common';
import { OpenAIApi } from 'openai';
import { AIMessageInput, OpenAIInjector } from '../common';
import {
  CreateAIPersonalStatementDto,
  AIReponseDto,
  MessageDto,
} from '../dtos';
import { MessageFactory, OpenAIService } from '../interfaces';

@Injectable()
export class OpenAiService implements OpenAIService {
  constructor(
    @Inject(OpenAIInjector.CHAT_GPT_API)
    private readonly openAI: OpenAIApi,
    @Inject(OpenAIInjector.MESSAGE_FACTORY)
    private readonly messageFactory: MessageFactory,
  ) {}

  async createPersonalStatement(dto: CreateAIPersonalStatementDto) {
    const { question, assistantInput } = dto;

    const messages: MessageDto[] = [
      this.messageFactory.getInstance(AIMessageInput.ROLE),
      ...assistantInput.map((input) =>
        this.messageFactory.getInstance(input.type, input.message),
      ),
      this.messageFactory.getInstance(AIMessageInput.QUESTION, question),
    ];

    const response = await this.openAI.createChatCompletion({
      model: 'gpt-3.5-turbo',
      temperature: 0.8,
      top_p: 1,
      max_tokens: 700,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: false,
      n: 1,
      messages,
    });

    if (!response.data?.choices[0]?.message?.content) {
      throw new Error('ChatGPT 처리 중 오류가 발생했습니다.');
    }

    return new AIReponseDto(response.data.choices[0].message.content);
  }
}
