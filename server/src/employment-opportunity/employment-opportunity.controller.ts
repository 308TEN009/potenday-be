import { AuthName } from '@common';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  Param,
  ParseUUIDPipe,
  Patch,
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
  ApiNotFoundResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard, User, UserJWTPayload } from 'src/auth';
import { EmploymentOpportunityInjector } from './common';
import {
  UpdateEmploymentOpportunityDto,
  CreateEmploymentOpportunityDto,
} from './dtos';
import { CreatePersonalStatementDto } from './dtos/create-personal-statemnet.dto';
import {
  EmploymentOpportunityService,
  PersonalStatementService,
} from './interfaces';

@Controller('employment-opportunity')
@ApiTags('EmploymentOpportunity API (지원공고/자소서)')
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
  - 지원공고를 생성하면 자동으로 **작성 상태가 pending**로 초기화됩니다.
  - 지원공고를 생성하면 자동으로 **지원결과 상태가 draft**로 초기화됩니다.
  - 지원공고는 생성시각으로부터 6개월 뒤 자동 삭제됩니다.
    `,
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: String,
    description: '생성된 지원공고 ID',
  })
  createEmploymentOpportunity(
    @User() user: UserJWTPayload,
    @Body() dto: CreateEmploymentOpportunityDto,
  ) {
    return this.eopService.createEmploymentOpportunity(user._id, dto);
  }

  @ApiOperation({
    summary: '지원공고 목록 조회',
    description: `
  - 모든 지원공고 목록 조회
    `,
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @Get('list/active')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  findAllActiveEmploymentOpportunity(@User() user: UserJWTPayload) {
    return this.eopService.findAllEmploymentOpportunity(user._id);
  }

  @ApiOperation({
    summary: '지원공고 현황 조회',
    description: `
  - 작성완료, 서류합격 상태의 지원공고 현황을 조회해 반환합니다.
  - 서류합격한 상태의 지원공고는 작성완료된 지원공고의 부분집합이므로, 서류합격한 상태의 지원공고 수는 작성완료된 지원공고 수보다 작거나 같습니다.
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
    summary: '지원공고 수정',
    description: `
  - 특정 지원공고 정보를 수정합니다.
  `,
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @Patch(':eopId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiNotFoundResponse({
    description: '존재하지 않는 지원공고 수정 요청',
  })
  async updateEmploymentOpportunity(
    @Param('eopId', ParseUUIDPipe) eopId: string,
    @Body() dto: UpdateEmploymentOpportunityDto,
  ) {
    return this.eopService.updateEmploymentOpportunity(eopId, dto);
  }

  @ApiOperation({
    summary: '자소서 추가',
    description: `
  - 특정 지원공고에 작성한 자소서를 추가합니다.
  - 자소서를 추가하면 자동으로 **작성상태가 pending** 으로 초기화됩니다.
    `,
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @Post(':eopId/personal-statement')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createPesonalStatement(
    @Param('eopId', ParseUUIDPipe) eopId: string,
    @Body() dto: CreatePersonalStatementDto,
  ) {
    try {
      await this.psService.createPersonalStatement(eopId, dto);
    } catch (e) {
      if (e instanceof Error) {
        throw new InternalServerErrorException(e.message, { cause: e });
      }
      throw e;
    }
  }

  @ApiOperation({
    summary: '지원공고의 모든 자소서 목록 조회',
    description: `
  - 특정 지원공고의 모든 자소서를 조회합니다.
    `,
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @Get(':eopId/personal-statement/list')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  findAllPersonalStatementInEOP(@Param('eopId', ParseUUIDPipe) eopId: string) {
    return this.psService.findAllPersonalStatementInEOP(eopId);
  }
}
