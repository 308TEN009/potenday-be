import { Experience } from '@database';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateExperienceDetailDto } from './create-experience-detail.dto';

export class CreateExperienceDto extends PickType(Experience, ['title']) {
  @ApiProperty({
    description: '경험 세부사항 데이터',
  })
  @IsArray()
  @Type(() => CreateExperienceDetailDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(0)
  @ArrayMaxSize(2)
  experienceDetailList!: CreateExperienceDetailDto[];
}
