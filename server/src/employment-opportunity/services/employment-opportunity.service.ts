import {
  EmploymentOpportunity,
  EmploymentOpportunityApplyStatus,
  EmploymentOpportunityStatus,
} from '@database';
import { InjectQueue } from '@nestjs/bull';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { QueueName } from '@queue';
import { Queue } from 'bull';
import { EntityManager, In, Repository } from 'typeorm';
import {
  InjectTransactionRepository,
  Transactional,
} from 'typeorm-aop-transaction';
import {
  CreateEmploymentOpportunityDto,
  EmploymentOpportunityStatisticDto,
  UpdateEmploymentOpportunityDto,
} from '../dtos';
import {
  AutoDeleteEmploymentOpportunityDelay,
  AutoDeleteEmploymentOpportunityJob,
  AutoDeleteEmploymentOpportunityJobName,
  EmploymentOpportunityService as IsEmploymentOpportunityService,
} from '../interfaces';

@Injectable()
export class EmploymentOpportunityService
  implements IsEmploymentOpportunityService
{
  constructor(
    @InjectTransactionRepository(EmploymentOpportunity)
    private readonly eopRepository: Repository<EmploymentOpportunity>,
    @InjectQueue(QueueName.BASIC_QUEUE)
    private readonly queue: Queue<AutoDeleteEmploymentOpportunityJob>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  @Transactional()
  async createEmploymentOpportunity(
    userId: string,
    dto: CreateEmploymentOpportunityDto,
  ): Promise<string> {
    const insertResult = await this.eopRepository.insert(
      this.eopRepository.create({
        companyName: dto.companyName,
        applicationJob: dto.applicationJob,
        jobDescription: dto.jobDescription,
        status: EmploymentOpportunityStatus.PENDING, // default status is Pending
        applyStatus: EmploymentOpportunityApplyStatus.DRAFT, // default status is Draft
        userId,
      }),
    );

    const eopId = insertResult.identifiers[0]._id;
    await this.queue.add(
      AutoDeleteEmploymentOpportunityJobName,
      {
        eopId: eopId,
      },
      {
        delay: AutoDeleteEmploymentOpportunityDelay,
      },
    );

    return eopId;
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
  findAllEmploymentOpportunity(
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
        // 작성완료된 지원공고만 서류합격일 수 있음
        status: In([EmploymentOpportunityStatus.COMPLETE]),
      },
    });

    // 지원완료된 지원공고
    const completeCnt = eopList.filter(
      (eop) => eop.status === EmploymentOpportunityStatus.COMPLETE,
    ).length;

    // 서류합격된 지원공고
    const passCnt = eopList.filter(
      (eop) => eop.applyStatus === EmploymentOpportunityApplyStatus.PASS,
    ).length;

    return new EmploymentOpportunityStatisticDto(completeCnt, passCnt);
  }

  async delete(eopId: string) {
    const deleteResult = await this.entityManager.softDelete(
      EmploymentOpportunity,
      eopId,
    );

    if (!deleteResult?.affected) {
      throw new NotFoundException('존재하지 않는 지원공고 삭제 요청');
    }
  }
}
