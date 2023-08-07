import { INestApplication, Logger } from '@nestjs/common';
import { ApplicationSetting } from '../interfaces/application-setting.interface';
import helmet from 'helmet';

/**
 * Security Setting
 */
export class SetSecurityService implements ApplicationSetting {
  constructor(private readonly app: INestApplication) {}

  init() {
    this.app.use(helmet());

    Logger.log('Security setting completed', 'init');
  }
}
