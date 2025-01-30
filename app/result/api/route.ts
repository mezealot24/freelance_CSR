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
    const { userID, score, formData } = await req.json();
    
    // Reorder data to match spreadsheet columns
    const rowData = [
      formData.ageRange,
      formData.province,
      formData.occupation,
      formData.education,
      formData.hasExperiencedScam,
      formData.scamTypes.length > 0 ? formData.scamTypes.join(", ") : "",  // Handle empty array
      formData.socialMediaUsage,
      formData.platforms.length > 0 ? formData.platforms.join(", ") : "",   // Handle empty array
      new Date().toISOString(),
      userID,
      score || 0  // Default to 0 if score is undefined
    ];

    const response = await axios({
      method: 'POST',
      url: GOOGLE_SCRIPT_URL,
      data: { data: rowData },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (response.status !== 200) {
      throw new Error('Failed to save to Google Sheets');
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('API Error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data || error.message || "Failed to save data" },
      { status: 500 }
    );
  }
}