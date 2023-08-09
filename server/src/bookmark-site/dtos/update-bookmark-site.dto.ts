import { PartialType } from '@nestjs/swagger';
import { CreateBookmarkSiteDto } from './create-bookmark-site.dto';

export class UpdateBookmarkSiteDto extends PartialType(CreateBookmarkSiteDto) {}
