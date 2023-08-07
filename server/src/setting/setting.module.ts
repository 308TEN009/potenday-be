import { INestApplication } from '@nestjs/common';
import { ApplicationSetting } from './interfaces';
import {
  SetSwaggerService,
  SetRawBodyService,
  SetBullBoardService,
  SetCorsService,
  SetSecurityService,
  SetApiVersionService,
} from './services';

export class SettingModule {
  static initialize(app: INestApplication) {
    const providers: ApplicationSetting[] = [
      /**
       * @NOTE https://github.com/nestjs/swagger/issues/1495
       * app.enableVersioning(); should be called before SwaggerModule.createDocument(...)
       */
      new SetApiVersionService(app),
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
