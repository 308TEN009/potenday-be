import { AuthName } from '@common';
import { Experience } from '@database';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard, User, UserJWTPayload } from 'src/auth';
import { ExperienceInjector } from './common';
import { CreateExperienceDto, UpdateExerienceDto } from './dtos';
import { ExperienceService } from './interfaces';

@Controller('experience')
@ApiTags('Experience API (경험)')
@ApiInternalServerErrorResponse({
  description: '서버 오류',
})
@ApiUnauthorizedResponse({
  description: '로그인 필요, 유효하지 않은 엑세스 토큰',
})
@ApiBadRequestResponse({
  description: '잘못된 입력값, 타입 혹은 제약사항 오류',
})
export class ExperienceController {
  constructor(
    @Inject(ExperienceInjector.EXPERIENCE_SERVICE)
    private readonly experienceService: ExperienceService,
  ) {}

  @ApiOperation({
    summary: '경험 생성',
    description: `
  - 경험의 본문을 생성합니다.
  - 경험 상세 정보를 배열로 입력할 경우 경험 상세를 함께 생성합니다.
    `,
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  createExperience(
    @User() user: UserJWTPayload,
    @Body() dto: CreateExperienceDto,
  ) {
    return this.experienceService.createExperience(user._id, dto);
  }

  @ApiOperation({
    summary: '경험 목록 조회',
    description: `
  - 특정 유저의 모든 경험을 조회합니다.
  `,
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @Get('list')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  findAll(@User() user: UserJWTPayload) {
    return this.experienceService.findAllExperience(user._id);
  }

  @ApiOperation({
    summary: '경험 수정',
    description: `
  - 경험의 본문을 수정합니다.
  - 입력된 값으로 수정할 경험과 경험 세부사항을 모두 덮어씌웁니다.
    - ex) 기존 1개의 경험 세부사항이 있었고, DTO 의 experienceDetailList 의 입력에 2개의 경험 세부사항이 입력되면 **기존 1개의 경험 세부사항을 삭제하고 새로운 2개의 경험 세부사항을 생성**합니다.
    - ex) DTO 의 experienceDetailList 가 undefined 거나 길이가 0인 배열일 경우 **기존의 경험 세부사항은 모두 삭제**만 됩니다.
    `,
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @Patch(':expId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiNotFoundResponse({
    description: '수정할 경험이 존재하지 않음',
  })
  @ApiOkResponse({
    type: Experience,
    description: '수정된 경험 데이터',
  })
  updateExperience(
    @Param('expId', ParseUUIDPipe) expId: string,
    @Body() dto: UpdateExerienceDto,
  ) {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('빈 객체는 수정 할 수 없습니다.');
    }

    return this.experienceService.updateExperience(expId, dto);
  }

  @ApiOperation({
    summary: '경험 삭제',
    description: `
  - 특정 경험과 경험 하위의 경험 세부사항을 모두 삭제합니다.
    `,
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @Delete(':expId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiNotFoundResponse({
    description: '삭제할 경험이 존재하지 않음',
  })
  deleteExperience(@Param('expId', ParseUUIDPipe) expId: string) {
    return this.experienceService.deleteExperience(expId);
  }
}
