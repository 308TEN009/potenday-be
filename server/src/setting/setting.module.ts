import { INestApplication } from '@nestjs/common';
import { ApplicationSetting } from './interfaces';
import {
  SetSwaggerService,
  SetRawBodyService,
  SetBullBoardService,
  SetCorsService,
  SetSecurityService,
} from './services';

export class SettingModule {
  static initialize(app: INestApplication) {
    const providers: ApplicationSetting[] = [
      new SetSwaggerService(app),
      new SetRawBodyService(app),
      new SetBullBoardService(app),
      new SetCorsService(app),
      new SetSecurityService(app),
    ];

    for (const provider of providers) {
      provider.init();
    }
  }
}
