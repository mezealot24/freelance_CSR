"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions } from "@/data/quizQuestions";
import Image from "next/image";
import AnswerCard from "./AnswerCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Button from "@/components/ui/Button";
import { AnimationStyle } from "@/types/animation";

interface QuestionProps {
	animationStyle?: AnimationStyle;
}

export default function Question({ animationStyle }: QuestionProps) {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showExplanation, setShowExplanation] = useState(false);
	const [displayText, setDisplayText] = useState("");
	const [score, setScore] = useState(0);
	const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
	const defaultAnimationStyle: AnimationStyle = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -20 },
		transition: { duration: 0.3 },
	};

	const combinedAnimationStyle = {
		...defaultAnimationStyle,
		...animationStyle,
	};

	useEffect(() => {
		console.log("Quiz has been rendered.");
	}, []);

	const handleAnswer = (answer: boolean) => {
		setUserAnswer(answer);
		if (answer === quizQuestions[currentQuestion].isScam) {
			setScore((prev) => prev + 1);
		}
		setShowExplanation(true);
	};

	useEffect(() => {
		if (!showExplanation) {
			const scenario = quizQuestions[currentQuestion].scenario;
			const words = scenario.split(" ");
			let wordIndex = 0;
			setDisplayText("");

			const timer = setInterval(() => {
				if (wordIndex < words.length) {
					setDisplayText((prev) => prev + words[wordIndex] + " ");
					wordIndex++;
				} else {
					clearInterval(timer);
				}
			}, 200); // Adjust timing between words

			return () => clearInterval(timer);
		}
	}, [currentQuestion, showExplanation]);

	return (
		<motion.div
			{...combinedAnimationStyle}
			className="container mx-auto h-auto px-4 py-8"
		>
			<Card className="flex flex-col lg:h-[600px] justify-center items-center">
				<CardHeader className="py-6 lg:py-12 flex-none text-center">
					<div className="mb-4">
						<Image
							src="/avatars/Avatar1.svg"
							alt="Scammer Avatar"
							width={64}
							height={64}
							className="rounded-full mx-auto border-2 border-gray-200"
						/>
					</div>
					<h2 className="text-4xl font-bold">What do you think?</h2>
				</CardHeader>
				<CardContent className="flex-1 flex flex-col justify-center w-full">
					<AnimatePresence mode="wait">
						<motion.div
							key={currentQuestion}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
							className="flex flex-col justify-center items-center w-full"
						>
							<p className="text-lg text-center mb-6 min-h-[120px] flex items-center justify-center px-4">
								{displayText}
							</p>
							{!showExplanation ? (
								<div className="flex gap-3 mt-4 px-4">
									<Button
										onClick={() => handleAnswer(false)}
										className="flex-1 bg-green-600 hover:bg-green-700"
									>
										Safe
									</Button>
									<Button
										onClick={() => handleAnswer(true)}
										className="flex-1 bg-red-600 hover:bg-red-700"
									>
										Scam!
									</Button>
								</div>
							) : (
								<AnswerCard
									isCorrect={
										userAnswer === quizQuestions[currentQuestion].isScam
									}
									explanation={quizQuestions[currentQuestion].explanation}
									onNext={() => {
										setCurrentQuestion((prev) => prev + 1);
										setShowExplanation(false);
										setUserAnswer(null);
									}}
								/>
							)}
						</motion.div>
					</AnimatePresence>
				</CardContent>
			</Card>
		</motion.div>
	);
}
