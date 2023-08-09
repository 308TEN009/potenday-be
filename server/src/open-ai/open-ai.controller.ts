import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OpenAIInjector } from './common';
import { CreateAIPersonalStatementDto } from './dtos';
import { OpenAIService } from './interfaces';

@Controller('open-ai')
@ApiTags('OpenAI API')
export class OpenAiController {
  constructor(
    @Inject(OpenAIInjector.OPEN_AI_SERVICE)
    private readonly openAIservice: OpenAIService,
  ) {}

  @Post()
  async createAIPersonalStatement(@Body() dto: CreateAIPersonalStatementDto) {
    return this.openAIservice.createPersonalStatement(dto);
  }
}
