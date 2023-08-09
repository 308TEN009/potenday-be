import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
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

@Entity('bookmark_site')
export class BookmarkSite extends BaseEntity {
  @ApiProperty({
    description: 'PK',
    type: String,
    example: 'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
  })
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'bookmark_site_pk_idx',
  })
  @IsString()
  @IsNotEmpty()
  _id!: string;

  @ApiProperty({
    description: '사이트 이름',
    type: String,
    example: '사람인',
  })
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

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
  @Index('bookmark_site_user_fk_idx')
  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.bookmartSiteList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: '_id',
  })
  user!: User;
}
