import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request) {
  try {
    const data = await request.json()
    const { user_id, ...userData } = data

    // ตรวจสอบว่าผู้ใช้มีอยู่แล้วหรือไม่
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("user_id")
      .eq("user_id", user_id)
      .single()

    if (fetchError && fetchError.code !== "PGRST116") {
      return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }

    if (existingUser) {
      // อัปเดตข้อมูลผู้ใช้ที่มีอยู่
      const { error } = await supabase.from("users").update(userData).eq("user_id", user_id)

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ message: "User updated successfully" })
    } else {
      // สร้างผู้ใช้ใหม่
      const { error } = await supabase.from("users").insert([{ user_id, ...userData }])

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ message: "User created successfully" })
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

