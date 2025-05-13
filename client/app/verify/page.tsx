"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { base_url } from "@/constants/BaseUrl";

const Page = () => {
  const searchParams = useSearchParams();
  const [statusMessage, setStatusMessage] = useState("Verifying...");

  useEffect(() => {
    const verify = async () => {
      const pidx = searchParams.get("pidx"); // Get pidx from query params

      if (!pidx) {
        setStatusMessage("Invalid payment request. No pidx found.");
        return;
      }

      try {
        const response = await fetch(`${base_url}/payment/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pidx }), // Send pidx to your backend
        });

        const data = await response.json();

        if (data.message?.status === "Completed") {
          setStatusMessage("✅ Payment successful.");
        } else if (data.message?.status === "Pending") {
          setStatusMessage("⏳ Payment pending.");
        } else {
          setStatusMessage("❌ Payment cancelled or failed.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatusMessage("⚠️ Error verifying payment.");
      }
    };

    verify();
  }, [searchParams]);

  return <div>{statusMessage}</div>;
};

export default Page;
