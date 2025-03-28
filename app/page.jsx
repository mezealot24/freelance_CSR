"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@/context/UserContext";

export default function Home() {
	const { userID, setUserID, clearUserData } = useUser();
	const initialized = useRef(false);

	useEffect(() => {
		if (initialized.current) return;

		const initializeUser = () => {
			clearUserData();
			const newUserId = uuidv4();
			setUserID(newUserId);
		};

		// เรียกใช้เฉพาะตอนที่ component mount ครั้งแรกเท่านั้น
		initializeUser();
		initialized.current = true;
	}, []); // ให้ทำงานเพียงครั้งเดียวตอน mount

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-yellow-400 to-yellow-500 p-4 text-center">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-3xl rounded-xl bg-white p-8 shadow-xl"
			>
				<div className="mb-8 flex flex-col items-center justify-center space-y-4">
					<motion.h1
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className="text-4xl font-bold text-gray-800"
					>
						Behind{" "}
						<span className="relative">
							the{" "}
							<span className="relative">
								Screen
								<motion.span
									initial={{ rotate: 0, opacity: 0 }}
									animate={{ rotate: 12, opacity: 1 }}
									transition={{ delay: 0.5, duration: 0.3 }}
									className="absolute -right-2 -top-2 h-8 w-16 rounded-full border-2 border-yellow-400"
								></motion.span>
							</span>
						</span>
					</motion.h1>
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ delay: 0.3, duration: 0.5 }}
						className="mt-4 flex justify-center"
					>
						<img
							src="/placeholder.svg?height=200&width=300"
							alt="Digital devices illustration"
							className="h-48 w-auto"
						/>
					</motion.div>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4, duration: 0.5 }}
						className="mt-6 max-w-lg"
					>
						<h2 className="text-xl font-semibold text-gray-800">
							เลือกว่าสถานการณ์ใดปลอดภัยหรือเป็นการหลอกลวง
						</h2>
						<p className="mt-2 text-zinc-600">
							และโปรดจำไว้ว่า
							การสนทนาเหล่านี้สามารถเกิดขึ้นได้ทุกที่—ทางโทรศัพท์ ข้อความ
							หรือออนไลน์
						</p>
					</motion.div>
				</div>
				<Link href="/quiz">
					<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<Button className="mt-4 bg-gray-900 px-8 py-6 text-lg font-medium hover:bg-gray-800">
							เริ่มเล่นเลย!
						</Button>
					</motion.div>
				</Link>
			</motion.div>
		</div>
	);
}
