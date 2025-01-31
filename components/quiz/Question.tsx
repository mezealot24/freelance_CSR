"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuizStore } from "@/store/quizStore";
import { quizQuestions } from "@/data/quizQuestions";
import {
	QuizQuestion,
	TrueOrFalseQuestion,
	ChoiceQuestion,
} from "@/types/question";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

interface QuestionProps {
	questionIndex: number;
	onNext?: () => void;
}

const Question = ({ questionIndex, onNext }: QuestionProps) => {
	const router = useRouter();
	const {
		setScore,
		setCurrentQuestion,
		setIsAnswerCorrect,
		setQuizComplete,
		totalQuestions,
	} = useQuizStore();

	const question: QuizQuestion = quizQuestions[questionIndex];
	const [phase, setPhase] = useState<"question" | "explanation" | "next">(
		"question"
	);
	const isLastQuestion = questionIndex === totalQuestions - 1;

	const handleAnswer = (answer: boolean | number) => {
		let isCorrect: boolean;

		if (question.type === "trueorfalse") {
			isCorrect = (question as TrueOrFalseQuestion).isScam === answer;
		} else {
			isCorrect =
				typeof answer === "number" &&
				(question as ChoiceQuestion).correctAnswer === answer;
		}

		setIsAnswerCorrect(isCorrect);

		if (isCorrect) {
			const currentScore = useQuizStore.getState().score;
			const newScore = currentScore + 1;
			setScore(newScore);
			localStorage.setItem("quizScore", newScore.toString());
		}

		setPhase("explanation");
	};

	const handleNext = () => {
		if (isLastQuestion) {
			setQuizComplete(true);
			router.push("/result");
			return;
		}

		const currentQuestion = useQuizStore.getState().currentQuestion;
		setCurrentQuestion(currentQuestion + 1);

		if (onNext) {
			onNext();
		}
	};

	const cardAnimation = {
		initial: { opacity: 0, scale: 0.8 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.8 },
	};

	return (
		<div className="container mx-auto h-[35vh] px-4 py-2 overflow-scroll">
			<motion.div
				variants={cardAnimation}
				initial="initial"
				animate="animate"
				exit="exit"
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
				<div className="w-full max-w-lg mx-auto h-full bg-white rounded-lg shadow-lg">
					<div className="p-6">
						<div>
							<h3 className="text-xl font-semibold text-center text-gray-900">
								{question.question}
							</h3>
						</div>
					</div>

					{phase === "question" && (
						<div className="px-6 pb-6">
							<div className="flex flex-col space-y-4">
								{question.type === "trueorfalse" ? (
									<div className="flex justify-around gap-4">
										<button
											onClick={() => handleAnswer(false)}
											className="w-full py-2 px-4 text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-colors"
										>
											Safe
										</button>
										<button
											onClick={() => handleAnswer(true)}
											className="w-full py-2 px-4 text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-50 transition-colors"
										>
											Scam
										</button>
									</div>
								) : (
									<div className="grid grid-cols-1 gap-4 text-sm">
										{(question as ChoiceQuestion).options.map(
											(option, index) => (
												<button
													key={index}
													onClick={() => handleAnswer(index)}
													className="w-full py-2 px-4 text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
												>
													{option}
												</button>
											)
										)}
									</div>
								)}
							</div>
						</div>
					)}

					{phase === "explanation" && (
						<div className="px-6 pb-6">
							<p className="text-center text-gray-700 mb-4">
								{question.explanation}
							</p>
							<Button
								onClick={handleNext}
								className={
									isLastQuestion ? "bg-green-600 hover:bg-green-700" : ""
								}
							>
								{isLastQuestion ? "ดูผลคะแนน" : "Next"}
							</Button>
						</div>
					)}
				</div>
			</motion.div>
		</div>
	);
};

export default Question;
