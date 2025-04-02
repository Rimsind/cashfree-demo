import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("order_id");

  if (!orderId) {
    return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
  }

  try {
    const API_URL =
      process.env.CASHFREE_ENV === "TEST"
        ? `https://sandbox.cashfree.com/pg/orders/${orderId}`
        : `https://api.cashfree.com/pg/orders/${orderId}`;

    const headers = {
      "x-client-id": process.env.CASHFREE_APP_ID,
      "x-client-secret": process.env.CASHFREE_SECRET_KEY,
      "x-api-version": "2022-09-01",
    };

    const response = await axios.get(API_URL, { headers });

    return NextResponse.json({ status: response.data.order_status });
  } catch (error) {
    console.error("Cashfree Payment Status Error:", error.message);
    return NextResponse.json({ error: "Error fetching payment status" }, { status: 500 });
  }
}
