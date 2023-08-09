import { AIMessageInputType } from '../common';
import { MessageDto } from '../dtos';

export interface MessageFactory {
  getInstance(type: AIMessageInputType, content?: string): MessageDto;
}
