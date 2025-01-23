"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChatBubble } from "@/components/ChatBubble";
import { chatMessages } from "@/data/chatMessages";
import Underline from "@/components/ui/Underline";
import { useQuizStore } from "@/store/quizStore";

interface QuizProps {
	showExplanation?: boolean;
	setQuizComplete?: () => void;
}

const Quiz = () => {
	const { setQuizComplete } = useQuizStore();
	const [visibleCount, setVisibleCount] = useState(0);
	const [showPrompt, setShowPrompt] = useState(false);
	const [isScenarioComplete, setIsScenarioComplete] = useState(false);

	// Effect for rendering chat messages
	useEffect(() => {
		const timer = setInterval(() => {
			setVisibleCount((prev) => {
				if (prev < chatMessages.length) {
					return prev + 1;
				}
				clearInterval(timer);
				setShowPrompt(true);
				return prev;
			});
		}, 2000);

		return () => clearInterval(timer);
	}, []);

	// Effect for checking if quiz scenarios are complete
	useEffect(() => {
		if (visibleCount === chatMessages.length && showPrompt) {
			setIsScenarioComplete(true);
			setQuizComplete(true);
		}
	}, [visibleCount, showPrompt, setQuizComplete]);

	const visibleMessages = chatMessages.slice(0, visibleCount);

	return (
		<div className="max-h-[80vh] overflow-hidden">
			<div className="relative h-[70vh] mx-auto max-w-xl bg-rose-100 p-4 rounded-[60px] shadow-lg border-8 border-gray-400">
				<div className="relative h-full flex flex-col justify-between">
					<motion.div
						className="absolute inset-0 m-[12px] p-4 rounded-[24px] overflow-y-auto"
						initial="hidden"
						animate="visible"
					>
						<div className="space-y-4">
							{visibleMessages.map((chat) => (
								<ChatBubble key={chat.id} {...chat} />
							))}
						</div>
					</motion.div>
				</div>
			</div>
			<Underline className="w-full mt-4" />

			{/* Show a completion message or additional content if the scenario is complete */}
			{isScenarioComplete && (
				<div className="text-center mt-4">
					<p className="text-green-600 font-bold">
						Scenario Quiz Render Completed!
					</p>
				</div>
			)}
		</div>
	);
};

export default Quiz;
