import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Sse,
  Version,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OpenAIInjector } from './common';
import { CreateAIPersonalStatementDto } from './dtos';
import { OpenAIService } from './interfaces';

@Controller('open-ai')
@ApiTags('OpenAI API (AI)')
@ApiInternalServerErrorResponse({
  description: '서버 오류',
})
@ApiUnauthorizedResponse({
  description: '로그인 필요, 유효하지 않은 엑세스 토큰',
})
@ApiBadRequestResponse({
  description: '잘못된 입력값, 타입 혹은 제약사항 오류',
})
export class OpenAiController {
  constructor(
    @Inject(OpenAIInjector.OPEN_AI_SERVICE)
    private readonly openAIservice: OpenAIService,
    @Inject(OpenAIInjector.OPEN_AI_SERVICE_V2)
    private readonly openAIserviceV2: OpenAIService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('personal-statement')
  @ApiOperation({
    summary: 'ChatGPT 자소서 생성',
    description: `
  ### 입력된 question 에 대한 답변을 ChatGPT 를 통해 생성합니다.
  API 호출 입력값을 통해 사용자의 경험 정보 및 채용 공고 정보를 적용할 수 있습니다.
  - **Type : exp**  : 사용자의 경험 및 경험상세 정보를 합쳐 **{경험제목},{경험상세}** 형태의 문자열로 전달해주세요.
    - 경험 정보는 최대 3개까지만 입력이 가능합니다.
  - **Type : emp**  : 사용자가 진행중인 지원공고의 내용을 합쳐 **{기업명},{지원직무}** 형태의 문자열로 전달해주세요.
    - 지원공고 정보는 1개만 입력이 가능합니다.    
  - **Type : jd**   : 사용자가 진행중인 지원공고의 직무 설명이 존재하는 경우, **{지원직무 설명}** 형태의 문자열로 전달해주세요.
    - 지원공고 직무 정보는 1개만 입력이 가능합니다.   
    `,
  })
  createAIPersonalStatement(@Body() dto: CreateAIPersonalStatementDto) {
    return this.openAIservice.createPersonalStatement(dto);
  }

  @Sse('personal-statement')
  @Version('2')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'ChatGPT 자소서 생성 (SSE 버전)',
    deprecated: true,
    description: `
  ### 입력된 question 에 대한 답변을 ChatGPT 를 통해 생성합니다.
  API 호출 입력값을 통해 사용자의 경험 정보 및 채용 공고 정보를 적용할 수 있습니다.
  - **Type : exp**  : 사용자의 경험 및 경험상세 정보를 합쳐 **{경험제목},{경험상세}** 형태의 문자열로 전달해주세요.
    - 경험 정보는 최대 3개까지만 입력이 가능합니다.
  - **Type : emp**  : 사용자가 진행중인 지원공고의 내용을 합쳐 **{기업명},{지원직무}** 형태의 문자열로 전달해주세요.
    - 지원공고 정보는 1개만 입력이 가능합니다.    
  - **Type : jd**   : 사용자가 진행중인 지원공고의 직무 설명이 존재하는 경우, **{지원직무 설명}** 형태의 문자열로 전달해주세요.
    - 지원공고 직무 정보는 1개만 입력이 가능합니다.   
    `,
  })
  createAIPersonalStatementV2(@Body() dto: CreateAIPersonalStatementDto) {
    return this.openAIserviceV2.createPersonalStatement(dto);
  }
}
