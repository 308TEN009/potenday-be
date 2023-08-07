import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Version(VERSION_NEUTRAL)
  @HttpCode(HttpStatus.OK)
  hello() {
    console.log('hello');
  }
}
