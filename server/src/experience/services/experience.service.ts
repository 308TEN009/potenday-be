import { Experience, ExperienceDetail } from '@database';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  InjectTransactionRepository,
  Transactional,
} from 'typeorm-aop-transaction';
import { CreateExperienceDto, UpdateExerienceDto } from '../dtos';
import { ExperienceService as IsExperienceService } from '../interfaces';

@Injectable()
export class ExperienceService implements IsExperienceService {
  constructor(
    @InjectTransactionRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
    @InjectTransactionRepository(ExperienceDetail)
    private readonly experienceDetailRepository: Repository<ExperienceDetail>,
  ) {}

  @Transactional()
  async createExperience(
    userId: string,
    dto: CreateExperienceDto,
  ): Promise<void> {
    await this.experienceRepository.save(
      this.experienceRepository.create({
        userId,
        title: dto.title,
        experienceDetailList: dto.experienceDetailList.map((detail) =>
          this.experienceDetailRepository.create(detail),
        ),
      }),
    );
  }

  @Transactional()
  async updateExperience(
    expId: string,
    dto: UpdateExerienceDto,
  ): Promise<void> {
    const updateResult = await this.experienceRepository.update(expId, {
      title: dto.title,
    });

    if (!updateResult?.affected) {
      throw new NotFoundException('수정할 경험이 존재하지 않습니다.');
    }

    // 기존 경험상세를 삭제하고 새롭게 생성
    await this.experienceDetailRepository.delete({
      experienceId: expId,
    });

    if (dto?.experienceDetailList && dto.experienceDetailList.length > 0) {
      await this.experienceDetailRepository.insert(
        dto.experienceDetailList.map((detail) =>
          this.experienceDetailRepository.create({
            content: detail.content,
            experienceId: expId,
          }),
        ),
      );
    }
  }

  @Transactional()
  findAllExperience(userId: string): Promise<Experience[]> {
    return this.experienceRepository.find({
      where: {
        userId,
      },
      relations: {
        experienceDetailList: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
