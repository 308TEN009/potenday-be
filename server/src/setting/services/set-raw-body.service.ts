import { INestApplication, Logger } from '@nestjs/common';
import { ApplicationSetting } from '../interfaces/application-setting.interface';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

/**
 * HTTP BodyParser Setting
 */
export class SetRawBodyService implements ApplicationSetting {
  constructor(private readonly app: INestApplication) {}

  async init() {
    const app = this.app;

    app.use(cookieParser());
    app.use(
      bodyParser.json({
        limit: '300mb',
      }),
    );

    Logger.log('RawBody setting completed', 'init');
  }
}
