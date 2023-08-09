import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AssistantInputDto {
  @ApiProperty({
    description: '질문전 Assistant 를 설정할 타입',
    example: 'experience',
  })
  @IsString()
  type!: 'experience' | 'employment-opportunity';

  @ApiProperty({
    description: `
 해당 Assistant 에 적용할 문장
 - ex) 경험 + 세부사항 문자열
 - 지원공고 기업명 + 지원직무
    `,
  })
  message!: string;
}
