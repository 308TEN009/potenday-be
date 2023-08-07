import * as Joi from 'joi';
import {
  IsAuthenticationConfig,
  IsKakaoAuthenticationConfig,
  IsMailConfig,
  IsNaverAuthenticationConfig,
  IsPostgresDatabaseConfig,
  IsRedisConfig,
} from './interfaces';

/**
 * If additional environment variables are required,
 * configure the appropriate interface and add it to the union type.
 */
type ConfigSchema = IsPostgresDatabaseConfig &
  IsRedisConfig &
  IsAuthenticationConfig &
  IsKakaoAuthenticationConfig &
  IsMailConfig &
  IsNaverAuthenticationConfig;

/**
 * Perform validation of environment variable objects with a given interface.
 */
export default () => {
  // joi validation target schema
  const schema = Joi.object<ConfigSchema, true>({
    postgresHost: Joi.string().required(),
    postgresPort: Joi.number().required(),
    postgresUserName: Joi.string().required(),
    postgresPassword: Joi.string().required(),
    postgresDatabaseName: Joi.string().required(),

    redisHost: Joi.string().required(),
    redisPort: Joi.number().required(),
    redisPassword: Joi.string().required(),

    jwtPublicKey: Joi.string().required(),
    jwtPrivateKey: Joi.string().required(),
    loginSuccessRedirectUrl: Joi.string().required(),

    kakaoClientId: Joi.string().required(),
    kakaoCallbackUrl: Joi.string().required(),
    // kakaoClientSecret: Joi.string().required(),

    naverClientId: Joi.string().required(),
    naverCallbackUrl: Joi.string().required(),
    naverClientSecret: Joi.string().required(),

    mailHost: Joi.string().required(),
    mailPort: Joi.number().required(),
    mailUser: Joi.string().required(),
    mailPass: Joi.string().required(),
    mailFrom: Joi.string().required(),
  });

  // validate target values
  const config = {
    postgresHost: process.env.POSTGRES_HOST,
    postgresPort: process.env.POSTGRES_PORT,
    postgresUserName: process.env.POSTGRES_USERNAME,
    postgresPassword: process.env.POSTGRES_PASSWORD,
    postgresDatabaseName: process.env.POSTGRES_DATABASE,

    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
    redisPassword: process.env.REDIS_PASSWORD,

    jwtPublicKey: process.env.JWT_PUBLIC_KEY,
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
    loginSuccessRedirectUrl: process.env.LOGIN_SUCCESS_REDIRECT_URL,

    kakaoClientId: process.env.KAKAO_CLIENT_ID,
    kakaoCallbackUrl: process.env.KAKAO_CALLBACK_URL,
    // kakaoClientSecret: process.env.KAKAO_CLIENT_SECRET,

    naverClientId: process.env.NAVER_CLIENT_ID,
    naverCallbackUrl: process.env.NAVER_CALLBACK_URL,
    naverClientSecret: process.env.NAVER_CLIENT_SECRET,

    mailHost: process.env.NAVER_MAIL_HOST,
    mailPort: process.env.NAVER_MAIL_PORT,
    mailUser: process.env.NAVER_MAIL_USER,
    mailPass: process.env.NAVER_MAIL_PASS,
    mailFrom: process.env.NAVER_MAIL_FROM,
  };

  const { error, value } = schema.validate(config);

  if (error) {
    throw new Error('Env Missing ' + error.message);
  }

  return value;
};
