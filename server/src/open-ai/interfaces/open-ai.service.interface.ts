import { CreateAIPersonalStatementDto } from '../dtos/create-ai-personal-statement.dto';

export interface OpenAIService {
  createPersonalStatement(dto: CreateAIPersonalStatementDto): any;
}
