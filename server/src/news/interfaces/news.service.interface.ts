import { News } from '@database';
import { CreateNewsDto, UpdateNewsDto } from '../dtos';

export interface NewsService {
  create(userId: string, dto: CreateNewsDto): Promise<void>;

  update(newsId: string, dto: UpdateNewsDto): Promise<void>;

  findAllNewsList(userId: string): Promise<News[]>;

  delete(newsId: string): Promise<void>;
}
