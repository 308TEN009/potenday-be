import { AuthName } from '@common';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard, User, UserJWTPayload } from 'src/auth';
import { BookmarkSiteService } from './bookmark-site.service';
import { CreateBookmarkSiteDto, UpdateBookmarkSiteDto } from './dtos';

@Controller('bookmark-site')
@ApiTags('Bookmart Site API (즐겨찾기)')
@ApiInternalServerErrorResponse({
  description: '서버 오류',
})
@ApiUnauthorizedResponse({
  description: '로그인 필요, 유효하지 않은 엑세스 토큰',
})
@ApiBadRequestResponse({
  description: '잘못된 입력값, 타입 혹은 제약사항 오류',
})
export class BookmarkSiteController {
  constructor(private readonly bookmarkSiteService: BookmarkSiteService) {}

  @ApiOperation({
    summary: '즐겨찾기 생성',
    description: `
  - 즐겨찾기를 생성합니다.
    `,
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@User() user: UserJWTPayload, @Body() dto: CreateBookmarkSiteDto) {
    return this.bookmarkSiteService.create(user._id, dto);
  }

  @ApiOperation({
    summary: '즐겨찾기 목록 조회',
    description: `
  - 특정 유저의 모든 즐겨찾기 목록을 조회합니다.
    `,
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('list')
  findAll(@User() user: UserJWTPayload) {
    return this.bookmarkSiteService.findAll(user._id);
  }

  @ApiOperation({
    summary: '즐겨찾기 수정',
    description: `
  - 특정 즐겨찾기의 정보를 수정합니다.
    `,
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @HttpCode(HttpStatus.OK)
  @Patch(':bookmarkSiteId')
  @ApiNotFoundResponse({
    description: '수정할 즐겨찾기 존재하지 않음',
  })
  update(
    @Param('bookmarkSiteId', ParseUUIDPipe) bookmarkSiteId: string,
    @Body() dto: UpdateBookmarkSiteDto,
  ) {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('빈 객체는 수정 할 수 없습니다.');
    }

    return this.bookmarkSiteService.update(bookmarkSiteId, dto);
  }
}
