import { Module } from '@nestjs/common';
import { BookmarkSiteService } from './bookmark-site.service';
import { BookmarkSiteController } from './bookmark-site.controller';
import { TransactionModule } from 'typeorm-aop-transaction';
import { BookmarkSite } from '@database';

@Module({
  imports: [TransactionModule.setRepository([BookmarkSite])],
  controllers: [BookmarkSiteController],
  providers: [BookmarkSiteService],
})
export class BookmarkSiteModule {}
