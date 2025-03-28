"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
	platformOptions,
	scamTypeOptions,
	provinces,
} from "@/data/platformOptions";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formSchema } from "@/lib/formSchema";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { useQuizStore } from "@/store/quizStore";
import { Card } from "@/components/ui/card";
import { checkRouteProtection } from "@/lib/route-protection";

export default function SurveyPage() {
	const router = useRouter();
	const { userID, setFormData, setSurveyCompleted } = useUser();
	const { score, totalQuestions } = useQuizStore();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const hasCheckedRoute = useRef(false);

	useEffect(() => {
		if (hasCheckedRoute.current) return;

		try {
			const { allowed, redirectTo } = checkRouteProtection();

			hasCheckedRoute.current = true;

			if (!allowed) {
				setTimeout(() => {
					router.push(redirectTo);
				}, 100);
			}
		} catch (error) {
			console.error("Error checking route protection:", error);
		}
	}, [router]);

	const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		getValues,
		setError,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			hasExperiencedScam: "no",
			scamTypes: [],
			platforms: [],
		},
	});

	const hasExperiencedScam = watch("hasExperiencedScam");

	const onSubmit = async (data) => {
		if (data.hasExperiencedScam === "yes" && data.scamTypes.length === 0) {
			setError("scamTypes", {
				type: "manual",
				message: "กรุณาเลือกประเภท Scam อย่างน้อย 1 ประเภท",
			});
			return;
		}

		if (!userID) {
			alert("ไม่พบข้อมูลผู้ใช้ กรุณาเริ่มต้นใหม่");
			router.push("/");
			return;
		}

		try {
			setIsSubmitting(true);

			// บันทึกข้อมูลแบบสอบถามลง Context
			setFormData(data);

			// ส่งข้อมูลแบบสอบถามไปยัง API ก่อน (เพื่อสร้าง user_id ในฐานข้อมูล)
			try {
				const surveyResponse = await fetch("/api/users", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						user_id: userID,
						age_range: data.ageRange,
						province: data.province,
						occupation: data.occupation,
						education: data.education,
						has_experienced_scam: data.hasExperiencedScam === "yes",
						scam_types: data.scamTypes || [],
						social_media_usage: data.socialMediaUsage,
						platforms: data.platforms,
					}),
				});

				if (!surveyResponse.ok) {
					const errorData = await surveyResponse.json().catch(() => ({}));
					throw new Error(
						`การส่งแบบสอบถามล้มเหลว: ${
							errorData.error || surveyResponse.statusText
						}`
					);
				}

				// หลังจากบันทึกข้อมูลผู้ใช้สำเร็จ จึงส่งข้อมูลแบบทดสอบ
				try {
					const quizResponse = await fetch("/api/quiz-attempts", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							user_id: userID,
							score: score,
							total_questions: totalQuestions,
							completed: true,
							current_question: totalQuestions - 1,
						}),
					});

					if (!quizResponse.ok) {
						const errorData = await quizResponse.json().catch(() => ({}));
						console.error(
							"ข้อผิดพลาดในการส่งข้อมูลแบบทดสอบ:",
							errorData.error || quizResponse.statusText
						);
						// ไม่ throw error ที่นี่ เพื่อให้สามารถไปยังหน้าผลลัพธ์ได้
					}
				} catch (quizError) {
					console.error("เกิดข้อผิดพลาดในการส่งข้อมูลแบบทดสอบ:", quizError);
					// ไม่ throw error ที่นี่ เพื่อให้สามารถไปยังหน้าผลลัพธ์ได้
				}

				// บันทึกสถานะการทำแบบสอบถามเสร็จ
				setSurveyCompleted(true);

				// บันทึกสถานะการทำแบบทดสอบเสร็จลง localStorage
				localStorage.setItem("quizCompleted", "true");

				// ไปยังหน้าผลลัพธ์
				router.push("/result");
			} catch (surveyError) {
				console.error("เกิดข้อผิดพลาดในการส่งข้อมูลแบบสอบถาม:", surveyError);
				alert(`เกิดข้อผิดพลาดในการส่งข้อมูลแบบสอบถาม: ${surveyError.message}`);
			}
		} catch (error) {
			console.error("เกิดข้อผิดพลาดทั่วไป:", error);
			alert(`เกิดข้อผิดพลาดในการส่งข้อมูล: ${error.message}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleScamTypeChange = (scamId, checked) => {
		const currentScamTypes = getValues("scamTypes") || [];
		if (checked) {
			setValue("scamTypes", [...currentScamTypes, scamId]);
		} else {
			setValue(
				"scamTypes",
				currentScamTypes.filter((type) => type !== scamId)
			);
		}
	};

	const handlePlatformChange = (platformId, checked) => {
		const currentPlatforms = getValues("platforms") || [];
		if (checked) {
			setValue("platforms", [...currentPlatforms, platformId]);
		} else {
			setValue(
				"platforms",
				currentPlatforms.filter((platform) => platform !== platformId)
			);
		}
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center p-4"
			style={{ backgroundColor: "#f0f9ff" }}
		>
			<Card className="w-full max-w-3xl p-6 shadow-lg">
				<div className="mb-6 text-center">
					<h1 className="text-2xl font-bold mb-2">แบบสอบถามข้อมูลผู้ใช้</h1>
					<p className="text-zinc-600">
						กรุณากรอกข้อมูลเพื่อประกอบการวิเคราะห์ผลการทดสอบ
					</p>
				</div>

				<motion.form
					onSubmit={handleSubmit(onSubmit)}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="space-y-6"
				>
					{/* Age Range */}
					<div>
						<Label htmlFor="ageRange">ช่วงอายุ</Label>
						<Controller
							name="ageRange"
							control={control}
							render={({ field }) => (
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder="เลือกช่วงอายุ" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="under18">ต่ำกว่า 18 ปี</SelectItem>
										<SelectItem value="18-24">18-24 ปี</SelectItem>
										<SelectItem value="25-34">25-34 ปี</SelectItem>
										<SelectItem value="35-44">35-44 ปี</SelectItem>
										<SelectItem value="45-54">45-54 ปี</SelectItem>
										<SelectItem value="55-64">55-64 ปี</SelectItem>
										<SelectItem value="65+">65 ปีขึ้นไป</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.ageRange && (
							<p className="text-red-500 text-sm">{errors.ageRange.message}</p>
						)}
					</div>

					{/* Province */}
					<div>
						<Label htmlFor="province">จังหวัด</Label>
						<Controller
							name="province"
							control={control}
							render={({ field }) => (
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder="เลือกจังหวัด" />
									</SelectTrigger>
									<SelectContent>
										{provinces.map((province) => (
											<SelectItem key={province} value={province}>
												{province}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
						{errors.province && (
							<p className="text-red-500 text-sm">{errors.province.message}</p>
						)}
					</div>

					{/* Occupation */}
					<div>
						<Label htmlFor="occupation">อาชีพ</Label>
						<Controller
							name="occupation"
							control={control}
							render={({ field }) => (
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder="เลือกอาชีพ" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="government">
											ข้าราชการ/พนักงานของรัฐ
										</SelectItem>
										<SelectItem value="state-enterprise">
											พนักงานรัฐวิสาหกิจ
										</SelectItem>
										<SelectItem value="private">พนักงานบริษัทเอกชน</SelectItem>
										<SelectItem value="business">
											ธุรกิจส่วนตัว/เจ้าของกิจการ
										</SelectItem>
										<SelectItem value="freelance">
											อาชีพอิสระ/ฟรีแลนซ์
										</SelectItem>
										<SelectItem value="student">นักเรียน/นักศึกษา</SelectItem>
										<SelectItem value="retired">เกษียณอายุ</SelectItem>
										<SelectItem value="unemployed">ว่างงาน</SelectItem>
										<SelectItem value="other">อื่นๆ</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.occupation && (
							<p className="text-red-500 text-sm">
								{errors.occupation.message}
							</p>
						)}
					</div>

					{/* Education */}
					<div>
						<Label htmlFor="education">ระดับการศึกษา</Label>
						<Controller
							name="education"
							control={control}
							render={({ field }) => (
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder="เลือกระดับการศึกษา" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="primary">ประถมศึกษา</SelectItem>
										<SelectItem value="secondary">มัธยมศึกษา</SelectItem>
										<SelectItem value="vocational">ปวช./ปวส.</SelectItem>
										<SelectItem value="bachelor">ปริญญาตรี</SelectItem>
										<SelectItem value="master">ปริญญาโท</SelectItem>
										<SelectItem value="doctorate">ปริญญาเอก</SelectItem>
										<SelectItem value="other">อื่นๆ</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.education && (
							<p className="text-red-500 text-sm">{errors.education.message}</p>
						)}
					</div>

					{/* Has Experienced Scam */}
					<div>
						<Label>เคยเจอ Scam หรือไม่</Label>
						<div className="flex space-x-4 justify-start">
							<label className="flex items-center space-x-2">
								<input
									type="radio"
									value="yes"
									{...register("hasExperiencedScam")}
								/>
								<span>เคย</span>
							</label>
							<label className="flex items-center space-x-2">
								<input
									type="radio"
									value="no"
									{...register("hasExperiencedScam")}
								/>
								<span>ไม่เคย</span>
							</label>
						</div>
						{errors.hasExperiencedScam && (
							<p className="text-red-500 text-sm">
								{errors.hasExperiencedScam.message}
							</p>
						)}
					</div>

					{/* Scam Types */}
					{hasExperiencedScam === "yes" && (
						<div>
							<Label>ประเภทของ Scam</Label>
							<div className="space-y-2">
								{scamTypeOptions.map((scam) => (
									<label key={scam.id} className="flex items-center space-x-2">
										<Controller
											name="scamTypes"
											control={control}
											defaultValue={[]}
											render={({ field }) => (
												<Checkbox
													checked={field.value?.includes(scam.id)}
													onCheckedChange={(checked) => {
														handleScamTypeChange(scam.id, checked);
													}}
												/>
											)}
										/>
										<span>{scam.label}</span>
									</label>
								))}
							</div>
							{errors.scamTypes && (
								<p className="text-red-500 text-sm">
									{errors.scamTypes.message}
								</p>
							)}
						</div>
					)}

					{/* Social Media Usage */}
					<div>
						<Label htmlFor="socialMediaUsage">
							ความถี่ในการใช้งานโซเชียลมีเดีย
						</Label>
						<Controller
							name="socialMediaUsage"
							control={control}
							render={({ field }) => (
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder="เลือกความถี่ในการใช้งาน" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="veryFrequent">
											มากกว่า 6 ชั่วโมงต่อวัน
										</SelectItem>
										<SelectItem value="frequent">3-6 ชั่วโมงต่อวัน</SelectItem>
										<SelectItem value="moderate">1-3 ชั่วโมงต่อวัน</SelectItem>
										<SelectItem value="occasional">
											น้อยกว่า 1 ชั่วโมงต่อวัน
										</SelectItem>
										<SelectItem value="rarely">ไม่ได้ใช้ทุกวัน</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.socialMediaUsage && (
							<p className="text-red-500 text-sm">
								{errors.socialMediaUsage.message}
							</p>
						)}
					</div>

					{/* Social Media Platforms */}
					<div>
						<Label>แพลตฟอร์มที่ใช้งาน</Label>
						<div className="space-y-2">
							{platformOptions.map((platform) => (
								<label
									key={platform.id}
									className="flex items-center space-x-2"
								>
									<Controller
										name="platforms"
										control={control}
										defaultValue={[]}
										render={({ field }) => (
											<Checkbox
												checked={field.value?.includes(platform.id)}
												onCheckedChange={(checked) => {
													handlePlatformChange(platform.id, checked);
												}}
											/>
										)}
									/>
									<span>{platform.label}</span>
								</label>
							))}
						</div>
						{errors.platforms && (
							<p className="text-red-500 text-sm">{errors.platforms.message}</p>
						)}
					</div>

					<Button type="submit" disabled={isSubmitting} className="w-full">
						{isSubmitting ? "กำลังส่งข้อมูล..." : "ส่งแบบฟอร์มและดูผลลัพธ์"}
					</Button>
				</motion.form>
			</Card>
		</div>
	);
}
