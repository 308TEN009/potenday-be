import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './services/auth.service';
import { AuthName } from '@common';
import { User } from './decorators';
import { KakaoAuthGuard, NaverAuthGuard, JwtAuthGuard } from './guards';
import { RedirectInterceptor } from './interceptors';
import { SocialLoginResonse, UserJWTPayload } from './interfaces';
import { RefreshAccessTokenDto } from './dtos/refresh-access-token.dto';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '카카오 로그인',
  })
  @Version(VERSION_NEUTRAL)
  @Get('login/kakao')
  @HttpCode(HttpStatus.OK)
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin() {}

  @ApiOperation({
    summary: '카카오 로그인 콜백 (for OAuth Authorization Server)',
    deprecated: true,
  })
  @Version(VERSION_NEUTRAL)
  @Get('login/kakao/callback')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(RedirectInterceptor)
  @UseGuards(KakaoAuthGuard)
  kakaoLoginCallback(@User() socialLoginResonse: SocialLoginResonse) {
    return this.authService.signInSocialUser(socialLoginResonse);
  }

  @ApiOperation({
    summary: '네이버 로그인',
  })
  @Version(VERSION_NEUTRAL)
  @Get('login/naver')
  @HttpCode(HttpStatus.OK)
  @UseGuards(NaverAuthGuard)
  async naverLogin() {}

  @ApiOperation({
    summary: '네이버 로그인 콜백 (for OAuth Authorization Server)',
    deprecated: true,
  })
  @Version(VERSION_NEUTRAL)
  @Get('login/naver/callback')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(RedirectInterceptor)
  @UseGuards(NaverAuthGuard)
  naverLoginCallback(@User() socialLoginResonse: SocialLoginResonse) {
    return this.authService.signInSocialUser(socialLoginResonse);
  }

  @ApiOperation({
    summary: '엑세스 토큰 재발급',
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @Post('token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  refreshAccessToken(
    @User() user: UserJWTPayload,
    @Body() dto: RefreshAccessTokenDto,
  ) {
    return this.authService.refreshAccessToken({
      ...user,
      refreshToken: dto.refreshToken,
    });
  }

  @ApiOperation({
    summary: '로그아웃',
  })
  @Post('logout')
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  logOut(@User() user: UserJWTPayload) {
    return this.authService.logOut(user);
  }

  @ApiOperation({
    summary: 'JWT 토큰 테스트',
    deprecated: true,
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @Get('test')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  test() {
    return true;
  }
}
