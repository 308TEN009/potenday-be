import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AssistantInputDto } from './assistant-input.dto';

export class CreateAIPersonalStatementDto {
  @IsString()
  @ApiProperty({
    description: 'AI 에게 질문할 자소서 문항',
    example: '지원하신 동기와 기대하시는바를 말씀해주세요',
  })
  question!: string;

  @Type(() => AssistantInputDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(1) // 지원공고 정보
  @ArrayMaxSize(4) // 경험까지 모두
  @ApiProperty({
    example: [
      {
        type: 'exp',
        message:
          'Google DSC 에서 주최하는 IT 해커톤에서 2회 우승 경험이 있습니다. 주로 사용한 기술은 Nest.js 와 Redis 입니다.',
      },
      {
        type: 'emp',
        message: '네이버, 데이터분석가',
      },
    ],
  })
  assistantInput!: AssistantInputDto[];
}
