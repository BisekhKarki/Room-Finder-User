"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPass, setResetUserEmail } from "@/store/slice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.slice);

  const verifyEmailAndSendCode = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      const data = await dispatch(resetPass({ email }));
      if (resetPass.fulfilled.match(data)) {
        if (data.payload.success) {
          dispatch(setResetUserEmail(email));
          toast.success("Verification code sent to your email");
          router.push("/ResetPassword/password");
        }
      } else if (resetPass.rejected.match(data)) {
        toast.error(data.payload || "Failed to send verification code");
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  return (
    <div className="flex justify-center py-20 md:py-40 px-4 min-h-screen md:min-h-0">
      <div className="flex flex-col gap-4 md:gap-6 border py-8 px-6 md:px-12 items-center rounded-md shadow-xl w-full max-w-md bg-white">
        <h1 className="font-bold text-xl md:text-2xl text-center">
          Reset Your Password
        </h1>

        <p className="text-gray-500 text-sm md:text-base text-center">
          Please enter your email address to receive a verification code
        </p>

        <Input
          className="w-full max-w-xs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          type="email"
        />

        <div className="flex flex-col md:flex-row gap-3 w-full max-w-xs">
          <Button
            onClick={verifyEmailAndSendCode}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Sending...</span>
              </div>
            ) : (
              "Send Code"
            )}
          </Button>

          <Button
            onClick={() => router.push("/login")}
            variant="outline"
            className="w-full border-gray-300 hover:bg-gray-50 text-gray-700"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
