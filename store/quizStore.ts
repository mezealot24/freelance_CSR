import { create } from "zustand";
import { quizQuestions } from "@/data/quizQuestions";

interface QuizState {
  quizComplete: boolean;
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  isAnswerCorrect: boolean | null;
  setQuizComplete: (complete: boolean) => void;
  setCurrentQuestion: (questionIndex: number) => void;
  setScore: (score: number) => void;
  setIsAnswerCorrect: (isCorrect: boolean | null) => void;
  resetQuiz: () => void;
  loadScoreFromStorage: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  quizComplete: false,
  currentQuestion: 0,
  totalQuestions: quizQuestions.length,
  score: 0, // ค่าเริ่มต้นเป็น 0
  isAnswerCorrect: null,
  setQuizComplete: (complete) => set({ quizComplete: complete }),
  setCurrentQuestion: (questionIndex) => 
    set((state) => {
      if (questionIndex >= state.totalQuestions) {
        return { 
          quizComplete: true,
          currentQuestion: state.totalQuestions - 1 
        };
      }
      
      return { 
        currentQuestion: questionIndex,
        isAnswerCorrect: false
      };
    }),
  setScore: (score) =>
    set((state) => ({
      score: score >= 0 ? score : state.score, // ป้องกันค่าติดลบ
    })),
    setIsAnswerCorrect: (isCorrect: boolean | null) => set({ isAnswerCorrect: isCorrect }),
  resetQuiz: () => {
    localStorage.removeItem("quizScore");
    set({
      currentQuestion: 0,
      score: 0,
      isAnswerCorrect: null,
      quizComplete: false,
    });
  },
  loadScoreFromStorage: () => {
    const storedScore = Number(localStorage.getItem("quizScore")) || 0;
    set({ score: storedScore });
  },
}));
