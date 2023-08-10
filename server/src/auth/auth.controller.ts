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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  PickType,
} from '@nestjs/swagger';
import { AuthService } from './services/auth.service';
import { AuthName, CustomHttpStatus } from '@common';
import { User } from './decorators';
import {
  KakaoAuthGuard,
  NaverAuthGuard,
  JwtAuthGuard,
  FacebookAuthGuard,
  GoogleAuthGuard,
} from './guards';
import { RedirectInterceptor } from './interceptors';
import { SocialLoginResonse, UserJWTPayload } from './interfaces';
import { RefreshAccessTokenDto } from './dtos/refresh-access-token.dto';
import { SignInResponseDto } from './dtos';

@Controller('auth')
@ApiTags('Auth API (인증/인가)')
@ApiInternalServerErrorResponse({
  description: '서버 오류',
})
@ApiUnauthorizedResponse({
  description: '로그인 필요, 유효하지 않은 엑세스 토큰',
})
@ApiBadRequestResponse({
  description: '잘못된 입력값, 타입 혹은 제약사항 오류',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '카카오 로그인',
    description: `
  ### 소셜 로그인/회원가입
  - 소셜 인증 이메일 중복 여부 기준 회원가입/로그인 수행
  - 성공시 **ENV 파일 >>> LOGIN_SUCCESS_REDIRECT_URL** 에 정의된 Redirect URL 로 이동
    - accessToken : 엑세스 토큰은 30분의 유효기간을 가집니다.
    - refreshToken : 리프레시 토큰은 14일의 유효기간을 가집니다.
    `,
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
    description: `
  ### 소셜 로그인/회원가입
  - 소셜 인증 이메일 중복 여부 기준 회원가입/로그인 수행
  - 성공시 **ENV 파일 >>> LOGIN_SUCCESS_REDIRECT_URL** 에 정의된 Redirect URL 로 이동
    - accessToken : 엑세스 토큰
    - refreshToken : 리프레시 토큰 
    `,
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
    summary: '구글 로그인',
    description: `
  ### 소셜 로그인/회원가입
  - 소셜 인증 이메일 중복 여부 기준 회원가입/로그인 수행
  - 성공시 **ENV 파일 >>> LOGIN_SUCCESS_REDIRECT_URL** 에 정의된 Redirect URL 로 이동
    - accessToken : 엑세스 토큰은 30분의 유효기간을 가집니다.
    - refreshToken : 리프레시 토큰은 14일의 유효기간을 가집니다.
    `,
  })
  @Version(VERSION_NEUTRAL)
  @Get('login/google')
  @HttpCode(HttpStatus.OK)
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {}

  @ApiOperation({
    summary: '구글 로그인 콜백 (for OAuth Authorization Server)',
    deprecated: true,
  })
  @Version(VERSION_NEUTRAL)
  @Get('login/google/callback')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(RedirectInterceptor)
  @UseGuards(GoogleAuthGuard)
  googleLoginCallback(@User() socialLoginResonse: SocialLoginResonse) {
    return this.authService.signInSocialUser(socialLoginResonse);
  }

  @ApiOperation({
    summary: '페이스북 로그인',
    description: `
  ### 소셜 로그인/회원가입
  - 소셜 인증 이메일 중복 여부 기준 회원가입/로그인 수행
  - 성공시 **ENV 파일 >>> LOGIN_SUCCESS_REDIRECT_URL** 에 정의된 Redirect URL 로 이동
    - accessToken : 엑세스 토큰은 30분의 유효기간을 가집니다.
    - refreshToken : 리프레시 토큰은 14일의 유효기간을 가집니다.
    `,
  })
  @Version(VERSION_NEUTRAL)
  @Get('login/facebook')
  @HttpCode(HttpStatus.OK)
  @UseGuards(FacebookAuthGuard)
  async facebookLogin() {}

  @ApiOperation({
    summary: '페이스북 로그인 콜백 (for OAuth Authorization Server)',
    deprecated: true,
  })
  @Version(VERSION_NEUTRAL)
  @Get('login/facebook/callback')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(RedirectInterceptor)
  @UseGuards(FacebookAuthGuard)
  facebookLoginCallback(@User() socialLoginResonse: SocialLoginResonse) {
    return this.authService.signInSocialUser(socialLoginResonse);
  }

  @ApiOperation({
    summary: '엑세스 토큰 재발급',
    description: `
  ### 리프레시 토큰을 사용한 엑세스 토큰 재발급
  - 엑세스 토큰 재발급
  - 리프레시 토큰 재발급
    - 재발급에 사용한 리프레시 토큰은 재사용 할 수 없습니다. 반환값에 포함된 새로운 리프레시 토큰을 사용해야합니다.
      `,
  })
  @ApiBearerAuth(AuthName.ACCESS_TOKEN)
  @ApiForbiddenResponse({
    status: CustomHttpStatus.INVALID_REFRESH_TOKEN,
    description:
      '로그인 필요, 해당 유저에게 유효한 리프레시 토큰이 존재하지 않음',
  })
  @Post('token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: '재발급된 엑세스토큰과 리프레시토큰을 포함하는 객체',
    type: PickType(SignInResponseDto, ['accessToken', 'refreshToken']),
  })
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
    description: `
  ### 계정 로그아웃
  - 실제 각 소셜 인증 서버를 통한 로그아웃은 수행하지 않습니다.
  - 모든 리프레시 토큰을 사용 불가 처리하고 인증 블랙리스트에 해당 유저를 추가해 인증이 필요한 모든 API 사용을 차단합니다.
    `,
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
