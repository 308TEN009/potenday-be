import { News } from '@database';
import { PickType } from '@nestjs/swagger';

export class CreateNewsDto extends PickType(News, [
  'title',
  'content',
  'url',
]) {}
