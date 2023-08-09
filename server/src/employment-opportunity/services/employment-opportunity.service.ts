import { EmploymentOpportunity, EmploymentOpportunityStatus } from '@database';
import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import {
  InjectTransactionRepository,
  Transactional,
} from 'typeorm-aop-transaction';
import { CreateEmploymentOpportunityDto } from '../dtos/create-employment-opportunity.dto';
import { EmploymentOpportunityStatisticDto } from '../dtos/employment-opportunity-statistic.dto';
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
        ...dto,
        userId,
        status: EmploymentOpportunityStatus.START,
      }),
    );
  }

  @Transactional()
  findAllActiveEmploymentOpportunity(
    userId: string,
  ): Promise<EmploymentOpportunity[]> {
    /**
     * 활성상태는 start, pending
     */
    return this.eopRepository.find({
      where: {
        userId,
        status: In([
          EmploymentOpportunityStatus.PENDING,
          EmploymentOpportunityStatus.START,
        ]),
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
