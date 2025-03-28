import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useQuizStore = create()(
	persist(
		(set, get) => ({
			score: 0,
			totalQuestions: 5,
			currentQuestionIndex: 0,
			selectedAnswer: null,
			showFeedback: false,
			quizComplete: false,
			bgColor: "#FECDD3",
			answers: [], // เก็บคำตอบของผู้ใช้
			attemptId: null, // เก็บ ID ของการทำแบบทดสอบ

			setScore: (score) => set({ score }),
			incrementScore: () => set((state) => ({ score: state.score + 1 })),
			setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
			setSelectedAnswer: (answer) => set({ selectedAnswer: answer }),
			setShowFeedback: (show) => set({ showFeedback: show }),
			setQuizComplete: (complete) => set({ quizComplete: complete }),
			setBgColor: (color) => set({ bgColor: color }),
			setAttemptId: (id) => set({ attemptId: id }),

			// เพิ่มคำตอบลงในอาร์เรย์
			addAnswer: (questionId, answer, isCorrect) => {
				// เก็บข้อมูลคำตอบไว้ใน store เท่านั้น (จะถูก persist ไว้ใน localStorage โดยอัตโนมัติ)
				// ไม่เรียก API บ่อยๆ เพื่อหลีกเลี่ยง error 500
				set((state) => ({
					answers: [...state.answers, { questionId, answer, isCorrect }],
				}));

				// หมายเหตุ: เดิมมีการเรียก saveProgress เพื่อส่งข้อมูลไป API ทุกครั้งที่ตอบคำถาม
				// แต่ได้ลบออกเพื่อป้องกัน error 500 โดยจะส่งข้อมูลรวมกันเมื่อตอบคำถามครบทุกข้อแทน
			},

			resetQuiz: () => {
				set({
					score: 0,
					currentQuestionIndex: 0,
					selectedAnswer: null,
					showFeedback: false,
					quizComplete: false,
					bgColor: "#FECDD3",
					answers: [],
					attemptId: null,
				});
			},

			nextQuestion: () => {
				set((state) => {
					if (state.currentQuestionIndex < state.totalQuestions - 1) {
						return {
							currentQuestionIndex: state.currentQuestionIndex + 1,
							selectedAnswer: null,
							showFeedback: false,
						};
					} else {
						// เมื่อทำแบบทดสอบเสร็จ ให้เปลี่ยนสถานะเป็น quizComplete
						// แต่ไม่ส่งข้อมูลไป API (จะส่งพร้อมกับแบบสอบถามในหน้า survey)

						// เพียงแค่ตั้งค่า localStorage เพื่อระบุว่าทำแบบทดสอบเสร็จแล้ว
						localStorage.setItem("quizCompleted", "true");

						// ไม่มีการเรียก API completeQuiz อีกต่อไป
						return { quizComplete: true };
					}
				});
			},

			// โหลดความคืบหน้าจาก API
			loadProgress: async (userId) => {
				try {
					const response = await fetch(`/api/quiz-attempts?user_id=${userId}`);
					const data = await response.json();

					if (data.incomplete_attempt) {
						const attempt = data.incomplete_attempt;
						set({
							score: attempt.score || 0,
							currentQuestionIndex: attempt.current_question || 0,
							answers: attempt.answers || [],
							attemptId: attempt.id,
						});
						return true;
					}
					return false;
				} catch (error) {
					console.error("Error loading progress:", error);
					return false;
				}
			},
		}),
		{
			name: "quiz-storage",
		}
	)
);
