import { create } from 'zustand';

interface QuizState {
  quizComplete: boolean;
  setQuizComplete: (complete: boolean) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  quizComplete: false,
  setQuizComplete: (complete) => set({ quizComplete: complete })
}));