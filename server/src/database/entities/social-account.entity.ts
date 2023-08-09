import { IsIn, IsString, Length } from 'class-validator';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

export type SocialProviderType =
  (typeof SocialProviderTypeValue)[keyof typeof SocialProviderTypeValue];
export const SocialProviderTypeValue = {
  KAKAO: 'kakao',
  NAVER: 'naver',
  FACEBOOK: 'facebook',
} as const;

@Entity('social_account')
@Index('social_account_idx', ['type', 'socialId'], { unique: true })
export class SocialAccount extends BaseEntity {
  @ApiProperty({
    description: 'PK',
    type: String,
    example: 'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
  })
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'social_account_pk_idx',
  })
  @IsString()
  @Length(1)
  _id!: string;

  @ApiProperty({
    description: '소셜 인증 ID',
    type: String,
    example: 'axa23662dszxasgda64234',
  })
  @Column({
    type: 'varchar',
    length: 255,
    name: 'social_id',
  })
  @IsString()
  @Length(1)
  socialId!: string;

  @ApiProperty({
    description: '소셜 인증 대상',
    enum: SocialProviderTypeValue,
  })
  @Column({
    name: 'type',
    type: 'varchar',
    length: 255,
  })
  @IsIn(Object.values(SocialProviderTypeValue))
  type!: SocialProviderType;

  @ApiProperty({
    description: '소셜 엑세스 토큰',
    type: String,
    example: 'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
  })
  @Column({
    name: 'access_token',
    type: 'varchar',
    length: 255,
  })
  @IsString()
  @Length(1)
  accessToken!: string;

  @ApiProperty({
    description: '소셜 리프레시 토큰',
    type: String,
    example: 'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
  })
  @Column({
    type: 'varchar',
    length: 255,
    name: 'refresh_token',
    nullable: true,
  })
  @IsString()
  @Length(1)
  refreshToken!: string;

  @ApiProperty({
    description: '유저 Id',
    type: String,
    example: 'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
  })
  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  @IsString()
  @Length(1)
  userId!: string;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.socialAccountList, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: '_id',
  })
  user!: User;
}
