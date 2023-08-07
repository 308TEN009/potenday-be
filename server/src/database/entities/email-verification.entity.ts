import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString, Length } from 'class-validator';
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

@Entity('email_verification')
@Index('user_verify_code_idx', ['userId', 'code'], { unique: true })
export class EmailVerification extends BaseEntity {
  @ApiProperty({
    description: 'PK',
    type: String,
    example: 'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
  })
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'email_verification_pk_idx',
  })
  @IsString()
  @Length(1)
  _id!: string;

  @ApiProperty({
    description: '이메일 인증 코드',
    type: String,
    example: 'VqBmMQxfGYJpbQ',
  })
  @Column({
    name: 'code',
    type: 'varchar',
    length: 255,
  })
  @IsString()
  @Length(5, 255)
  code!: string;

  @ApiProperty({
    description: '인증 코드의 만료일',
    type: Date,
    example: new Date('2023-06-07'),
  })
  @Column({
    name: 'expired_in',
    type: 'timestamp with time zone',
  })
  @IsDate()
  expiredIn!: Date;

  @ApiProperty({
    description: '인증 완료 여부',
    type: Boolean,
    example: true,
  })
  @Column({
    name: 'is_verified',
    type: 'bool',
    default: false,
  })
  @IsBoolean()
  isVerified!: boolean;

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

  @ManyToOne(() => User, (user) => user.emailVerificationList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: '_id',
  })
  user!: User;

  constructor(data: User) {
    super();
    Object.assign(this, data);
  }
}
