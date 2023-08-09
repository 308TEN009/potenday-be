import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';
import { AIMessageInput, AIMessageInputType } from '../common';

export class AssistantInputDto {
  @ApiProperty({
    description: '질문전 Assistant 를 설정할 타입',
    enum: AIMessageInput,
    enumName: 'AI 자소서 Assistant 설정 타입',
  })
  @IsIn(Object.values(AIMessageInput))
  type!: AIMessageInputType;

  @ApiProperty({
    description: `
 해당 Assistant 에 적용할 문장
 - ex) 경험 + 세부사항 문자열
 - 지원공고 기업명 + 지원직무
    `,
  })
  @IsString()
  message!: string;
}
