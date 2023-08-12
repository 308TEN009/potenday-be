import { EmploymentOpportunityStatus, PersonalStatement } from '@database';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  InjectTransactionRepository,
  Transactional,
} from 'typeorm-aop-transaction';
import { EmploymentOpportunityInjector } from '../common';

import { CreatePersonalStatementDto } from '../dtos';
import {
  EmploymentOpportunityService,
  PersonalStatementService as IsPersonalStatementService,
} from '../interfaces';

@Injectable()
export class PersonalStatementService implements IsPersonalStatementService {
  constructor(
    @InjectTransactionRepository(PersonalStatement)
    private readonly psRepository: Repository<PersonalStatement>,
    @Inject(EmploymentOpportunityInjector.EMPLOYMENT_OPPORTUNITY_SERVICE)
    private readonly empService: EmploymentOpportunityService,
  ) {}

  @Transactional()
  async createPersonalStatement(
    eopId: string,
    dto: CreatePersonalStatementDto,
  ): Promise<void> {
    await this.psRepository.insert(
      this.psRepository.create({
        ...dto,
        employmentOpportunityId: eopId,
      }),
    );

    // 지원공고 상태가 start 인 경우 pending 으로 수정
    const eop = await this.empService.findOneById(eopId);
    if (eop.status === EmploymentOpportunityStatus.START) {
      await this.empService.updateEmploymentOpportunity(eopId, {
        status: EmploymentOpportunityStatus.PENDING,
      });
    }
  }

  @Transactional()
  findAllPersonalStatementInEOP(eopId: string): Promise<PersonalStatement[]> {
    return this.psRepository.find({
      where: {
        employmentOpportunityId: eopId,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
