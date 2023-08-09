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
    private readonly eopService: EmploymentOpportunityService,
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

    const eop = await this.eopService.findOneById(eopId);

    /** 상태가 start 라면 pending 으로 수정 */
    if (eop.status !== EmploymentOpportunityStatus.START) {
      await this.eopService.updateOpportunityStatus(
        'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
        EmploymentOpportunityStatus.PENDING,
      );
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
