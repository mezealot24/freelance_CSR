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
  score: 0,
  isAnswerCorrect: null,

  setQuizComplete: (complete) => set({ quizComplete: complete }),

  setCurrentQuestion: (questionIndex) =>
    set((state) => {
      if (questionIndex > state.totalQuestions - 1) { // Changed from >= to >
        return { 
          quizComplete: true,
          currentQuestion: state.totalQuestions - 1 
        };
      }
      return { 
        currentQuestion: questionIndex,
        isAnswerCorrect: null
      };
    }),

  setScore: (score) =>
    set((state) => {
      const newScore = score >= 0 ? score : state.score;
      localStorage.setItem("quizScore", JSON.stringify(newScore)); // บันทึกคะแนน
      return { score: newScore };
    }),

  setIsAnswerCorrect: (isCorrect: boolean | null) =>
    set({ isAnswerCorrect: isCorrect }),

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