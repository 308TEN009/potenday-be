import { NestEnvUtil, NEST_ENV } from '@config';
import { INestApplication, Logger } from '@nestjs/common';
import { ApplicationSetting } from '../interfaces/application-setting.interface';

/**
 * CORS Setting
 */
export class SetCorsService implements ApplicationSetting {
  constructor(private readonly app: INestApplication) {}

  init() {
    const whitelist =
      NestEnvUtil.getNodeEnv() === NEST_ENV.PRODUCTION
        ? ['https://extraordinary-cendol-09f96b.netlify.app']
        : '*';

    this.app.enableCors({
      origin: whitelist,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    Logger.log('CORS setting completed', 'init');
  }
}
