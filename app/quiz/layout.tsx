"use client";
import React, { useRef, useState } from "react";
import { motion, Variants, PanInfo } from "framer-motion";
import Quiz from "./page";
import Question from "@/components/quiz/Question";
import { useQuizStore } from "@/store/quizStore";

export default function QuizLayout() {
	const { quizComplete } = useQuizStore();
	const questionContainerRef = useRef<HTMLDivElement>(null);
	const [dragPosition, setDragPosition] = useState(0);

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

	const handleDragEnd = (
		event: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo
	) => {
		const containerHeight = questionContainerRef.current?.clientHeight || 0;
		const dragThreshold = containerHeight * 0.5; // 50% drag down threshold

		if (info.offset.y > dragThreshold) {
			// Limit drag down to keep snap point visible
			setDragPosition(dragThreshold);
		} else {
			// Snap back to original position
			setDragPosition(0);
		}
	};

	return (
		<main className="max-h-screen bg-yellow-50 relative">
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 gap-8">
					<Quiz />

					{quizComplete && (
						<motion.div
							ref={questionContainerRef}
							variants={slideAnimation}
							initial="initial"
							animate="animate"
							exit="exit"
							drag="y"
							dragConstraints={{
								top: 0,
								bottom: 275, // Limit bottom drag to 100px from bottom
							}}
							dragElastic={0.3}
							className="fixed bottom-0 left-0 right-0 h-[40vh] min-h-[300px] max-h-[500px] w-full z-50 bg-yellow-100 shadow-lg rounded-t-3xl overflow-hidden"
						>
							<div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-orange-500 rounded-full cursor-grab"></div>
							<Question />
						</motion.div>
					)}
				</div>
			</div>
		</main>
	);
}
