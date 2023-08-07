import { INestApplication, Logger } from '@nestjs/common';
import { ApplicationSetting } from '../interfaces/application-setting.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CookieName } from '@common';

/**
 * Swagger Setting
 */
export class SetSwaggerService implements ApplicationSetting {
  constructor(private readonly app: INestApplication) {}

  init() {
    const app = this.app;

    const config = new DocumentBuilder()
      .setTitle('Nestjs API Server')
      .setDescription('@KIMBEOBWOO Nestjs REST API')
      .setVersion('1.0')
      .addCookieAuth(
        CookieName.ACCESS_TOKEN,
        {
          type: 'apiKey',
          in: 'cookie',
          scheme: 'bearer',
        },
        CookieName.ACCESS_TOKEN,
      )
      .addCookieAuth(
        CookieName.REFRESH_TOKEN,
        {
          type: 'apiKey',
          in: 'cookie',
        },
        CookieName.REFRESH_TOKEN,
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
      swaggerOptions: {
        tagsSorter: 'alpha',
        syntaxHighlight: true,
        persistAuthorization: true,
        displayRequestDuration: true,
      },
    });

    Logger.log('Swagger setting completed', 'init');
  }
}
