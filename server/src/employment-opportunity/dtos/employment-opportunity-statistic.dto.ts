import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class EmploymentOpportunityStatisticDto {
  @IsNumber()
  @ApiProperty({
    description: '지원완료한 지원공고 수',
  })
  readonly completeCnt: number;

  @IsNumber()
  @ApiProperty({
    description: '서류합격한 지원공고 수',
  })
  readonly successCnt: number;

  constructor(completeCnt: number, successCnt: number) {
    this.completeCnt = completeCnt;
    this.successCnt = successCnt;
  }
}
