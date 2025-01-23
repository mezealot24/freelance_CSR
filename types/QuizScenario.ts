import { ChatMessage } from './chat';

export interface QuizScenario {
    chatMessages: ChatMessage[];
    isScam: boolean;
    explanation: string;
  }