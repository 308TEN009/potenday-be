import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { PersonalStatement } from './personal-statement.entity';
import { User } from './user.entity';

export type EmploymentOpportunityStatusType =
  (typeof EmploymentOpportunityStatus)[keyof typeof EmploymentOpportunityStatus];
export const EmploymentOpportunityStatus = {
  START: 'start',
  PENDING: 'pending',
  COMPLETE: 'complete',
} as const;

@Entity('employment_opportunity')
export class EmploymentOpportunity extends BaseEntity {
  @ApiProperty({
    description: 'PK',
    type: String,
    example: 'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
  })
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'employment_opportunity_pk_idx',
  })
  @IsString()
  @IsNotEmpty()
  _id!: string;

  @ApiProperty({
    description: '기업명',
    type: String,
    example: '4대500컴퍼니',
  })
  @Column({
    name: 'company_name',
    type: 'varchar',
    length: 255,
  })
  @IsString()
  @IsNotEmpty()
  companyName!: string;

  @ApiProperty({
    description: '지원직무',
    type: String,
    example: 'Nodejs 서버 개발자',
  })
  @Column({
    name: 'application_job',
    type: 'varchar',
    length: 255,
  })
  @IsString()
  @IsNotEmpty()
  applicationJob!: string;

  @ApiProperty({
    description: '지원한 채용 상태',
    enumName: '지원상태',
    enum: EmploymentOpportunity,
  })
  @Column({
    name: 'status',
    type: 'varchar',
    length: 20,
  })
  @IsIn(Object.values(EmploymentOpportunity))
  status!: EmploymentOpportunityStatusType;

  @ApiProperty({
    description: '유저 Id',
    type: String,
    example: 'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
  })
  @Index('employment_opportunity_user_fk_idx')
  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.employmentOpportunityList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: '_id',
  })
  user!: User;

  @OneToMany(() => PersonalStatement, (ps) => ps.employmentOpportunity)
  personalStatementList!: PersonalStatement[];
}
