"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
	platformOptions,
	scamTypeOptions,
	provinces,
} from "@/data/platformOptions";
import { Button } from "@/components/ui/button";
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
import { formSchema, FormSchema } from "@/lib/formSchema";

const SurveyForm: React.FC = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		getValues,
		setError,
		formState: { errors },
	} = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			hasExperiencedScam: "no",
			scamTypes: [],
			platforms: [],
		},
	});

	const hasExperiencedScam = watch("hasExperiencedScam");

	const onSubmit = async (data: FormSchema) => {
		if (hasExperiencedScam === "yes" && data.scamTypes.length === 0) {
			setError("scamTypes", {
				type: "manual",
				message: "กรุณาเลือกประเภท Scam อย่างน้อย 1 ประเภท",
			});
			return;
		}

		try {
			setIsSubmitting(true);

			const response = await fetch("/form/api/route", {
				// Fixed API route path
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok) {
				console.error("API Error:", result);
				throw new Error(result.error || "การส่งข้อมูลล้มเหลว");
			}

			toast.success("ส่งแบบฟอร์มสำเร็จ");
			router.push("/thank-you");
		} catch (error) {
			console.error("Form submission error:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleScamTypeChange = (scamId: string, checked: boolean) => {
		const currentScamTypes = getValues("scamTypes");
		if (checked) {
			setValue("scamTypes", [...currentScamTypes, scamId]);
		} else {
			setValue(
				"scamTypes",
				currentScamTypes.filter((type) => type !== scamId)
			);
		}
	};

	const handlePlatformChange = (platformId: string, checked: boolean) => {
		const currentPlatforms = getValues("platforms");
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
		<motion.form
			onSubmit={handleSubmit(onSubmit)}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="space-y-6 p-6 bg-white rounded-xl shadow-lg max-w-xl mx-auto"
		>
			{/* Age Range */}
			<div>
				<Label htmlFor="ageRange">ช่วงอายุ</Label>
				<Controller
					name="ageRange"
					control={control}
					render={({ field }) => (
						<Select onValueChange={field.onChange} defaultValue={field.value}>
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
						<Select onValueChange={field.onChange} defaultValue={field.value}>
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
				<Input
					{...register("occupation")}
					id="occupation"
					placeholder="ระบุอาชีพ"
				/>
				{errors.occupation && (
					<p className="text-red-500 text-sm">{errors.occupation.message}</p>
				)}
			</div>

			{/* Education */}
			<div>
				<Label htmlFor="education">ระดับการศึกษา</Label>
				<Controller
					name="education"
					control={control}
					render={({ field }) => (
						<Select onValueChange={field.onChange} defaultValue={field.value}>
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
				<div className="space-x-4">
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
												handleScamTypeChange(scam.id, checked as boolean);
											}}
										/>
									)}
								/>
								<span>{scam.label}</span>
							</label>
						))}
					</div>
					{errors.scamTypes && (
						<p className="text-red-500 text-sm">{errors.scamTypes.message}</p>
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
						<Select onValueChange={field.onChange} defaultValue={field.value}>
							<SelectTrigger>
								<SelectValue placeholder="เลือกความถี่ในการใช้งาน" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="daily">ทุกวัน</SelectItem>
								<SelectItem value="weekly">สัปดาห์ละครั้ง</SelectItem>
								<SelectItem value="monthly">เดือนละครั้ง</SelectItem>
								<SelectItem value="rarely">นานๆ ครั้ง</SelectItem>
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
						<label key={platform.id} className="flex items-center space-x-2">
							<Controller
								name="platforms"
								control={control}
								defaultValue={[]}
								render={({ field }) => (
									<Checkbox
										checked={field.value?.includes(platform.id)}
										onCheckedChange={(checked) => {
											handlePlatformChange(platform.id, checked as boolean);
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

			<Button type="submit" className="w-full" disabled={isSubmitting}>
				{isSubmitting ? (
					<div className="flex items-center justify-center">
						<span className="mr-2">กำลังส่งข้อมูล</span>
						<span className="loading loading-spinner loading-sm"></span>
					</div>
				) : (
					"ส่งแบบฟอร์ม"
				)}
			</Button>
		</motion.form>
	);
};

export default SurveyForm;
