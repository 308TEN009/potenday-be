import { Observable } from 'rxjs';
import { AIReponseDto } from '../dtos/ai-response.dto';
import { CreateAIPersonalStatementDto } from '../dtos/create-ai-personal-statement.dto';

export interface OpenAIService {
  createPersonalStatement(
    dto: CreateAIPersonalStatementDto,
  ): Promise<AIReponseDto> | Promise<Observable<any>>;
}
