"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { quizData } from "@/lib/quiz-data";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
	AlertTriangle,
	Smartphone,
	MessageCircle,
	ChevronLeft,
	Battery,
	Signal,
	Wifi,
} from "lucide-react";
import { useQuizStore } from "@/store/quizStore";
import { useUser } from "@/context/UserContext";
import { v4 as uuidv4 } from "uuid";
import { checkRouteProtection, checkQuizAttempt } from "@/lib/route-protection";

export default function QuizPage() {
	const router = useRouter();
	const { userID, setUserID, setQuizStarted, setQuizCompleted } = useUser();
	const quizStore = useQuizStore();
	const [isLoading, setIsLoading] = useState(true);
	const [animateAnswer, setAnimateAnswer] = useState(null);
	const feedbackRef = useRef(null);
	const hasSetQuizStarted = useRef(false);
	const hasRedirectedToSurvey = useRef(false);

	const {
		score,
		currentQuestionIndex,
		selectedAnswer,
		showFeedback,
		quizComplete,
		bgColor,
		setScore,
		incrementScore,
		setCurrentQuestionIndex,
		setSelectedAnswer,
		setShowFeedback,
		setQuizComplete,
		setBgColor,
		resetQuiz,
		nextQuestion,
		addAnswer,
		loadProgress,
	} = quizStore;

	const isMobile = useMediaQuery("(max-width: 640px)");
	const isTablet = useMediaQuery("(max-width: 1024px)");
	const isMediumUp = useMediaQuery("(min-width: 768px)");

	const currentQuestion = quizData[currentQuestionIndex];
	const progress = (currentQuestionIndex / quizData.length) * 100;

	// แยก useEffect ออกเป็นส่วนๆ เพื่อป้องกัน infinite loop
	// ใช้ useLayoutEffect สำหรับการตั้งค่าเริ่มต้นที่จำเป็นต้องทำก่อนการ render
	useLayoutEffect(() => {
		// ตรวจสอบการป้องกันเส้นทาง
		const { allowed, redirectTo } = checkRouteProtection();
		if (!allowed) {
			router.push(redirectTo);
			return;
		}

		// ถ้าไม่มี userID ให้สร้าง userID ใหม่
		if (!userID) {
			const newUserId = uuidv4();
			setUserID(newUserId);
			localStorage.setItem("userID", newUserId);
		}

		// ตั้งค่าเริ่มต้นสำหรับสถานะ quiz started
		if (!hasSetQuizStarted.current && !localStorage.getItem("quizStarted")) {
			setQuizStarted(true);
			hasSetQuizStarted.current = true;
		}
	}, []);

	// แยก useEffect สำหรับการโหลดข้อมูลแบบทดสอบ
	useEffect(() => {
		// ไม่ต้องทำงานถ้ายังไม่มี userID หรือมีการโหลดข้อมูลอยู่แล้ว
		if (!userID || !hasSetQuizStarted.current) return;

		const loadQuizData = async () => {
			try {
				// ตรวจสอบว่าผู้ใช้เคยทำแบบทดสอบแล้วหรือไม่
				const { hasCompleted, incompleteAttempt } = await checkQuizAttempt(
					userID || localStorage.getItem("userID")
				);

				if (hasCompleted) {
					// ถ้าเคยทำแบบทดสอบแล้ว ให้ไปที่หน้าผลลัพธ์
					alert("คุณได้ทำแบบทดสอบนี้ไปแล้ว");
					router.push("/result");
				} else if (incompleteAttempt) {
					// ถ้ามีการทำแบบทดสอบที่ยังไม่เสร็จ ให้โหลดข้อมูลและดำเนินการต่อ
					await loadProgress(userID || localStorage.getItem("userID"));
					setIsLoading(false);
				} else {
					// ถ้าไม่เคยทำแบบทดสอบ ให้เริ่มทำแบบทดสอบใหม่
					resetQuiz();
					setIsLoading(false);
				}
			} catch (error) {
				console.error("Error loading quiz data:", error);
				setIsLoading(false);
			}
		};

		loadQuizData();
	}, [userID, router, resetQuiz, loadProgress]);

	useEffect(() => {
		if (!currentQuestion) return;

		setBgColor(currentQuestion.backgroundColor || "#FECDD3");
	}, [currentQuestionIndex, currentQuestion, setBgColor]);

	useEffect(() => {
		if (!quizComplete || hasRedirectedToSurvey.current) return;

		const completeQuiz = async () => {
			try {
				// ตั้งค่า ref เพื่อป้องกัน infinite loop
				hasRedirectedToSurvey.current = true;

				// ตั้งค่าสถานะแบบทดสอบเสร็จสิ้น
				setQuizCompleted(true);

				// หน่วงเวลาเล็กน้อยก่อนการ redirect
				await new Promise((resolve) => setTimeout(resolve, 100));

				// redirect ไปยังหน้า survey
				router.push("/survey");
			} catch (error) {
				console.error("Error completing quiz:", error);
				hasRedirectedToSurvey.current = false; // รีเซ็ตค่า ref หากเกิดข้อผิดพลาด
			}
		};

		completeQuiz();
	}, [quizComplete, router, setQuizCompleted]);

	// เมื่อ feedback แสดงขึ้น ให้เลื่อนไปที่ feedback (สำหรับหน้าจอขนาดใหญ่)
	useEffect(() => {
		if (!showFeedback || !feedbackRef.current || isMobile) return;

		feedbackRef.current.scrollIntoView({
			behavior: "smooth",
			block: "center",
		});
	}, [showFeedback, isMobile]);

	const handleAnswerSelect = (answer) => {
		if (showFeedback) return;
		setSelectedAnswer(answer);

		// เพิ่มเอฟเฟกต์แอนิเมชันเมื่อคลิกคำตอบ
		setAnimateAnswer(answer);
		setTimeout(() => setAnimateAnswer(null), 300);
	};

	const handleCheckAnswer = (option) => {
		if (showFeedback) return;

		setSelectedAnswer(option);
		setShowFeedback(true);

		const isCorrect = option === currentQuestion.correctAnswer;
		if (isCorrect) {
			incrementScore();
		}

		// บันทึกคำตอบ
		addAnswer(currentQuestion.id, option, isCorrect);
	};

	const handleNextQuestion = () => {
		nextQuestion();
	};

	const handleResetQuiz = () => {
		resetQuiz();
	};

	// แสดงหน้าแบบทดสอบ
	if (isLoading || !currentQuestion) {
		return (
			<div
				className="min-h-screen flex items-center justify-center"
				style={{ backgroundColor: bgColor }}
			>
				<div className="text-center p-8 bg-white rounded-lg shadow-lg">
					<div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
					<p className="text-lg font-medium">กำลังโหลดแบบทดสอบ...</p>
				</div>
			</div>
		);
	}

	const renderLineChat = () => (
		<Card className="overflow-hidden p-0 h-full">
			<div className="flex flex-col h-full">
				<div className="sticky top-0 z-10 flex items-center justify-between bg-blue-500 p-3 text-white">
					<div className="flex items-center space-x-2">
						<span className="font-medium">
							{currentQuestion.messages[0].name || "Chat"}
						</span>
					</div>
					<div className="flex items-center space-x-2">
						<span className="text-xs">99+</span>
					</div>
				</div>

				<div
					className="flex flex-col space-y-4 p-4 flex-grow"
					style={{ minHeight: isMediumUp ? "400px" : "300px" }}
				>
					<AnimatePresence>
						{currentQuestion.messages.map((message, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.3 }}
								className={`flex ${
									message.isUser ? "justify-end" : "justify-start"
								}`}
							>
								<div
									className={`flex max-w-[80%] ${
										message.isUser ? "flex-row-reverse" : "flex-row"
									}`}
								>
									{!message.isUser && message.avatar && (
										<div className="mr-2 h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
											<img
												src={
													message.avatar ||
													"/placeholder.svg?height=50&width=50"
												}
												alt="Avatar"
												className="h-full w-full object-cover"
											/>
										</div>
									)}
									<div
										className={`relative rounded-lg p-3 ${
											message.isUser
												? "bg-blue-100 text-blue-900"
												: message.isScammer
												? "bg-green-400 text-green-900"
												: "bg-gray-100"
										}`}
									>
										{message.isScammer && (
											<div className="absolute -right-1 -top-1 rounded-full bg-red-500 p-1 text-white">
												<AlertTriangle className="h-3 w-3" />
											</div>
										)}
										<div className="whitespace-pre-line">{message.text}</div>
									</div>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			</div>
		</Card>
	);

	const renderSmsChat = () => (
		<Card className="overflow-hidden p-0 h-full">
			<div className="flex flex-col h-full">
				{/* Mobile phone status bar */}
				<div className="sticky top-0 z-10 flex items-center justify-between bg-gray-800 p-2 text-white">
					<div className="flex items-center space-x-2">
						<Signal className="h-3 w-3" />
						<span className="text-xs">4G</span>
					</div>
					<div className="text-xs">9:41</div>
					<div className="flex items-center space-x-2">
						<Wifi className="h-3 w-3" />
						<Battery className="h-3 w-3" />
					</div>
				</div>

				{/* SMS app header */}
				<div className="flex items-center bg-gray-100 p-3">
					<ChevronLeft className="mr-2 h-5 w-5" />
					<div className="flex-1">
						<div className="font-medium">
							{currentQuestion.messages[0].name || "Unknown"}
						</div>
						<div className="text-xs text-gray-500">SMS/MMS</div>
					</div>
				</div>

				{/* SMS messages */}
				<div
					className="flex flex-col space-y-4 bg-gray-50 p-4 flex-grow"
					style={{ minHeight: isMediumUp ? "400px" : "300px" }}
				>
					<AnimatePresence>
						{currentQuestion.messages.map((message, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.3 }}
								className={`flex ${
									message.isUser ? "justify-end" : "justify-start"
								}`}
							>
								<div className={`max-w-[80%]`}>
									<div
										className={`relative rounded-2xl p-3 ${
											message.isUser
												? "bg-blue-500 text-white"
												: "bg-gray-200 text-gray-800"
										}`}
									>
										{message.isScammer && (
											<div className="absolute -right-1 -top-1 rounded-full bg-red-500 p-1 text-white">
												<AlertTriangle className="h-3 w-3" />
											</div>
										)}
										<div className="whitespace-pre-line">{message.text}</div>
									</div>
									<div className="mt-1 text-xs text-gray-500">
										{message.timestamp || ""}
									</div>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			</div>
		</Card>
	);

	const renderQA = () => (
		<Card className="p-6 h-full flex flex-col">
			<div className="mb-4 flex items-center justify-center space-x-2">
				<div
					className={`flex items-center rounded-full ${
						currentQuestion.messageType === "line"
							? "bg-blue-100 text-blue-800"
							: "bg-gray-100 text-gray-800"
					} px-3 py-1`}
				>
					{currentQuestion.messageType === "line" ? (
						<>
							<MessageCircle className="mr-1 h-4 w-4" />
							<span className="text-sm font-medium">LINE Chat</span>
						</>
					) : (
						<>
							<Smartphone className="mr-1 h-4 w-4" />
							<span className="text-sm font-medium">SMS</span>
						</>
					)}
				</div>
			</div>

			<h3 className="mb-6 text-xl font-semibold">{currentQuestion.scenario}</h3>

			<div className="space-y-3 mb-6 flex-grow">
				{currentQuestion.options.map((option) => (
					<motion.button
						key={option}
						onClick={() => {
							handleAnswerSelect(option);
							if (!showFeedback) {
								setTimeout(() => {
									handleCheckAnswer(option);
								}, 300);
							}
						}}
						whileTap={{ scale: 0.95 }}
						animate={animateAnswer === option ? { scale: [1, 1.05, 1] } : {}}
						className={`w-full rounded-lg border-2 p-3 text-left transition-all ${
							selectedAnswer === option
								? option.includes("ปลอดภัย")
									? "border-green-500 bg-green-50"
									: "border-gray-900 bg-gray-50"
								: "border-gray-200 hover:border-gray-300"
						}`}
						disabled={showFeedback}
					>
						{option}
					</motion.button>
				))}
			</div>

			{showFeedback && (
				<motion.div
					ref={feedbackRef}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mt-auto"
				>
					<div
						className={`mb-4 rounded-lg p-4 ${
							selectedAnswer === currentQuestion.correctAnswer
								? "bg-green-100 text-green-800"
								: "bg-red-100 text-red-800"
						}`}
					>
						<h3 className="mb-2 text-lg font-bold">
							{selectedAnswer === currentQuestion.correctAnswer
								? "ถูกต้อง!"
								: "ไม่ถูกต้อง!"}
						</h3>
						<p>{currentQuestion.explanation}</p>
					</div>
					<Button onClick={handleNextQuestion} className="w-full">
						{currentQuestionIndex < quizData.length - 1
							? "คำถามถัดไป"
							: "ดูผลลัพธ์"}
					</Button>
				</motion.div>
			)}
		</Card>
	);

	return (
		<div
			className="flex min-h-screen flex-col items-center justify-center p-4 transition-colors duration-500"
			style={{ backgroundColor: bgColor }}
		>
			<div className="w-full max-w-6xl">
				<div className="mb-4 flex items-center justify-between">
					<Button
						variant="outline"
						size="sm"
						onClick={handleResetQuiz}
						className="bg-white bg-opacity-80"
					>
						เริ่มใหม่
					</Button>
					<div className="rounded-full bg-white px-4 py-1 text-sm font-medium">
						คำถามที่ {currentQuestionIndex + 1} จาก {quizData.length}
					</div>
				</div>

				<Progress value={progress} className="mb-6 h-2" />

				{isMediumUp ? (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="h-full">
							{currentQuestion.messageType === "line"
								? renderLineChat()
								: renderSmsChat()}
						</div>
						<div className="h-full">{renderQA()}</div>
					</div>
				) : (
					<div className="space-y-6">
						<div className="mb-4 flex items-center justify-center space-x-2">
							<div
								className={`flex items-center rounded-full ${
									currentQuestion.messageType === "line"
										? "bg-blue-100 text-blue-800"
										: "bg-gray-100 text-gray-800"
								} px-3 py-1`}
							>
								{currentQuestion.messageType === "line" ? (
									<>
										<MessageCircle className="mr-1 h-4 w-4" />
										<span className="text-sm font-medium">LINE Chat</span>
									</>
								) : (
									<>
										<Smartphone className="mr-1 h-4 w-4" />
										<span className="text-sm font-medium">SMS</span>
									</>
								)}
							</div>
						</div>

						{currentQuestion.messageType === "line"
							? renderLineChat()
							: renderSmsChat()}

						<div className="p-4">
							<h3 className="mb-4 text-center text-lg font-semibold">
								{currentQuestion.scenario}
							</h3>
							<div className="flex flex-wrap justify-center gap-3">
								{currentQuestion.options.map((option) => (
									<motion.button
										key={option}
										onClick={() => {
											handleAnswerSelect(option);
											if (!showFeedback) {
												setTimeout(() => {
													handleCheckAnswer(option);
												}, 300);
											}
										}}
										whileTap={{ scale: 0.95 }}
										animate={
											animateAnswer === option ? { scale: [1, 1.05, 1] } : {}
										}
										className={`rounded-full px-6 py-3 font-medium transition-all ${
											selectedAnswer === option
												? option.includes("ปลอดภัย")
													? "bg-green-500 text-white"
													: "bg-gray-900 text-white"
												: "bg-white hover:bg-gray-100"
										}`}
										disabled={showFeedback}
									>
										{option}
									</motion.button>
								))}
							</div>
						</div>

						{showFeedback && (
							<motion.div
								initial={{ opacity: 0, y: 100 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ type: "spring", stiffness: 300, damping: 30 }}
								className="fixed inset-x-0 bottom-0 z-50 rounded-t-xl bg-white p-6 shadow-lg"
							>
								<div className="text-center">
									<h3 className="mb-2 text-xl font-bold">
										{selectedAnswer === currentQuestion.correctAnswer
											? "ถูกต้อง!"
											: "ไม่ถูกต้อง!"}
									</h3>
									<h4 className="mb-2 text-lg font-semibold">
										{selectedAnswer === currentQuestion.correctAnswer
											? "นี่เป็นการหลอกลวง!"
											: "นี่เป็นการหลอกลวง!"}
									</h4>
									<div className="mx-auto mb-4 h-1 w-16 bg-gray-900"></div>
									<p className="mb-4">{currentQuestion.explanation}</p>
									<Button
										onClick={handleNextQuestion}
										className="w-full bg-gray-900 hover:bg-gray-800"
									>
										{currentQuestionIndex < quizData.length - 1
											? "คำถามถัดไป"
											: "ดูผลลัพธ์"}
									</Button>
								</div>
							</motion.div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
