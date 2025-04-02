import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const { orderId, orderAmount, customerName, customerEmail, customerPhone } = await req.json();
    
    console.log("Received Order:", { orderId, orderAmount, customerName, customerEmail, customerPhone });

    const API_URL =
      process.env.CASHFREE_ENV === "TEST"
        ? "https://sandbox.cashfree.com/pg/orders"
        : "https://api.cashfree.com/pg/orders";

    const headers = {
      "Content-Type": "application/json",
      "x-client-id": process.env.CASHFREE_APP_ID,
      "x-client-secret": process.env.CASHFREE_SECRET_KEY,
      "x-api-version": "2022-09-01",
    };

    const orderPayload = {
      order_id: orderId,
      order_amount: orderAmount,
      order_currency: "INR",
      customer_details: {
        customer_id: orderId,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-status?order_id=${orderId}`,
      },
    };

    console.log("Sending Request to Cashfree:", orderPayload);

    const response = await axios.post(API_URL, orderPayload, { headers });

    console.log("Cashfree API Response:", response.data);

   if (!response.data || !response.data.payments?.url) {
  return NextResponse.json({ error: "Failed to generate payment link." }, { status: 500 });
}

return NextResponse.json({ payment_link: response.data.payments.url });
  } catch (error) {
    console.error("Cashfree API Error:", error.response?.data || error.message);
    return NextResponse.json({ error: "Payment initiation failed" }, { status: 500 });
  }
}
