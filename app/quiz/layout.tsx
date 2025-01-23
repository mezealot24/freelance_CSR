"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import Quiz from "./page";
import Question from "@/components/quiz/Question";
import { useQuizStore } from "@/store/quizStore";

export default function QuizLayout() {
	const { quizComplete } = useQuizStore();

	console.log("Quiz Complete Status:", quizComplete); // Add debug log

	const slideAnimation: Variants = {
		initial: {
			opacity: 0,
			y: "100%",
		},
		animate: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 15,
			},
		},
		exit: {
			opacity: 0,
			y: "100%",
			transition: {
				duration: 0.5,
				ease: "easeInOut",
			},
		},
	};

	return (
		<main className="max-h-screen bg-yellow-50 relative">
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 gap-8">
					<Quiz />

					{quizComplete && (
						<motion.div
							variants={slideAnimation}
							initial="initial"
							animate="animate"
							exit="exit"
							className="fixed bottom-0 left-0 right-0 h-[50vh] w-full z-50 bg-yellow-50 shadow-lg rounded-t-3xl overflow-hidden"
						>
							<Question />
						</motion.div>
					)}
				</div>
			</div>
		</main>
	);
}
