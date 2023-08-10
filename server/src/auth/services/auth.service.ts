import { Inject, Injectable } from '@nestjs/common';
import {
  UserInjector,
  UserService,
  SocialAccountService,
  CreateSocialAccountDto,
  CreateUserDto,
} from 'src/user';
import { Transactional } from 'typeorm-aop-transaction';
import { v4 as uuidv4, v4 } from 'uuid';
import { AuthInjector } from '../common';
import { SignInResponseDto, FindUserRefreshTokenDto } from '../dtos';
import { InvalidRefreshTokenException } from '../errors';
import {
  AccessTokenService,
  BlackListService,
  RefreshTokenService,
  SocialLoginResonse,
  UserJWTPayload,
  UserRefreshJwtPayload,
} from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserInjector.USER_SERVICE)
    private readonly userService: UserService,
    @Inject(UserInjector.SOCIAL_ACCOUNT_SERVICE)
    private readonly socialAccountService: SocialAccountService,
    @Inject(AuthInjector.ACCESS_TOKEN_SERVICE)
    private readonly accessTokenService: AccessTokenService,
    @Inject(AuthInjector.REFRESH_TOKEN_SERVICE)
    private readonly refreshTokenService: RefreshTokenService,
    @Inject(AuthInjector.BLACK_LIST_SERVICE)
    private readonly blackListService: BlackListService,
  ) {}

  @Transactional()
  async signInSocialUser(profile: SocialLoginResonse) {
    const existSocialUser =
      await this.socialAccountService.findDuplicateSocialAccount(
        String(profile.id),
        profile.type,
      );

    if (existSocialUser) {
      /**
       * @NOTE 기존 유저 로그인 처리
       */
      const user = existSocialUser.user;
      const accessToken = this.accessTokenService.sign({
        _id: user._id,
        role: 'admin',
        authType: existSocialUser.type,
      });

      // 유저 리프레시 토큰 추가 발급
      const refreshToken = await this.refreshTokenService.sign(user._id);

      await this.blackListService.deleteBlackList(user._id);

      return new SignInResponseDto(user, accessToken, refreshToken);
    } else {
      /**
       * @NOTE 최초 가입 유저 회원가입 처리
       */
      const user = await this.userService.create(
        new CreateUserDto({
          userId: profile.email || v4(),
          email: profile.email || null,
          phoneNumber: profile.phoneNumber || null,
          password: uuidv4(),
          socialAccount: new CreateSocialAccountDto({
            socialId: String(profile.id),
            accessToken: profile.accessToken,
            refreshToken: profile.refreshToken || null,
            type: profile.type,
          }),
        }),
      );

      const refreshToken = await this.refreshTokenService.sign(user._id);
      const accessToken = this.accessTokenService.sign({
        _id: user._id,
        role: 'admin',
        authType: profile.type,
      });

      await this.blackListService.deleteBlackList(user._id);

      return new SignInResponseDto(user, accessToken, refreshToken);
    }
  }

  @Transactional()
  async refreshAccessToken(userRefreshJwtPayload: UserRefreshJwtPayload) {
    const { _id: userId, authType, refreshToken } = userRefreshJwtPayload;

    // 유저 정보 조회
    const user = await this.userService.findOne(userId);

    // 유효한 리프레시 토큰 조회
    const activeRefreshToken =
      await this.refreshTokenService.findOneActiveRefreshToken(
        new FindUserRefreshTokenDto(refreshToken, userId),
      );

    if (!activeRefreshToken) {
      // 유효한 리프레시 토큰이 존재하지 않을 경우
      throw new InvalidRefreshTokenException(authType);
    }

    const newRefreshToken = await this.refreshTokenService.refresh(
      new FindUserRefreshTokenDto(refreshToken, userId),
    );
    const accessToken = this.accessTokenService.sign({
      _id: user._id,
      role: 'admin',
      authType: authType,
    });

    return new SignInResponseDto(user, accessToken, newRefreshToken);
  }

  @Transactional()
  async logOut(userJwtPayload: UserJWTPayload) {
    const { _id: userId } = userJwtPayload;

    /**
     * 해당 유저의 모든 리프레시 토큰 삭제
     * @NOTE 해당 유저가 어떤 토큰을 가져와도 엑세스 토큰을 재발급 받을 수 없도록 해야함.
     */
    await this.refreshTokenService.deleteAllToken(userId);

    /**
     * 해당 유저를 블랙리스트에 추가
     */
    await this.blackListService.addToBlackList(userId);
  }
}
