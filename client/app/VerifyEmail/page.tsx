"use client";
import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

const VerifyEmail = () => {
  const [code, setCode] = useState<string>("");
  const router = useRouter();

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/register",
        {
          code,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("User registered successfully");
        router.push("/login");
      } else {
        toast.error("Failed to register account, please try again");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div className="flex justify-center py-40">
      <div className=" flex flex-col gap-3 border b py-8 px-12 items-center rounded-md shadow-xl">
        <h1 className="font-bold text-2xl">Verify Your Account</h1>
        <p className="text-gray-400 text-xs">
          A verification code has been sent to your mail <br /> Enter the code
          below
        </p>
        <Input
          className="w-64"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div className="flex flex-row gap-2">
          <Button
            className="mt-1 w-20 bg-blue-400 hover:bg-blue-600"
            onClick={() => onSubmit()}
          >
            Verify
          </Button>
          <Button
            className="mt-1 w-20 bg-gray-200 hover:bg-gray-400 text-black border border-black"
            onClick={() => {
              router.push("/signup");
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
