import { EmploymentOpportunity, EmploymentOpportunityStatus } from '@database';
import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import {
  InjectTransactionRepository,
  Transactional,
} from 'typeorm-aop-transaction';
import {
  CreateEmploymentOpportunityDto,
  EmploymentOpportunityStatisticDto,
  UpdateEmploymentOpportunityDto,
} from '../dtos';
import { EmploymentOpportunityService as IsEmploymentOpportunityService } from '../interfaces';

@Injectable()
export class EmploymentOpportunityService
  implements IsEmploymentOpportunityService
{
  constructor(
    @InjectTransactionRepository(EmploymentOpportunity)
    private readonly eopRepository: Repository<EmploymentOpportunity>,
  ) {}

  @Transactional()
  async createEmploymentOpportunity(
    userId: string,
    dto: CreateEmploymentOpportunityDto,
  ): Promise<void> {
    await this.eopRepository.insert(
      this.eopRepository.create({
        companyName: dto.companyName,
        applicationJob: dto.applicationJob,
        jobDescription: dto.jobDescription,
        status: EmploymentOpportunityStatus.PENDING,
        userId,
      }),
    );
  }

  @Transactional()
  async updateEmploymentOpportunity(
    eopId: string,
    dto: UpdateEmploymentOpportunityDto,
  ): Promise<void> {
    const updateResult = await this.eopRepository.update(eopId, dto);

    if (!updateResult?.affected) {
      throw new NotFoundException('존재하지 않는 지원공고 수정 요청');
    }
  }

  @Transactional()
  async findOneById(eopId: string) {
    const eop = await this.eopRepository.findOne({
      where: {
        _id: eopId,
      },
      relations: {
        personalStatementList: true,
      },
    });

    if (!eop) {
      throw new NotFoundException('존재하지 않는 지원공고 단일조회 요청');
    }

    return eop;
  }

  @Transactional()
  findAllActiveEmploymentOpportunity(
    userId: string,
  ): Promise<EmploymentOpportunity[]> {
    return this.eopRepository.find({
      where: {
        userId,
      },
      relations: {
        personalStatementList: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  @Transactional()
  async findEmploymentOpportunityStatistic(
    userId: string,
  ): Promise<EmploymentOpportunityStatisticDto> {
    const eopList = await this.eopRepository.find({
      where: {
        userId,
        status: In([EmploymentOpportunityStatus.COMPLETE]),
      },
    });

    const completeCnt = eopList.filter(
      (eop) => eop.status === EmploymentOpportunityStatus.COMPLETE,
    ).length;

    return new EmploymentOpportunityStatisticDto(completeCnt, 0);
  }
}
