import { ExperienceDetail } from '@database';
import { PickType } from '@nestjs/swagger';

export class CreateExperienceDetailDto extends PickType(ExperienceDetail, [
  'content',
]) {}
