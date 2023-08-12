import { Inject, Injectable } from '@nestjs/common';
import { OpenAIApi } from 'openai';
import { Observable } from 'rxjs';
import { AIMessageInput, OpenAIInjector } from '../common';
import { CreateAIPersonalStatementDto, MessageDto } from '../dtos';
import { MessageFactory, OpenAIService } from '../interfaces';

@Injectable()
export class OpenAiServiceV2 implements OpenAIService {
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

    return new Observable((subscriber) => {
      this.openAI
        .createChatCompletion(
          {
            model: 'gpt-3.5-turbo',
            temperature: 0.8,
            top_p: 1,
            max_tokens: 10,
            frequency_penalty: 0,
            presence_penalty: 0,
            stream: true,
            n: 1,
            messages,
          },
          { responseType: 'stream' },
        )
        .then((res) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          res.data.on('data', (data) => {
            const lines = data
              .toString()
              .split('\n')
              .filter((line: string) => line.trim() !== '');

            for (const line of lines) {
              const message = line.replace(/^data: /, '');

              if (message === '[DONE]') {
                subscriber.complete();
                return;
              }

              try {
                const parsed = JSON.parse(message);
                const data = parsed.choices[0].delta.content;

                subscriber.next(data);
              } catch (error) {
                subscriber.error(error);
              }
            }
          });
        });
    });
  }
}
