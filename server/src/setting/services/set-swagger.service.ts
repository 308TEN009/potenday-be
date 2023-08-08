import { INestApplication, Logger } from '@nestjs/common';
import { ApplicationSetting } from '../interfaces/application-setting.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthName } from '@common';

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
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
        },
        AuthName.ACCESS_TOKEN,
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
