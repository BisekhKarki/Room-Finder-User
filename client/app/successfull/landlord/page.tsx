// app/successfull/landlord/page.tsx
"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";

const PaymentSuccessContent = dynamic(() => import("./PaymentSuccessContent"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
