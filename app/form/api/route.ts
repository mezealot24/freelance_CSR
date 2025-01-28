import { NextResponse } from "next/server";
import axios from "axios";

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Format data as URL parameters
    const params = new URLSearchParams();
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

    // Add data as parameters
    params.append('data', JSON.stringify(rowData));

    // Make request with params in URL
    const response = await axios({
      method: 'post',
      url: `${GOOGLE_SCRIPT_URL}?${params.toString()}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.status !== 200) {
      console.error("Google Sheets Error:", response.data);
      return NextResponse.json(
        { error: "Failed to save to Google Sheets" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}