"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChatBubble } from "@/components/ChatBubble";
import { quizQuestions } from "@/data/quizQuestions";
import Underline from "@/components/ui/Underline";
import { useQuizStore } from "@/store/quizStore";

const Quiz = ({
	onScenarioComplete = () => {},
}: {
	onScenarioComplete?: (complete: boolean) => void;
}) => {
	const { currentQuestion, setQuizComplete } = useQuizStore();
	const [visibleCount, setVisibleCount] = useState(0);
	const [showPrompt, setShowPrompt] = useState(false);
	const [isScenarioComplete, setIsScenarioComplete] = useState(false);
	const lastMessageRef = useRef<HTMLDivElement>(null);

	const chatMessages = quizQuestions[currentQuestion].chatScenario;

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
	}, [chatMessages]);

	useEffect(() => {
		if (
			visibleCount === chatMessages.length &&
			showPrompt &&
			!isScenarioComplete
		) {
			setIsScenarioComplete(true);
			setQuizComplete(true);
			onScenarioComplete(true);
		}
	}, [
		visibleCount,
		chatMessages.length,
		showPrompt,
		isScenarioComplete,
		setQuizComplete,
		onScenarioComplete,
	]);

	const visibleMessages = chatMessages.slice(0, visibleCount);

	useEffect(() => {
		if (visibleMessages.length && lastMessageRef.current) {
			lastMessageRef.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}
	}, [visibleMessages]);

	return (
		<div className="max-h-[80vh] overflow-hidden ">
			<div className="relative h-[70vh] mx-auto max-w-xl bg-rose-100 p-4 rounded-[60px] shadow-lg border-8 border-pink-300">
				<div className="relative h-full flex flex-col justify-between">
					<motion.div
						className="absolute inset-0 m-[12px] p-4 rounded-[24px] overflow-y-auto scroll-smooth"
						initial="hidden"
						animate="visible"
					>
						{visibleMessages.map((message, index) => (
							<motion.div
								key={message.id}
								className="mb-4 flex items-start justify-end gap-2"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.5,
									delay: index * 0.3,
									ease: "easeOut",
								}}
							>
								<div className="flex flex-col">
									<ChatBubble
										message={message.message}
										type={message.type}
										avatar={message.avatar}
									/>
								</div>
							</motion.div>
						))}
						<div ref={lastMessageRef} />
					</motion.div>
				</div>
			</div>
			<Underline className="w-full mt-4" />

			{isScenarioComplete && (
				<div className="text-center mt-4 lg:hidden">
					<p className="text-green-600 font-bold">
						Slide up to answer the question
					</p>
				</div>
			)}
		</div>
	);
};

export default Quiz;
