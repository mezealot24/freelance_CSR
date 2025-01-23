import { QuizScenario } from '@/types/QuizScenario';
import { chatMessages } from './chatMessages';

export const quizScenarios: QuizScenario[] = [
  {
    chatMessages: chatMessages,
    isScam: true,
    explanation: "This is a crypto investment scam. Red flags include:\n- Unsolicited investment advice\n- Promise of quick returns\n- Urgency to act quickly\n- Requesting wallet details"
  }
];