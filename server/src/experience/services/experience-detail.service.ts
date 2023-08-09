import { Injectable } from '@nestjs/common';
import { ExperienceDetailService as IsExperienceDetailService } from '../interfaces';

@Injectable()
export class ExperienceDetailService implements IsExperienceDetailService {}
