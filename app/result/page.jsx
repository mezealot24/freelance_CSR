"use client";

import { useEffect, useState } from "react";
import { useQuizStore } from "@/store/quizStore";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { motion } from "framer-motion";
import { checkRouteProtection } from "@/lib/route-protection";
import {
	Share2,
	Trophy,
	Award,
	BookOpen,
	CheckCircle2,
	Home,
} from "lucide-react";
import Link from "next/link";

export default function QuizResultPage() {
	const router = useRouter();
	const { userID, clearUserData } = useUser();
	const { score, totalQuestions, resetQuiz } = useQuizStore();
	const [showThankYou, setShowThankYou] = useState(false);

	useEffect(() => {
		// ตรวจสอบการป้องกันเส้นทาง
		const { allowed, redirectTo } = checkRouteProtection();
		if (!allowed) {
			router.push(redirectTo);
		}

		// แสดงหน้า Thank You หลังจาก 6 วินาที
		const timer = setTimeout(() => {
			setShowThankYou(true);
		}, 6000);

		return () => clearTimeout(timer);
	}, [router]);

	const calculatePercentage = () => {
		return Math.round((score / totalQuestions) * 100);
	};

	const getResultMessage = () => {
		const percentage = calculatePercentage();
		if (percentage === 100) return "คะแนนเต็ม! 🏆";
		if (percentage >= 80) return "ยอดเยี่ยม! 👏";
		if (percentage >= 60) return "ดีมาก! 👍";
		return "ยังมีโอกาสพัฒนา! 📚";
	};

	const getResultIcon = () => {
		const percentage = calculatePercentage();
		if (percentage === 100)
			return <Trophy className="h-12 w-12 text-yellow-500" />;
		if (percentage >= 80) return <Award className="h-12 w-12 text-blue-500" />;
		if (percentage >= 60) return <Award className="h-12 w-12 text-green-500" />;
		return <BookOpen className="h-12 w-12 text-purple-500" />;
	};

	const handleStartOver = () => {
		// ล้างข้อมูลผู้ใช้และข้อมูลแบบทดสอบ
		clearUserData();
		resetQuiz();

		// ไปยังหน้าหลัก
		router.push("/");
	};

	const handleTryAgain = () => {
		resetQuiz();
		router.push("/quiz");
	};

	const handleShare = () => {
		if (navigator.share) {
			navigator
				.share({
					title: "ผลการทดสอบ Behind the Screen",
					text: `ฉันได้คะแนน ${score}/${totalQuestions} (${calculatePercentage()}%) ในการทดสอบความรู้เกี่ยวกับการหลอกลวงออนไลน์!`,
					url: window.location.href,
				})
				.catch((error) => console.log("Error sharing", error));
		} else {
			alert("ฟีเจอร์การแชร์ไม่รองรับในเบราว์เซอร์นี้");
		}
	};

	// แสดงหน้า Thank You หลังจากเวลาที่กำหนด
	if (showThankYou) {
		return (
			<section
				className="min-h-screen flex items-center justify-center p-4"
				style={{ backgroundColor: "#f0f9ff" }}
			>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="w-full max-w-3xl"
				>
					<Card className="shadow-lg overflow-hidden">
						<div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 text-white">
							<h2 className="text-3xl font-bold">ขอบคุณสำหรับการทำแบบทดสอบ</h2>
						</div>

						<CardContent className="p-8 text-center">
							<motion.div
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ delay: 0.2, duration: 0.5 }}
								className="mb-6 flex justify-center"
							>
								<div className="bg-green-100 p-4 rounded-full">
									<CheckCircle2 className="h-16 w-16 text-green-600" />
								</div>
							</motion.div>

							<h3 className="text-2xl font-bold mb-4">
								บันทึกข้อมูลเรียบร้อยแล้ว
							</h3>

							<div className="max-w-lg mx-auto">
								<p className="text-lg mb-6">
									ขอบคุณที่ร่วมทำแบบทดสอบและแบบสอบถาม
									ข้อมูลของคุณจะช่วยให้เราพัฒนาเครื่องมือในการป้องกันการหลอกลวงออนไลน์ได้ดียิ่งขึ้น
								</p>

								<div className="my-4 p-4 bg-blue-50 rounded-lg">
									<p className="font-medium">
										คะแนนของคุณ: {score}/{totalQuestions} (
										{calculatePercentage()}%)
									</p>
								</div>

								<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-left">
									<h4 className="font-semibold mb-2">
										คำแนะนำเพื่อความปลอดภัยออนไลน์:
									</h4>
									<ul className="list-disc pl-5 space-y-1 text-gray-700">
										<li>ระมัดระวังข้อความหรืออีเมลที่มาจากแหล่งที่ไม่รู้จัก</li>
										<li>
											ไม่คลิกลิงก์ที่น่าสงสัยหรือดาวน์โหลดไฟล์จากแหล่งที่ไม่น่าเชื่อถือ
										</li>
										<li>
											ไม่เปิดเผยข้อมูลส่วนตัวหรือข้อมูลทางการเงินกับคนแปลกหน้า
										</li>
										<li>ใช้รหัสผ่านที่ซับซ้อนและเปลี่ยนรหัสผ่านเป็นประจำ</li>
									</ul>
								</div>
							</div>

							<div className="flex flex-wrap justify-center gap-4 mt-6">
								<Button
									onClick={handleTryAgain}
									variant="outline"
									className="min-w-[150px]"
								>
									ทำแบบทดสอบอีกครั้ง
								</Button>
								<Button
									onClick={handleStartOver}
									className="bg-blue-600 hover:bg-blue-700 text-white min-w-[150px]"
								>
									<Home className="mr-2 h-4 w-4" />
									กลับสู่หน้าหลัก
								</Button>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</section>
		);
	}

	// แสดงหน้าผลคะแนนเริ่มต้น
	return (
		<section
			className="min-h-screen flex items-center justify-center p-4"
			style={{ backgroundColor: "#f0f9ff" }}
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-3xl"
			>
				<Card className="shadow-lg overflow-hidden">
					<div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
						<div className="flex justify-between items-center">
							<h2 className="text-3xl font-bold">ผลการทดสอบ</h2>
							<div className="flex space-x-2">
								<Button
									variant="ghost"
									size="icon"
									className="text-white hover:bg-white/20"
									onClick={handleShare}
								>
									<Share2 className="h-5 w-5" />
								</Button>
							</div>
						</div>
					</div>

					<CardContent className="p-6">
						<div className="flex flex-col md:flex-row items-center justify-between gap-6">
							<div className="text-center md:text-left">
								<div className="flex flex-col items-center md:items-start">
									<div className="mb-4">{getResultIcon()}</div>
									<h3 className="text-2xl font-bold mb-2">
										{getResultMessage()}
									</h3>
									<p className="text-gray-600">
										คุณได้คะแนน {calculatePercentage()}%
									</p>
								</div>
							</div>

							<div className="bg-blue-50 rounded-xl p-6 text-center w-full md:w-auto">
								<div className="text-6xl font-bold text-blue-600 mb-2">
									{score}/{totalQuestions}
								</div>
								<div className="text-sm text-gray-600">คะแนนของคุณ</div>
							</div>
						</div>

						<div className="mt-8">
							<h4 className="text-xl font-semibold mb-3">ข้อมูลเพิ่มเติม</h4>
							<p className="text-gray-700 mb-4">
								{score === totalQuestions
									? "ยอดเยี่ยม! คุณมีความรู้เกี่ยวกับการหลอกลวงออนไลน์เป็นอย่างดี คุณสามารถระวังตัวและช่วยเหลือผู้อื่นให้ปลอดภัยจากการหลอกลวงได้"
									: score >= totalQuestions / 2
									? "ดีมาก! คุณรู้จักการหลอกลวงออนไลน์หลายรูปแบบ แต่ยังมีโอกาสพัฒนาความรู้ได้อีก ควรศึกษาเพิ่มเติมเกี่ยวกับรูปแบบการหลอกลวงที่ซับซ้อนขึ้น"
									: "คุณอาจต้องเรียนรู้เพิ่มเติมเกี่ยวกับการหลอกลวงออนไลน์และความปลอดภัย ระมัดระวังไว้เสมอ และอย่าลังเลที่จะขอคำแนะนำเมื่อไม่แน่ใจ!"}
							</p>

							<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
								<p className="text-yellow-800">
									<strong>คำแนะนำ:</strong> ระมัดระวังข้อความที่มีลิงก์แปลกๆ
									อย่าเปิดเผยข้อมูลส่วนตัวหรือการเงินกับคนแปลกหน้า
									และตรวจสอบแหล่งที่มาของข้อมูลเสมอ
								</p>
							</div>
						</div>

						<div className="text-center text-gray-500 mt-4 mb-2">
							<p>กำลังบันทึกข้อมูลคะแนนของคุณ...</p>
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</section>
	);
}
