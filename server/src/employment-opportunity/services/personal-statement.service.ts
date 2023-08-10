import { PersonalStatement } from '@database';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  InjectTransactionRepository,
  Transactional,
} from 'typeorm-aop-transaction';

import { CreatePersonalStatementDto } from '../dtos';
import { PersonalStatementService as IsPersonalStatementService } from '../interfaces';

@Injectable()
export class PersonalStatementService implements IsPersonalStatementService {
  constructor(
    @InjectTransactionRepository(PersonalStatement)
    private readonly psRepository: Repository<PersonalStatement>,
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
