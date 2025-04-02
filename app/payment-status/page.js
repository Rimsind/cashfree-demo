"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    if (orderId) {
      fetch(`/api/cashfree/status?order_id=${orderId}`)
        .then((res) => res.json())
        .then((data) => setStatus(data.status))
        .catch(() => setStatus("Error fetching payment status"));
    }
  }, [orderId]);

  return (
    <div className="p-5">
      <h1 className="text-2xl">Payment Status</h1>
      <p className="mt-2">{status}</p>
    </div>
  );
}
