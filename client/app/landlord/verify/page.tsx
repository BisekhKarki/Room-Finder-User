import React, { Suspense } from "react";
import VerifyPage from "./VerifyPage"; // or wherever the component is located
import Loading from "@/components/Loading";

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyPage />
    </Suspense>
  );
};

export default Page;
