import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import configuration from './configuration';
import { NestEnvUtil } from './nest-env.util';
import { NEST_ENV } from './types';

/**
 * Server Configuration Module
 * - Module that provides environment variables for the server.
 * - The module is set as a global module to allow injection globally.
 */
@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: NestEnvUtil.getEnvFilePath(), // set env file path
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid(...Object.values(NEST_ENV))
          .required(),
        SERVER_PORT: Joi.number().required(),
      }),
      // loading configuration
      load: [configuration],
    }),
  ],
})
export class ConfigModule {}
