import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
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
    description: '경험 세부사항',
    type: String,
    example: '제 경험 세부사항은 다음과 같습니다...',
  })
  @Column({
    name: 'content',
    type: 'text',
  })
  @IsString()
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
