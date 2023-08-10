import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsIn, IsUUID } from 'class-validator';
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

/** 지원공고 작성상태 타입 */
export type EmploymentOpportunityStatusType =
  (typeof EmploymentOpportunityStatus)[keyof typeof EmploymentOpportunityStatus];
/** 지원공고 작성상태 */
export const EmploymentOpportunityStatus = {
  START: 'start',
  PENDING: 'pending',
  COMPLETE: 'complete',
} as const;

/** 지원공고 지원상태 타입 */
export type EmploymentOpportunityApplyStatusType =
  (typeof EmploymentOpportunityApplyStatus)[keyof typeof EmploymentOpportunityApplyStatus];
/** 지원공고 지원상태 */
export const EmploymentOpportunityApplyStatus = {
  PASS: 'pass',
  DRAFT: 'draft',
  FAIL: 'fail',
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
  @IsUUID()
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
    example: 'NodeJs 서버 개발자',
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
    description: '지원 직무 설명',
    type: String,
    example: `- 분산 DB를 활용한 고성능 데이터 처리를 위한 플랫폼 설계 및 구현 업무
- 대용량 트랜잭션 처리를 위한 플랫폼 설계 및 구현 업무
- 네이버페이 주문, 결제 서비스 개발 업무
    `,
  })
  @Column({
    name: 'job_description',
    type: 'text',
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  jobDescription!: string | null;

  @ApiProperty({
    description: '작성중인 채용공고 상태',
    enumName: '채용공고 상태',
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
    description: '지원한 채용공고 결과 상태',
    enumName: '지원 결과 상태',
    enum: EmploymentOpportunityApplyStatus,
    default: EmploymentOpportunityApplyStatus.DRAFT,
  })
  @Column({
    name: 'apply_status',
    type: 'varchar',
    length: 20,
    default: EmploymentOpportunityApplyStatus.DRAFT, // 초기 상태는 draft
  })
  @IsIn(Object.values(EmploymentOpportunityApplyStatus))
  applyStatus!: EmploymentOpportunityApplyStatusType;

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
  @IsUUID()
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
