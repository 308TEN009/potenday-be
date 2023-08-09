import { Module } from '@nestjs/common';
import { OpenAiService } from './services/open-ai.service';
import { OpenAiController } from './open-ai.controller';
import { OpenAIInjector } from './common';
import { ConfigService } from '@nestjs/config';
import { IsOpenAIConfig } from '@config';

@Module({
  providers: [
    OpenAiService,
    {
      provide: OpenAIInjector.CHAT_GPT_API,
      useFactory: async (
        configService: ConfigService<IsOpenAIConfig, true>,
      ) => {
        /**
         * @NOTE ES5 chatgpt 오류 해결을 위함
         */
        const importDynamic = new Function(
          'modulePath',
          'return import(modulePath)',
        );
        const { ChatGPTAPI } = await importDynamic('chatgpt');

        const api = new ChatGPTAPI({
          apiKey: configService.get('openAiApiKey'),
        });

        return api;
      },
      inject: [ConfigService],
    },
  ],
  controllers: [OpenAiController],
})
export class OpenAiModule {}
