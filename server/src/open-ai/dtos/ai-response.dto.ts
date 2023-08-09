import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AIReponseDto {
  @IsString()
  @ApiProperty({
    description: 'AI 에 의해 생성된 답변',
    example:
      '18회 전국 IT 해커톤에서 우승을 했다는 경험을 통해 문제 해결 능력, 팀워크, 커뮤니케이션 등 다양한 역량을 갖추...',
  })
  content!: string;

  constructor(content: string) {
    this.content = content;
  }
}
