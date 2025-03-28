import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
	try {
		const data = await request.json();
		const {
			user_id,
			score,
			total_questions,
			completed,
			current_question,
			answers = [],
		} = data;

		// ตรวจสอบว่าผู้ใช้มีการทำแบบทดสอบที่ยังไม่เสร็จหรือไม่
		const { data: existingAttempt, error: fetchError } = await supabase
			.from("quiz_attempts")
			.select("*")
			.eq("user_id", user_id)
			.eq("completed", false)
			.order("created_at", { ascending: false })
			.limit(1)
			.single();

		if (fetchError && fetchError.code !== "PGRST116") {
			return NextResponse.json({ error: fetchError.message }, { status: 500 });
		}

		if (existingAttempt) {
			// อัปเดตการทำแบบทดสอบที่มีอยู่
			const { error } = await supabase
				.from("quiz_attempts")
				.update({
					score,
					completed,
					current_question,
					answers,
					updated_at: new Date(),
				})
				.eq("id", existingAttempt.id);

			if (error) {
				return NextResponse.json({ error: error.message }, { status: 500 });
			}

			return NextResponse.json({
				message: "Quiz attempt updated successfully",
				attempt_id: existingAttempt.id,
			});
		} else {
			// สร้างการทำแบบทดสอบใหม่
			const { data: newAttempt, error } = await supabase
				.from("quiz_attempts")
				.insert([
					{
						user_id,
						score,
						total_questions,
						completed,
						current_question,
						answers,
					},
				])
				.select();

			if (error) {
				return NextResponse.json({ error: error.message }, { status: 500 });
			}

			return NextResponse.json({
				message: "Quiz attempt created successfully",
				attempt_id: newAttempt[0].id,
			});
		}
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// GET endpoint เพื่อตรวจสอบว่าผู้ใช้เคยทำแบบทดสอบแล้วหรือไม่
export async function GET(request) {
	const url = new URL(request.url);
	const user_id = url.searchParams.get("user_id");

	if (!user_id) {
		return NextResponse.json({ error: "User ID is required" }, { status: 400 });
	}

	try {
		// ตรวจสอบว่าผู้ใช้เคยทำแบบทดสอบที่เสร็จสมบูรณ์แล้วหรือไม่
		const { data, error } = await supabase
			.from("quiz_attempts")
			.select("*")
			.eq("user_id", user_id)
			.eq("completed", true)
			.order("created_at", { ascending: false })
			.limit(1);

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		if (data && data.length > 0) {
			return NextResponse.json({
				has_completed: true,
				last_attempt: data[0],
			});
		} else {
			// ตรวจสอบว่ามีการทำแบบทดสอบที่ยังไม่เสร็จหรือไม่
			const { data: incompleteData, error: incompleteError } = await supabase
				.from("quiz_attempts")
				.select("*")
				.eq("user_id", user_id)
				.eq("completed", false)
				.order("created_at", { ascending: false })
				.limit(1);

			if (incompleteError) {
				return NextResponse.json(
					{ error: incompleteError.message },
					{ status: 500 }
				);
			}

			if (incompleteData && incompleteData.length > 0) {
				return NextResponse.json({
					has_completed: false,
					incomplete_attempt: incompleteData[0],
				});
			} else {
				return NextResponse.json({ has_completed: false });
			}
		}
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
