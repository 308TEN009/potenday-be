import { News } from '@database';
import { PickType } from '@nestjs/swagger';

export class CreateNewsDto extends PickType(News, [
  'companyName',
  'title',
  'content',
  'url',
]) {}
