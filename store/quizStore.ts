import { create } from 'zustand';

interface QuizState {
  quizComplete: boolean;
  currentQuestion: number;
  score: number;
  setQuizComplete: (complete: boolean) => void;
  setCurrentQuestion: (questionIndex: number) => void;
  setScore: (score: number) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  quizComplete: false,
  currentQuestion: 0,
  score: 0,
  setQuizComplete: (complete) => set({ quizComplete: complete }),
  setCurrentQuestion: (questionIndex) => set({ currentQuestion: questionIndex }),
  setScore: (score) => set({ score: score })
}));