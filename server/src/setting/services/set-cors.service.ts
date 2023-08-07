import { INestApplication, Logger } from '@nestjs/common';
import { ApplicationSetting } from '../interfaces/application-setting.interface';

/**
 * CORS Setting
 */
export class SetCorsService implements ApplicationSetting {
  constructor(private readonly app: INestApplication) {}

  init() {
    this.app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    Logger.log('CORS setting completed', 'init');
  }
}
