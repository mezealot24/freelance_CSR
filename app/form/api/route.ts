import { NextResponse } from "next/server";
import axios from "axios";

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

export async function POST(req: Request) {
  if (!GOOGLE_SCRIPT_URL) {
    return NextResponse.json(
      { error: "Missing Google Script URL" },
      { status: 500 }
    );
  }

  try {
    const data = await req.json();
    console.log("Received form data:", data);
    const rowData = [
      data.ageRange,
      data.province,
      data.occupation,
      data.education,
      data.hasExperiencedScam,
      data.scamTypes.join(", "),
      data.socialMediaUsage,
      data.platforms.join(", "),
      new Date().toISOString()
    ];
    console.log("Prepared row data:", rowData);

    const response = await axios({
      method: 'POST',
      url: GOOGLE_SCRIPT_URL,
      data: { data: rowData },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log("Google Script response:", response.data);  // Add logging

    if (response.status !== 200) {
      throw new Error('Failed to save to Google Sheets');
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('API Error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to save data" },
      { status: 500 }
    );
  }
}