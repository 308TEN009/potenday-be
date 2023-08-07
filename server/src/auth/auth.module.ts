import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { KakaoAuthenticationStartegy } from './strategies/kakao-authentication.strategy';
import { PassportModule } from '@nestjs/passport';
import { TransactionModule } from 'typeorm-aop-transaction';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RedirectInterceptor } from './interceptors/redirect-login-success.post.interceptor';
import { RefreshTokenService } from './services/refresh-token.service';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { AuthInjector } from './common/auth.injector';
import { AccessTokenService } from './services/access-token.service';
import { NaverAuthenticationStartegy } from './strategies/naver-authentication.strategy';
import { IsAuthenticationConfig } from '@config';
import { EmailVerification, RefreshToken } from '@database';
import { BlackListService } from './services/black-list.service';

@Module({
  imports: [
    TransactionModule.setRepository([EmailVerification, RefreshToken]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (
        configService: ConfigService<IsAuthenticationConfig, true>,
      ) => ({
        secretOrKeyProvider: (requestType: JwtSecretRequestType) => {
          switch (requestType) {
            case JwtSecretRequestType.SIGN:
              // retrieve signing key dynamically
              return configService.get('jwtPrivateKey');
            case JwtSecretRequestType.VERIFY:
              // retrieve public key for verification dynamically
              return configService.get('jwtPublicKey');
            default:
              // retrieve secret dynamically
              return 'hard!to-guess_secret';
          }
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: AuthInjector.REFRESH_TOKEN_SERVICE,
      useClass: RefreshTokenService,
    },
    {
      provide: AuthInjector.ACCESS_TOKEN_SERVICE,
      useClass: AccessTokenService,
    },
    {
      provide: AuthInjector.BLACK_LIST_SERVICE,
      useClass: BlackListService,
    },
    JwtStrategy,
    RefreshJwtStrategy,
    KakaoAuthenticationStartegy,
    NaverAuthenticationStartegy,
    RedirectInterceptor,
  ],
})
export class AuthModule {}
