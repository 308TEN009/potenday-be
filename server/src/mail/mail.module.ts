import { IsMailConfig } from '@config';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService<IsMailConfig, true>) => {
        return {
          transport: {
            host: configService.get('mailHost'),
            port: configService.get('mailPort'),
            auth: {
              user: configService.get('mailUser'),
              pass: configService.get('mailPass'),
            },
            secure: false,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class MailModule {}
