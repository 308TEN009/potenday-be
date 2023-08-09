import { PartialType } from '@nestjs/swagger';
import { CreateExperienceDto } from './create-experience.dto';

export class UpdateExerienceDto extends PartialType(CreateExperienceDto) {}
