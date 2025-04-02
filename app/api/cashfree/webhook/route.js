import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Webhook Data:", body);

    // Verify the signature if required (optional)
    
    return NextResponse.json({ message: "Webhook received" });
  } catch (error) {
    return NextResponse.json({ error: "Webhook handling error" }, { status: 500 });
  }
}
