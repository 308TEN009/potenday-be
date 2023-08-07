import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsString, Length } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { EmailVerification } from './email-verification.entity';
import { RefreshToken } from './refresh-token.entity';
import { SocialAccount } from './social-account.entity';

@Entity('user')
export class User extends BaseEntity {
  @ApiProperty({
    description: 'PK',
    type: String,
    example: 'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
  })
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'user_pk_idx',
  })
  @IsString()
  @Length(1)
  _id!: string;

  @ApiProperty({
    description: '로그인시 입력하는 유저 ID',
    type: String,
    example: 'qjqdn1568',
  })
  @Column({
    name: 'user_id',
    type: 'varchar',
    length: 30,
    unique: true,
  })
  @IsString()
  @Length(5, 30)
  userId!: string;

  @ApiProperty({
    description: '암호화된 유저 PW',
    type: String,
    example: 'adg3asdf41asxasdf2656x',
  })
  @Exclude()
  @Column({
    type: 'varchar',
    length: 255,
  })
  @IsString()
  @Length(3, 255)
  password!: string;

  @ApiProperty({
    description: '이메일 주소',
    type: String,
    example: 'qjqdn1568@naver.com',
  })
  @Column({
    type: 'varchar',
    length: 255,
  })
  @IsString()
  @Length(5, 255)
  email!: string;

  @ApiProperty({
    description: '국제번호를 포함하는 전화번호',
    type: String,
    example: '+82-10-3252-2568',
  })
  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 20,
  })
  @IsString()
  @Length(5, 20)
  phoneNumber!: string;

  @OneToMany(() => SocialAccount, (socialAccount) => socialAccount.user, {
    cascade: ['insert'],
  })
  socialAccountList?: SocialAccount[];

  @OneToMany(
    () => EmailVerification,
    (emailVerification) => emailVerification.user,
    {
      cascade: ['remove'],
    },
  )
  emailVerificationList?: EmailVerification[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    cascade: ['remove'],
  })
  refreshTokenList?: RefreshToken[];

  constructor(data: User) {
    super();
    Object.assign(this, data);
  }
}
