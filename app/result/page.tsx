"use client";
import React from "react";
import { useQuizStore } from "@/store/quizStore";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function QuizResultPage() {
	const { score, totalQuestions, resetQuiz } = useQuizStore();
	const router = useRouter();

	const calculatePercentage = () => {
		return Math.round((score / totalQuestions) * 100);
	};

	const getResultMessage = () => {
		const percentage = calculatePercentage();
		if (percentage === 100) return "Perfect Score! 🏆";
		if (percentage >= 80) return "Great Job! 👏";
		if (percentage >= 60) return "Good Effort! 👍";
		return "Keep Learning! 📚";
	};

	const handleRestartQuiz = () => {
		// Reset quiz state
		resetQuiz();

		// Clear local storage completely
		localStorage.clear();

		// Navigate back to the quiz page
		router.push("/quiz");
	};

	return (
		<section className="min-h-screen flex items-center justify-center">
			<Card className="container w-full mx-4 md:w-1/2 z-10">
				<CardHeader className="text-center">
					<h2 className="text-3xl font-bold">Quiz Results</h2>
				</CardHeader>
				<CardContent className="text-center space-y-6">
					<div className="bg-blue-100 p-6 rounded-xl">
						<p className="text-6xl font-bold text-blue-600">
							{score}/{totalQuestions}
						</p>
						<p className="text-xl mt-2">{getResultMessage()}</p>
					</div>

					<div>
						<p className="text-lg">Your Score: {calculatePercentage()}%</p>
					</div>

					<Button
						onClick={handleRestartQuiz}
						className="w-full bg-green-600 hover:bg-green-700 text-white"
					>
						Restart Quiz
					</Button>
				</CardContent>
			</Card>
		</section>
	);
}
