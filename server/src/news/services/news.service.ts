import { News } from '@database';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  InjectTransactionRepository,
  Transactional,
} from 'typeorm-aop-transaction';
import { CreateNewsDto, UpdateNewsDto } from '../dtos';
import { NewsService as IsNewsService } from '../interfaces';

@Injectable()
export class NewsService implements IsNewsService {
  constructor(
    @InjectTransactionRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  @Transactional()
  async create(userId: string, dto: CreateNewsDto): Promise<void> {
    await this.newsRepository.insert(
      this.newsRepository.create({
        userId,
        title: dto.title,
        content: dto.content,
        url: dto.url,
      }),
    );
  }

  @Transactional()
  async update(newsId: string, dto: UpdateNewsDto): Promise<void> {
    const updateResult = await this.newsRepository.update(newsId, dto);

    if (!updateResult?.affected) {
      throw new NotFoundException('수정할 뉴스가 존재하지 않습니다.');
    }
  }

  @Transactional()
  async findOne(newId: string) {
    const news = await this.newsRepository.findOne({
      where: {
        _id: newId,
      },
    });

    if (!news) {
      throw new NotFoundException('뉴스가 존재하지 않습니다.');
    }

    return news;
  }

  @Transactional()
  findAllNewsList(userId: string): Promise<News[]> {
    return this.newsRepository.find({
      where: {
        userId,
      },
      order: {
        updatedAt: 'desc',
      },
    });
  }

  @Transactional()
  async delete(newsId: string): Promise<void> {
    const news = await this.findOne(newsId);

    await this.newsRepository.softDelete(news._id);
  }
}
