"use client";
import Quiz from "@/components/quiz/Quiz";
import React, { useState, useEffect } from "react";
import { useQuizStore } from "@/store/quizStore";
import Question from "@/components/quiz/Question";
import { useRouter } from "next/navigation";

export default function Page() {
	const {
		quizComplete,
		isAnswerCorrect,
		currentQuestion,
		totalQuestions,
		setQuizComplete,
		setIsAnswerCorrect,
	} = useQuizStore();

	const [loading, setLoading] = useState(true);
	const [quizRendered, setQuizRendered] = useState(false);
	const [isScenarioComplete, setIsScenarioComplete] = useState(false);
	const [hideQuestion, setHideQuestion] = useState(false);
	const [bgColor, setBgColor] = useState<string | null>(null);
	const router = useRouter();

	const handleScenarioComplete = (complete: boolean) => {
		setIsScenarioComplete(complete);
	};

	useEffect(() => {
		setLoading(true);
		setHideQuestion(false);
		const timer = setTimeout(() => {
			setLoading(false);
			setQuizRendered(true);
		}, 1000);
		return () => clearTimeout(timer);
	}, [currentQuestion]);

	// Watch for changes in isAnswerCorrect and update bgColor
	useEffect(() => {
		if (isAnswerCorrect === true) {
			setBgColor("bg-gradient-to-br from-green-100 to-emerald-200");
		} else if (isAnswerCorrect === false) {
			setBgColor("bg-gradient-to-br from-red-200 to-red-300");
		}
	}, [isAnswerCorrect]);

	const getBgColor = () => {
		return bgColor || "bg-[#FFE4CC]"; // Default color if bgColor is null
	};

	const renderQuizResult = () => {
		if (
			quizComplete &&
			currentQuestion === totalQuestions - 1 &&
			loading === false
		) {
			return null;
		}
	};

	const handleNext = () => {
		setHideQuestion(true);
		setIsScenarioComplete(false);
		setLoading(true);
		setIsAnswerCorrect(null);
		setBgColor(null); // Reset background color
	};

	useEffect(() => {
		if (currentQuestion >= totalQuestions) {
			setQuizComplete(true);
			router.push("/result");
		}
	}, [currentQuestion, totalQuestions, setQuizComplete, router]);

	return (
		<>
			{/* Mobile Layout */}
			<div className="lg:hidden">
				<main className="flex flex-col justify-between gap-6 w-full sm:w-11/12 lg:w-2/3 tw-box lg:min-h-[calc(100vh-120px)] h-fit mx-auto">
					<Quiz
						key={currentQuestion}
						onScenarioComplete={handleScenarioComplete}
					/>

					{renderQuizResult() ||
						(quizRendered && !hideQuestion && isScenarioComplete && (
							<div
								className={`fixed bottom-0 left-0 right-0 
                  min-h-[50vh] px-4 py-8 
                  w-full z-50 shadow-lg rounded-t-3xl 
                  overflow-hidden transition-colors duration-500
                  ${getBgColor()}
                `}
							>
								{loading ? (
									<div className="flex items-center justify-center">
										<p>Loading new scenario...</p>
									</div>
								) : (
									<Question
										questionIndex={currentQuestion}
										onNext={handleNext}
									/>
								)}
							</div>
						))}
				</main>
			</div>

			{/* Desktop Layout */}
			<div className="hidden lg:block min-h-screen pt-[7rem]">
				<div className="container max-w-7xl mx-auto flex min-h-[calc(100vh-7rem)] justify-center items-center bg-yellow-50 overflow-hidden rounded-xl shadow-lg">
					<div className="w-1/2 p-8 overflow-y-auto h-full">
						<Quiz
							key={currentQuestion}
							onScenarioComplete={handleScenarioComplete}
						/>
					</div>

					<div
						className={`w-1/2 p-8 ${getBgColor()} h-full transition-colors duration-500`}
					>
						{renderQuizResult() ||
							(quizRendered && !hideQuestion && isScenarioComplete && (
								<Question questionIndex={currentQuestion} onNext={handleNext} />
							))}

						{loading && (
							<div className="flex items-center justify-center h-full">
								<p>Loading new scenario...</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
