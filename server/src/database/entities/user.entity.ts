import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsString, Length } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BookmarkSite } from './bookmark-site.entity';
import { EmploymentOpportunity } from './employment-opportunity.entity';
import { Experience } from './experience.entity';
import { News } from './news.entity';
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
    length: 120,
    unique: true,
  })
  @IsString()
  @Length(5, 120)
  userId!: string;

  @ApiHideProperty()
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
    nullable: true,
  })
  @IsString()
  @Length(5, 255)
  email!: string | null;

  @ApiProperty({
    description: '국제번호를 포함하는 전화번호',
    type: String,
    example: '+82-10-3252-2568',
  })
  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  @IsString()
  @Length(5, 20)
  phoneNumber!: string | null;

  @OneToMany(() => SocialAccount, (socialAccount) => socialAccount.user, {
    cascade: ['insert'],
  })
  socialAccountList!: SocialAccount[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    cascade: ['remove'],
  })
  refreshTokenList!: RefreshToken[];

  @OneToMany(() => Experience, (exp) => exp.user)
  experienceList!: Experience[];

  @OneToMany(() => BookmarkSite, (bks) => bks.user)
  bookmartSiteList!: BookmarkSite[];

  @OneToMany(() => EmploymentOpportunity, (emp) => emp.user)
  employmentOpportunityList!: EmploymentOpportunity[];

  @OneToMany(() => News, (emp) => emp.user)
  newsList!: News[];

  constructor(data: User) {
    super();
    Object.assign(this, data);
  }
}
