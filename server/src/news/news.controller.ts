import { AuthName } from '@common';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard, User, UserJWTPayload } from 'src/auth';
import { NewsInjector } from './common';
import { CreateNewsDto, UpdateNewsDto } from './dtos';
import { NewsService } from './interfaces';

@Controller('news')
@ApiTags('News API (뉴스 스크랩)')
@ApiInternalServerErrorResponse({
  description: '서버 오류',
})
@ApiUnauthorizedResponse({
  description: '로그인 필요, 유효하지 않은 엑세스 토큰',
})
@ApiBadRequestResponse({
  description: '잘못된 입력값, 타입 혹은 제약사항 오류',
})
export class NewsController {
  constructor(
    @Inject(NewsInjector.NEWS_SERVICE)
    private readonly newsService: NewsService,
  ) {}

  @ApiOperation({
    summary: '뉴스 스크랩 생성',
    description: `
  - 유저의 뉴스 스크랩을 생성합니다.
    `,
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  create(@User() user: UserJWTPayload, @Body() dto: CreateNewsDto) {
    return this.newsService.create(user._id, dto);
  }

  @ApiOperation({
    summary: '뉴스 스크랩 목록 조회',
    description: `
  - 유저의 모든 뉴스 스크랩을 조회합니다.
    `,
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @Get('list')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  findAll(@User() user: UserJWTPayload) {
    return this.newsService.findAllNewsList(user._id);
  }

  @ApiOperation({
    summary: '뉴스 스크랩 수정',
    description: `
  - 특정 뉴스 스크랩의 내용을 수정합니다.
    `,
  })
  @ApiNotFoundResponse({
    description: '수정할 뉴스 스크랩이 존재하지 않음',
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @Patch(':newsId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  update(
    @Param('newsId', ParseUUIDPipe) newsId: string,
    @Body() dto: UpdateNewsDto,
  ) {
    if (Object.keys(dto).length < 1) {
      throw new BadRequestException('빈 객체 수정 요청');
    }

    return this.newsService.update(newsId, dto);
  }

  @ApiOperation({
    summary: '뉴스 스크랩 삭제',
    description: `
  - 특정 뉴스 스크랩을 삭제합니다.
    `,
  })
  @ApiNotFoundResponse({
    description: '삭제할 뉴스 스크랩이 존재하지 않음',
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @Delete(':newsId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  remove(@Param('newsId', ParseUUIDPipe) newsId: string) {
    return this.newsService.delete(newsId);
  }
}
