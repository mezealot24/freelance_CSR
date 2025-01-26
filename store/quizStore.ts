import { create } from "zustand";
import { quizQuestions } from "@/data/quizQuestions";

interface QuizState {
  quizComplete: boolean;
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  isAnswerCorrect: boolean;
  setQuizComplete: (complete: boolean) => void;
  setCurrentQuestion: (questionIndex: number) => void;
  setScore: (score: number) => void;
  setIsAnswerCorrect: (isCorrect: boolean) => void;
  resetQuiz: () => void;
  loadScoreFromStorage: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  quizComplete: false,
  currentQuestion: 0,
  totalQuestions: quizQuestions.length,
  score: 0, // ค่าเริ่มต้นเป็น 0
  isAnswerCorrect: false,
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
  setIsAnswerCorrect: (isCorrect) => set({ isAnswerCorrect: isCorrect }),
  resetQuiz: () => {
    localStorage.removeItem("quizScore");
    set({
      currentQuestion: 0,
      score: 0,
      isAnswerCorrect: false,
      quizComplete: false,
    });
  },
  loadScoreFromStorage: () => {
    const storedScore = Number(localStorage.getItem("quizScore")) || 0;
    set({ score: storedScore });
  },
}));
