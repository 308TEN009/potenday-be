import { PersonalStatement } from '@database';
import { PickType } from '@nestjs/swagger';

/** 자소서 생성 DTO */
export class CreatePersonalStatementDto extends PickType(PersonalStatement, [
  'answer',
  'question',
]) {}
