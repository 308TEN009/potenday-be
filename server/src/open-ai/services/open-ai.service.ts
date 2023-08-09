import { Inject, Injectable } from '@nestjs/common';
import { ChatCompletionRequestMessage, OpenAIApi } from 'openai';
import { OpenAIInjector } from '../common';
import { CreateAIPersonalStatementDto } from '../dtos';
import { OpenAIService } from '../interfaces';

@Injectable()
export class OpenAiService implements OpenAIService {
  constructor(
    @Inject(OpenAIInjector.CHAT_GPT_API)
    private readonly openAI: OpenAIApi,
  ) {}

  async createPersonalStatement(dto: CreateAIPersonalStatementDto) {
    const { question, assistantInput } = dto;

    const expAssistantInput = assistantInput.filter(
      (each) => each.type === 'experience',
    );

    const empAssistantInput = assistantInput.filter(
      (each) => each.type === 'employment-opportunity',
    );

    console.log(expAssistantInput);

    const response = await this.openAI.createChatCompletion({
      model: 'gpt-3.5-turbo-0613',
      temperature: 1.2,
      top_p: 1,
      max_tokens: 200,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: false,
      n: 1,
      messages: [
        {
          role: 'system',
          content: '당신은 채용 지원 자기소개서를 작성해주는 사람입니다.',
        },
        ...empAssistantInput.map((each) => this.getEmpAssistant(each.message)),
        ...expAssistantInput.map((each) =>
          this.getExperienceAssistant(each.message),
        ),
        this.getPersonalStatementQuetion(question),
      ],
    });

    return response.data.choices[0];
  }

  getPersonalStatementQuetion(question: string): ChatCompletionRequestMessage {
    return {
      role: 'user',
      content: `${question} 
위의 질문에 대한 답변을 300자 이내로 작성해줘`,
    };
  }

  getExperienceAssistant(experience: string): ChatCompletionRequestMessage {
    return {
      role: 'assistant',
      content: `아래의 내용을 자소서 작성에 반영해줘
${experience}`,
    };
  }

  getEmpAssistant(emp: string): ChatCompletionRequestMessage {
    return {
      role: 'assistant',
      content: `지원할 채용공고는 아래와 같아.
${emp}`,
    };
  }
}
