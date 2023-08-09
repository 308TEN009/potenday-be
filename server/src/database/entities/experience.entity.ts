import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
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
import { ExperienceDetail } from './experience-detail.entity';
import { User } from './user.entity';

@Entity('experience')
export class Experience extends BaseEntity {
  @ApiProperty({
    description: 'PK',
    type: String,
    example: 'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
  })
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'experience_pk_idx',
  })
  @IsString()
  @IsNotEmpty()
  _id!: string;

  @ApiProperty({
    description: '경험 제목',
    type: String,
    example: 'Postgres 쿼리 실행 계획 분석을 통한 인덱싱으로 부하 개선 경험',
  })
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  @IsString()
  title!: string;

  @ApiProperty({
    description: '유저 Id',
    type: String,
    example: 'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
  })
  @Index('experience_user_fk_idx')
  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.experienceList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: '_id',
  })
  user!: User;

  @OneToMany(() => ExperienceDetail, (expDetail) => expDetail.experience, {
    cascade: ['insert'],
  })
  experienceDetailList!: ExperienceDetail[];
}
