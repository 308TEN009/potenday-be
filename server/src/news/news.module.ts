import { News } from '@database';
import { Module } from '@nestjs/common';
import { TransactionModule } from 'typeorm-aop-transaction';
import { NewsInjector } from './common';
import { NewsController } from './news.controller';
import { NewsService } from './services/news.service';

@Module({
  imports: [TransactionModule.setRepository([News])],
  controllers: [NewsController],
  providers: [
    {
      provide: NewsInjector.NEWS_SERVICE,
      useClass: NewsService,
    },
  ],
})
export class NewsModule {}
