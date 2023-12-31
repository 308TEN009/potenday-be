import { Module } from '@nestjs/common';
import { OpenAiService } from './services/open-ai.service';
import { OpenAiController } from './open-ai.controller';
import { OpenAIInjector } from './common';
import { ConfigService } from '@nestjs/config';
import { IsOpenAIConfig } from '@config';
import { Configuration, OpenAIApi } from 'openai';
import { MessageFactory } from './services/message.factory';
import { OpenAiServiceV2 } from './services/open-ai.v2.service';

@Module({
  providers: [
    {
      provide: OpenAIInjector.OPEN_AI_SERVICE,
      useClass: OpenAiService,
    },
    {
      provide: OpenAIInjector.OPEN_AI_SERVICE_V2,
      useClass: OpenAiServiceV2,
    },
    {
      provide: OpenAIInjector.MESSAGE_FACTORY,
      useClass: MessageFactory,
    },
    {
      provide: OpenAIInjector.CHAT_GPT_API,
      useFactory: async (
        configService: ConfigService<IsOpenAIConfig, true>,
      ) => {
        const configiration = new Configuration({
          apiKey: configService.get('openAiApiKey'),
        });

        const openai = new OpenAIApi(configiration);

        return openai;
      },
      inject: [ConfigService],
    },
  ],
  controllers: [OpenAiController],
})
export class OpenAiModule {}
