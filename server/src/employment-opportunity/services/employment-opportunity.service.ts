import { EmploymentOpportunity, EmploymentOpportunityStatus } from '@database';
import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import {
  InjectTransactionRepository,
  Transactional,
} from 'typeorm-aop-transaction';
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
  findAllActiveEmploymentOpportunity(
    userId: string,
  ): Promise<EmploymentOpportunity[]> {
    return this.eopRepository.find({
      where: {
        userId,
        status: EmploymentOpportunityStatus.PENDING,
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
