"use client";
import { useState } from "react";

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    const orderId = `ORD_${Date.now()}`;
    const orderAmount = 1
    ; // Example amount

    try {
      const response = await fetch("/api/cashfree", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          orderAmount,
          customerName: "John Doe",
          customerEmail: "john@example.com",
          customerPhone: "9999999999",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Payment failed: ${data.error || "Unknown error"}`);
        return;
      }

      if (data.payment_link) {
        window.location.href = data.payment_link;
      } else {
        alert("Payment initiation failed. No payment link received.");
      }
    } catch (error) {
      console.error("Payment Error:", error.message);
      alert("Error processing payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
}
