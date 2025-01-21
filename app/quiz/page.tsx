"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { chatMessages } from "@/data/chatMessages";
import { ChatBubble } from "@/components/ChatBubble";

export default function Quiz() {
	const [visibleCount, setVisibleCount] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setVisibleCount((prev) => {
				if (prev < chatMessages.length) {
					return prev + 1;
				}
				clearInterval(timer);
				return prev;
			});
		}, 2000); // 2 seconds between each message

		return () => clearInterval(timer);
	}, []);

	const visibleMessages = chatMessages.slice(0, visibleCount);
	return (
		<div className="container mx-auto min-h-screen px-4 py-8">
			<div className="">
				<h1 className="h1 mb-6 text-accent">Quiz</h1>
			</div>
			{/* Tablet Frame */}
			<div className="relative h-[80vh] mx-auto max-w-xl bg-gray-900 p-4 rounded-lg shadow-lg">
				<div className="relative h-full">
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

			{/* Centered underline */}
			<div className="flex justify-center my-8">
				<svg
					width="516"
					height="5"
					viewBox="-2 -2 516 5"
					className="mx-auto"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M0 0.35443C16.0031 0.35443 16.0031 0.93671 31.9971 0.93671C48.0003 0.93671 48.0003 0.715191 63.9943 0.715191C79.9974 0.715191 79.9974 0.177215 95.9914 0.177215C111.995 0.177215 111.995 0.727847 127.989 0.727847C143.992 0.727847 143.992 1 159.986 1C175.989 1 175.989 0.126581 191.983 0.126581C207.986 0.126581 207.986 0 223.98 0C239.983 0 239.983 0.70253 255.977 0.70253C271.971 0.70253 271.971 0.132911 287.974 0.132911C303.977 0.132911 303.977 0.512659 319.972 0.512659C335.975 0.512659 335.975 0.417721 351.969 0.417721C367.972 0.417721 367.972 0.132911 383.975 0.132911C399.978 0.132911 399.978 0.493672 415.981 0.493672C431.984 0.493672 431.984 0.132911 447.987 0.132911C463.991 0.132911 463.991 0.797468 479.994 0.797468C495.997 0.797468 495.997 0.905062 512 0.905062"
						stroke="black"
						strokeWidth="3"
						strokeMiterlimit="10"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>

			<Button
				className="btn-primary mx-auto block"
				onClick={() => (window.location.href = "/")}
			>
				Back to Home
			</Button>
		</div>
	);
}
