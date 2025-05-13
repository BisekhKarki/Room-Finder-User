// app/successfull/landlord/PaymentSuccessContent.tsx
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import success from "../../../assets/Successpayment.png";
import { useRouter, useSearchParams } from "next/navigation";
import { ImCross } from "react-icons/im";
import toast from "react-hot-toast";
import { GetToken } from "@/constants/GetToken";
import { base_url } from "@/constants/BaseUrl";

const PaymentSuccessContent = () => {
  const router = useRouter();
  const [getStatus, setGetStatus] = useState<string | null>("");
  const [getLandlordId, setGetLandlordId] = useState<string | null>("");
  const [getRoomId, setGetRoomId] = useState<string | null>("");

  const location = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getId = localStorage.getItem("RoomId");
      if (location) {
        setGetStatus(location.get("status"));
        setGetLandlordId(location.get("purchase_order_id"));
        const validRoomId = getId ? JSON.parse(getId) : "";
        setGetRoomId(validRoomId);
      }
    }
  }, [location]);

  useEffect(() => {
    if (getRoomId !== "" && getStatus !== "") {
      paymentSuccessfull();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRoomId, getLandlordId, getStatus]);

  const paymentSuccessfull = async () => {
    try {
      const token = GetToken();
      const response = await fetch(
        `${base_url}/rooms/myRooms/pending/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: getStatus,
            landlordId: getLandlordId,
            roomId: getRoomId,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
      }
    } catch (error: unknown) {
      toast.error("Internal server error");
      console.error(error);
    }
  };

  const savePaymentDetails = async () => {
    try {
      const token = GetToken();
      const response = await fetch(`${base_url}/payment/pending/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roomId: getRoomId,
          status: getStatus,
        }),
      });
      const data = await response.json();

      if (data.success && response.status === 200) {
        router.push("/landlord/MyRooms");
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl relative">
        <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-6 md:p-10 lg:p-12 transition-all duration-300">
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:bg-red-50 rounded-full p-2"
              onClick={savePaymentDetails}
            >
              <ImCross className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-col items-center text-center space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Success
            </h1>

            <div className="w-48 h-48 md:w-64 md:h-64 relative">
              <Image
                src={success}
                alt="Payment Successful"
                layout="fill"
                objectFit="contain"
                className="animate-bounce-slow"
              />
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                Payment Successful
              </h2>
              <p className="text-gray-500 text-sm md:text-base">
                Your transaction was completed successfully.
              </p>
            </div>

            <div className="w-full mt-6 space-y-4">
              <Button
                className="w-full md:w-auto px-8 py-4 text-base md:text-lg"
                onClick={() => savePaymentDetails()}
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

export default PaymentSuccessContent;
