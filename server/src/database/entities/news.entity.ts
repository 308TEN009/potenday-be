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
import { User } from './user.entity';

@Entity('news')
export class News extends BaseEntity {
  @ApiProperty({
    description: 'PK',
    type: String,
    example: 'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
  })
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'news_pk_idx',
  })
  @IsUUID()
  _id!: string;

  @ApiProperty({
    description: '뉴스 제목',
    type: String,
    example: '줌, 스크래핑 관련 약관 업데이트... AI 훈련에는 동의 필요',
  })
  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: '뉴스 내용',
    type: String,
    example:
      "화상회의 플랫폼 '줌(Zoom)'이 AI 데이터 스크래핑에 대한 부분에서 널리 비판을 받은 후 이용 약관을 업데이트했다. 줌은 사용자 동의 없이는 사용자 콘텐츠를 AI 훈련에 사용하지 않겠다고 명확히 밝혔다.",
  })
  @Column({
    name: 'content',
    type: 'text',
  })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiProperty({
    description: '사이트 주소',
    type: String,
    example: 'http://localhost',
  })
  @Column({
    name: 'url',
    type: 'varchar',
    length: 255,
  })
  @IsString()
  @IsNotEmpty()
  url!: string;

  @ApiProperty({
    description: '유저 Id',
    type: String,
    example: 'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
  })
  @Index('news_user_fk_idx')
  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.newsList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: '_id',
  })
  user!: User;
}
