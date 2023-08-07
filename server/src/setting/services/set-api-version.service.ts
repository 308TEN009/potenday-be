import { INestApplication, Logger, VersioningType } from '@nestjs/common';
import { ApplicationSetting } from '../interfaces';

/**
 * HTTP API Version Setting
 */
export class SetApiVersionService implements ApplicationSetting {
  constructor(private readonly app: INestApplication) {}

  init() {
    this.app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

    Logger.log('HTTP API Version setting completed', 'init');
  }
}
