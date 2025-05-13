"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { base_url } from "@/constants/BaseUrl";
import Loading from "@/components/Loading";

const Page = () => {
  const searchParams = useSearchParams();
  const [statusMessage, setStatusMessage] = useState("Verifying...");
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      const pidx = searchParams.get("pidx"); // Get pidx from query params

      if (!pidx) {
        router.push("/unsuccessfull/user");
        return;
      }

      try {
        const response = await fetch(`${base_url}/payment/verify/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pidx }), // Send pidx to your backend
        });

        const data = await response.json();

        if (data.message?.status === "Completed") {
          router.push("/successfull/user");
        } else if (data.message?.status === "Pending") {
          setStatusMessage("⏳ Payment pending.");
        } else {
          router.push("/unsuccessfull/user");
        }
      } catch (error) {
        console.error("Verification error:", error);
        router.push("/unsuccessfull/user");
      }
    };

    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return <div>{statusMessage === "Verifying..." && <Loading />}</div>;
};

export default Page;
