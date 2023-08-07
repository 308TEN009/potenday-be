import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('refresh_token')
export class RefreshToken extends BaseEntity {
  @ApiProperty({
    description: 'PK, 리프레시 토큰 ',
    type: String,
    example: 'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
  })
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'refresh_pk_idx',
  })
  @IsString()
  @IsNotEmpty()
  _id!: string;

  @ApiProperty({
    description: '리프레시 토큰의 만료시각',
    type: Date,
    example: new Date('2023-06-07 13:12:00'),
  })
  @Column({
    name: 'expired_in',
    type: 'timestamp with time zone',
  })
  @IsDate()
  expiredIn!: Date;

  @ApiProperty({
    description: '유저 Id',
    type: String,
    example: 'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
  })
  @Index('user_fk_idx')
  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ManyToOne(() => User, (user) => user.refreshTokenList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: '_id',
  })
  user!: User;
}
