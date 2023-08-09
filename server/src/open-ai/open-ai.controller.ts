import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OpenAIInjector } from './common';
import { ChatGPTAPI } from './interfaces/chat-gpt-api.interface';

@Controller('open-ai')
@ApiTags('OpenAI API')
export class OpenAiController {
  constructor(
    @Inject(OpenAIInjector.CHAT_GPT_API)
    private readonly chatGPTApi: ChatGPTAPI,
  ) {}

  @Get()
  async test() {
    console.log(this.chatGPTApi);
  }
}
