export interface QuizQuestion {
    id: number;
    scenario: string;
    isScam: boolean;
    explanation: string;
    redFlags?: string[];
  }