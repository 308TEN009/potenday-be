import { AuthName } from '@common';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, User, UserJWTPayload } from 'src/auth';
import { EmploymentOpportunityInjector } from './common';
import { EmploymentOpportunityService } from './interfaces';

@Controller('employment-opportunity')
@ApiTags('EmploymentOpportunity API')
export class EmploymentOpportunityController {
  constructor(
    @Inject(EmploymentOpportunityInjector.EMPLOYMENT_OPPORTUNITY_SERVICE)
    private readonly eopService: EmploymentOpportunityService,
  ) {}

  @ApiOperation({
    summary: '작성중인 지원공고 목록 조회',
    description: `
  - 지원공고 상태가 pending 인 유저의 모든 지원 공고를 조회합니다. 
    `,
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @Get('list/active')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  findAllActiveEmploymentOpportunity(@User() user: UserJWTPayload) {
    return this.eopService.findAllActiveEmploymentOpportunity(user._id);
  }

  @ApiOperation({
    summary: '지원공고 현황 조회',
    description: `
  - 지원완료, 서류합격 상태의 지원공고 현황을 조회해 반환합니다.
    `,
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @Get('statistic')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  findEmploymentOpportunityStatistic(@User() user: UserJWTPayload) {
    return this.eopService.findEmploymentOpportunityStatistic(user._id);
  }
}
