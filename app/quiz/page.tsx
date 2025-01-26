"use client";
import Quiz from "@/components/quiz/Quiz";
import React, { useRef, useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useQuizStore } from "@/store/quizStore";
import Question from "@/components/quiz/Question";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const slideAnimation: Variants = {
	initial: { y: "100%" },
	animate: { y: 0 },
	exit: { y: "100%" },
};

export default function Page() {
	const {
		quizComplete,
		isAnswerCorrect,
		currentQuestion,
		totalQuestions,
		setQuizComplete,
	} = useQuizStore();
	const { resetQuiz } = useQuizStore();
	const questionContainerRef = useRef<HTMLDivElement>(null);
	const [loading, setLoading] = useState(true);
	const [quizRendered, setQuizRendered] = useState(false);
	const [isScenarioComplete, setIsScenarioComplete] = useState(false);
	const [hideQuestion, setHideQuestion] = useState(false);
	const router = useRouter(); // Initialize useRouter

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

	const getBgColor = () => {
		if (isAnswerCorrect === false)
			return "bg-gradient-to-br from-red-100 to-red-200";
		if (isAnswerCorrect === true)
			return "bg-gradient-to-br from-green-100 to-emerald-200";
		return "bg-[#FFE6C9]";
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
	};

	const handleStartOver = () => {
		// Reset quiz state and local storage
		resetQuiz();

		// Additional reset for specific states in this component
		setLoading(true);
		setQuizRendered(false);
		setIsScenarioComplete(false);
		setHideQuestion(false);
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
				<main className="min-h-screen flex items-center justify-center pt-[6rem]">
					<div className="container mx-auto px-4 py-8">
						<Button
							onClick={handleStartOver}
							className="bg-blue-500 hover:bg-blue-600 text-white"
						>
							Start Over
						</Button>
						<div className="grid grid-cols-1 gap-8">
							{/* Render Quiz */}
							<Quiz
								key={currentQuestion}
								onScenarioComplete={handleScenarioComplete}
							/>

							{/* Render Question only when Quiz and Scenario are ready */}
							{renderQuizResult() ||
								(quizRendered && !hideQuestion && isScenarioComplete && (
									<motion.div
										ref={questionContainerRef}
										variants={slideAnimation}
										initial="initial"
										animate="animate"
										exit="exit"
										drag="y"
										dragConstraints={{
											top: 0,
											bottom: 500,
										}}
										dragElastic={0.3}
										className={`fixed bottom-0 left-0 right-0 
                      max-h-full min-h-[300px] px-4 py-8 
                      w-full z-50 shadow-lg rounded-t-3xl 
                      overflow-hidden transition-colors duration-500
                      ${getBgColor()}
                    `}
									>
										<div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-orange-500 rounded-full cursor-grab" />
										{loading ? (
											<div className="flex items-center justify-center h-full">
												<p>Loading...</p>
											</div>
										) : (
											<Question
												questionIndex={currentQuestion}
												onNext={handleNext}
											/>
										)}
									</motion.div>
								))}
						</div>
					</div>
				</main>
			</div>

			{/* Desktop Layout */}
			<div className="hidden lg:block min-h-screen pt-[7rem]">
				<div
					className="
            container 
            max-w-7xl 
            mx-auto 
            flex 
            min-h-[calc(100vh-7rem)] 
            justify-center 
            items-center 
            bg-yellow-50 
            overflow-hidden
            rounded-xl
            shadow-lg
          "
				>
					{/* Left Side: Quiz */}
					<div className="w-1/2 p-8 overflow-y-auto h-full">
						<Quiz
							key={currentQuestion}
							onScenarioComplete={handleScenarioComplete}
						/>
					</div>

					{/* Right Side: Question */}
					<div className="w-1/2 p-8 bg-yellow-100 h-full">
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
