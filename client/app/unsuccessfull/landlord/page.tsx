// app/successfull/landlord/page.tsx
"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";

const PaymentUnsuccessContent = dynamic(
  () => import("./PaymentUnsuccessContent"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentUnsuccessContent />
    </Suspense>
  );
}
