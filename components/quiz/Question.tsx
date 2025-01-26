"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuizStore } from "@/store/quizStore";
import { quizQuestions } from "@/data/quizQuestions";
import {
	QuizQuestion,
	TrueOrFalseQuestion,
	ChoiceQuestion,
} from "@/types/QuizQuestion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

interface QuestionProps {
	questionIndex: number;
	onNext?: () => void;
}

const Question = ({ questionIndex, onNext }: QuestionProps) => {
	const router = useRouter();
	const { setScore, setCurrentQuestion, setIsAnswerCorrect, setQuizComplete } =
		useQuizStore();

	const question: QuizQuestion = quizQuestions[questionIndex];
	const [phase, setPhase] = useState<"question" | "explanation" | "next">(
		"question"
	);

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
		const currentQuestion = useQuizStore.getState().currentQuestion;

		if (currentQuestion + 1 < quizQuestions.length) {
			setCurrentQuestion(currentQuestion + 1);

			if (onNext) {
				onNext();
			}
		} else {
			// Ensure quiz is completed and redirected for the last question
			setQuizComplete(true);
			router.push("/result");
		}
	};

	const cardAnimation = {
		initial: { opacity: 0, scale: 0.8 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.8 },
	};

	return (
		<div className="container mx-auto h-[50vh] min-h-[500px] max-h-[500px] px-4 py-8">
			<motion.div
				variants={cardAnimation}
				initial="initial"
				animate="animate"
				exit="exit"
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
				<Card className="w-full max-w-lg mx-auto h-full">
					<CardHeader>
						<div>
							<Image
								src={`/icons/scammer-avatars/question-${question.id}.svg`}
								alt={`Scammer icon for question ${question.id}`}
								className="w-16 h-16 mx-auto mb-4"
								width={64}
								height={64}
							/>
							<CardTitle>
								<h2 className="text-xl font-semibold text-center">
									{question.question}
								</h2>
							</CardTitle>
						</div>
					</CardHeader>

					{phase === "question" && (
						<CardContent className="flex flex-col space-y-4">
							{question.type === "trueorfalse" ? (
								<div className="flex justify-around">
									<Button
										onClick={() => handleAnswer(false)}
										className="btn btn-outline btn-green"
									>
										Safe
									</Button>
									<Button
										onClick={() => handleAnswer(true)}
										className="btn btn-outline btn-red"
									>
										Scam
									</Button>
								</div>
							) : (
								<div className="grid grid-cols-1 gap-4 text-sm">
									{(question as ChoiceQuestion).options.map((option, index) => (
										<Button
											key={index}
											onClick={() => handleAnswer(index)}
											className="btn btn-outline"
										>
											{option}
										</Button>
									))}
								</div>
							)}
						</CardContent>
					)}

					{phase === "explanation" && (
						<CardContent>
							<p className="text-center text-gray-700">
								{question.explanation}
							</p>
							<div className="text-center mt-4">
								<Button onClick={handleNext} className="btn btn-primary">
									Next
								</Button>
							</div>
						</CardContent>
					)}
				</Card>
			</motion.div>
		</div>
	);
};

export default Question;
