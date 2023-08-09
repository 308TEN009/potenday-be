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
      throw new NotFoundException('존재하지 않는 뉴스 스크랩 수정 요청');
    }
  }

  @Transactional()
  findAllNewsList(userId: string): Promise<News[]> {
    return this.newsRepository.find({
      where: {
        userId,
      },
    });
  }

  @Transactional()
  async delete(newsId: string): Promise<void> {
    const deleteResult = await this.newsRepository.softDelete(newsId);

    if (!deleteResult?.affected) {
      throw new NotFoundException('존재하지 않는 뉴스 스크랩 삭제 요청');
    }
  }
}
