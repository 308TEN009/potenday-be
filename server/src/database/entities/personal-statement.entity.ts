import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { EmploymentOpportunity } from './employment-opportunity.entity';

@Entity('personal_statement')
export class PersonalStatement extends BaseEntity {
  @ApiProperty({
    description: 'PK',
    type: String,
    example: 'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
  })
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'personal_statement_pk_idx',
  })
  @IsUUID()
  _id!: string;

  @ApiProperty({
    description: '질문',
    type: String,
    example: '당신이 가장 열심히 살았던 순간은?',
  })
  @Column({
    name: 'question',
    type: 'varchar',
    length: 255,
  })
  @IsString()
  @IsNotEmpty()
  question!: string;

  @ApiProperty({
    description: '답변',
    type: String,
    example: '항상',
  })
  @Column({
    name: 'answer',
    type: 'text',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 700)
  answer!: string;

  @ApiProperty({
    description: '채용공고 Id',
    type: String,
    example: 'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
  })
  @Index('employment_opportunity_fk_idx')
  @Column({
    name: 'employment_opportunity_id',
    type: 'uuid',
  })
  @IsUUID()
  employmentOpportunityId!: string;

  @ApiHideProperty()
  @ManyToOne(() => EmploymentOpportunity, (eop) => eop.personalStatementList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'employment_opportunity_id',
    referencedColumnName: '_id',
  })
  employmentOpportunity!: EmploymentOpportunity;
}
