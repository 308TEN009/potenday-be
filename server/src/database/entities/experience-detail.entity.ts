import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Experience } from './experience.entity';

@Entity('experience_detail')
export class ExperienceDetail extends BaseEntity {
  @ApiProperty({
    description: 'PK',
    type: String,
    example: 'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
  })
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'experience_detail_pk_idx',
  })
  @IsString()
  @IsNotEmpty()
  _id!: string;

  @ApiProperty({
    description: '경험 상세 내용',
    type: String,
    example: 'dasdfasdfasdfasdfasdfasdfasd',
  })
  @Column({
    name: 'content',
    type: 'text',
  })
  @IsDate()
  content!: string;

  @ApiProperty({
    description: '경험 Id',
    type: String,
    example: 'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
  })
  @Index('experience_detail_experience_fk_idx')
  @Column({
    name: 'experience_id',
    type: 'uuid',
  })
  @IsUUID()
  experienceId!: string;

  @ApiHideProperty()
  @ManyToOne(() => Experience, (exp) => exp.experienceDetailList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'experience_id',
    referencedColumnName: '_id',
  })
  experience!: Experience;
}
