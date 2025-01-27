export interface ChatMessage {
  id: number;
  type: 'scammer' | 'victim';
  message: string;
  avatar: string;
}

export interface BaseQuestion {
  id: number;
  type: 'trueorfalse' | 'choice';
  explanation: string;
  redFlags: string[];
  question: string;
  chatScenario: ChatMessage[];
}

export interface TrueOrFalseQuestion extends BaseQuestion {
  type: 'trueorfalse';
  isScam: boolean;
}

export interface ChoiceQuestion extends BaseQuestion {
  type: 'choice';
  options: string[];
  correctAnswer: number;
}

export interface QuizProps
{
	onScenarioComplete: (complete: boolean) => void;
}

export type QuizQuestion = TrueOrFalseQuestion | ChoiceQuestion;