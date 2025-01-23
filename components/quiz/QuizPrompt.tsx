// Code: Quiz Prompt

"use client";
import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

interface QuizPromptProps {
	onAnswer: (answer: boolean) => void;
	visible: boolean;
}

export const QuizPrompt = ({ onAnswer, visible }: QuizPromptProps) => {
	if (!visible) return null;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="mt-4 p-4 bg-gray-800 rounded-lg"
		>
			<h3 className="text-xl font-bold mb-4">Is this conversation a scam?</h3>
			<div className="flex gap-4">
				<Button
					onClick={() => onAnswer(false)}
					className="flex-1 py-3 bg-green-600 hover:bg-green-700 rounded-lg"
				>
					Safe
				</Button>
				<Button
					onClick={() => onAnswer(true)}
					className="flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-lg"
				>
					Scam!
				</Button>
			</div>
		</motion.div>
	);
};
