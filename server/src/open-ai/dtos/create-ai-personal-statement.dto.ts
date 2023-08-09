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
    example: 'NAVER에 지원하신 동기와 기대하시는바를 말씀해주세요',
  })
  question!: string;

  @Type(() => AssistantInputDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(1) // 지원공고 정보
  @ArrayMaxSize(4) // 경험까지 모두
  assistantInput!: AssistantInputDto[];
}
