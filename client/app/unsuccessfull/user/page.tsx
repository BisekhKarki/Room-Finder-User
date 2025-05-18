// app/successfull/landlord/PaymentSuccessContent.tsx
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import unsuccess from "../../../assets/Unsuccessfulpayment.png";
import { useRouter } from "next/navigation";
import { ImCross } from "react-icons/im";

const Page = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl relative">
        <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-6 md:p-10 lg:p-12 transition-all duration-300">
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:bg-red-50 rounded-full p-2"
              onClick={() => router.push("/User/Home")}
            >
              <ImCross className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-col items-center text-center space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Failed
            </h1>

            <div className="w-48 h-48 md:w-64 md:h-64 relative">
              <Image
                src={unsuccess}
                alt="Payment Successful"
                layout="fill"
                objectFit="contain"
                className="animate-bounce-slow"
              />
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                Payment Unsuccssful
              </h2>
              <p className="text-gray-500 text-sm md:text-base">
                Your transaction was not completed.
              </p>
            </div>

            <div className="w-full mt-6 space-y-4">
              <Button
                className="w-full md:w-auto px-8 py-4 text-base md:text-lg"
                onClick={() => router.push("/User/Home")}
              >
                View My Rooms
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
