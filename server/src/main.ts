import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SettingModule } from '@setting';
import { AppModule } from './app.module';
import { NestEnvUtil, NEST_ENV } from '@config';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule, {
    logger: NestEnvUtil.getNodeEnv() === NEST_ENV.DEV ? ['log'] : false,
  });

  SettingModule.initialize(app);

  await app.listen(process.env.SERVER_PORT || 3000);

  Logger.log(
    `Nest.js is running on Port [${process.env.SERVER_PORT}], using ENV mode [${process.env.NODE_ENV}]`,
  );
}
bootstrap();
