import { AuthName } from '@common';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard, User, UserJWTPayload } from 'src/auth';
import { EmploymentOpportunityInjector } from './common';
import { CreateEmploymentOpportunityDto } from './dtos/create-employment-opportunity.dto';
import { CreatePersonalStatementDto } from './dtos/create-personal-statemnet.dto';
import {
  EmploymentOpportunityService,
  PersonalStatementService,
} from './interfaces';

@Controller('employment-opportunity')
@ApiTags('EmploymentOpportunity API')
@ApiInternalServerErrorResponse({
  description: '서버 오류',
})
@ApiUnauthorizedResponse({
  description: '로그인 필요, 유효하지 않은 엑세스 토큰',
})
@ApiBadRequestResponse({
  description: '잘못된 입력값, 타입 혹은 제약사항 오류',
})
export class EmploymentOpportunityController {
  constructor(
    @Inject(EmploymentOpportunityInjector.EMPLOYMENT_OPPORTUNITY_SERVICE)
    private readonly eopService: EmploymentOpportunityService,
    @Inject(EmploymentOpportunityInjector.PERSONAL_STATEMENT_SERVICE)
    private readonly psService: PersonalStatementService,
  ) {}

  @ApiOperation({
    summary: '지원공고 생성',
    description: `
  - 특정 기업에 대한 지원공고를 생성합니다.
  - 지원공고를 생성하면 **자동으로 상태가 start로 초기화**됩니다.
    `,
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  createEmploymentOpportunity(
    @User() user: UserJWTPayload,
    @Body() dto: CreateEmploymentOpportunityDto,
  ) {
    return this.eopService.createEmploymentOpportunity(user._id, dto);
  }

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

  @ApiOperation({
    summary: '자소서 추가',
    description: `
  - 특정 지원공고에 작성한 자소서를 추가합니다.
  - 자소서를 추가하면 **자동으로 상태가 pending 으로 초기화**됩니다.
    `,
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @Post(':eopId/personal-statement')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  createPesonalStatement(
    @Param('eopId', ParseUUIDPipe) eopId: string,
    @Body() dto: CreatePersonalStatementDto,
  ) {
    return this.psService.createPersonalStatement(eopId, dto);
  }
}
