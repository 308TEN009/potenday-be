import { BookmarkSite } from '@database';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  InjectTransactionRepository,
  Transactional,
} from 'typeorm-aop-transaction';
import { CreateBookmarkSiteDto, UpdateBookmarkSiteDto } from './dtos';

@Injectable()
export class BookmarkSiteService {
  constructor(
    @InjectTransactionRepository(BookmarkSite)
    private readonly bookmarkSiteRepository: Repository<BookmarkSite>,
  ) {}

  @Transactional()
  async create(userId: string, dto: CreateBookmarkSiteDto) {
    await this.bookmarkSiteRepository.insert(
      this.bookmarkSiteRepository.create({
        userId,
        name: dto.name,
        url: dto.url,
      }),
    );
  }

  @Transactional()
  findAll(userId: string) {
    return this.bookmarkSiteRepository.find({
      where: {
        userId,
      },
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  @Transactional()
  async update(bookmarkSiteId: string, dto: UpdateBookmarkSiteDto) {
    const updateResult = await this.bookmarkSiteRepository.update(
      bookmarkSiteId,
      dto,
    );

    if (!updateResult?.affected) {
      throw new NotFoundException('존재하지 않는 즐겨찾기 수정 요청');
    }

    return updateResult;
  }

  @Transactional()
  remove(id: number) {
    return `This action removes a #${id} bookmarkSite`;
  }
}
