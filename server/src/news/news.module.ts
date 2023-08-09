import { Module } from '@nestjs/common';
import { NewsInjector } from './common';

import { NewsController } from './news.controller';
import { NewsService } from './services/news.service';

@Module({
  controllers: [NewsController],
  providers: [
    {
      provide: NewsInjector.NEWS_SERVICE,
      useClass: NewsService,
    },
  ],
})
export class NewsModule {}
