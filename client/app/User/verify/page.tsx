"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { base_url } from "@/constants/BaseUrl";
import Loading from "@/components/Loading";

const VerifyContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState("Verifying...");

  useEffect(() => {
    const verify = async () => {
      const pidx = searchParams.get("pidx");

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
          body: JSON.stringify({ pidx }),
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
  }, [searchParams, router]);

  return <div>{statusMessage === "Verifying..." && <Loading />}</div>;
};

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyContent />
    </Suspense>
  );
};

export default Page;
