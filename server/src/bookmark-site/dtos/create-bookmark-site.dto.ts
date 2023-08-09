import { BookmarkSite } from '@database';
import { PickType } from '@nestjs/swagger';

export class CreateBookmarkSiteDto extends PickType(BookmarkSite, [
  'name',
  'url',
]) {}
