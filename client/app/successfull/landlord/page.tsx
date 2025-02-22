"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import success from "../../../assets/Successpayment.png";
import { useRouter, useSearchParams } from "next/navigation";
import { ImCross } from "react-icons/im";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const [getStatus, setGetStatus] = useState<string | null>("");
  const [getLandlordId, setGetLandlordId] = useState<string | null>("");
  const [getRoomId, setGetRoomId] = useState<string | null>("");

  const location = useSearchParams();
  useEffect(() => {
    const getId = localStorage.getItem("RoomId");
    if (location) {
      setGetStatus(location.get("status"));
      setGetLandlordId(location.get("purchase_order_id"));
      const validRoomId = getId ? JSON.parse(getId) : "";
      setGetRoomId(validRoomId);
    }
  }, [location]);

  useEffect(() => {
    if (getRoomId != "" && getStatus != "") {
      paymentSuccessfull();
    }
  }, [getRoomId, getLandlordId, getStatus]);

  console.log({
    status: getStatus,
    landlordId: getLandlordId,
    roomId: getRoomId,
  });

  const paymentSuccessfull = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/rooms/myRooms/pending/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: getStatus,
            landlordId: getLandlordId,
            roomId: getRoomId,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.success) {
        toast.success(data.message);
      }
    } catch (error: any) {
      toast.error("Internal server error");
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-center">
        <div
          className="flex flex-col justify-center items-center rounded  border-gray-900 px-10 py-20 m-10 w-1/2
         gap-2 shadow-2xl relative"
        >
          <h1 className="text-4xl font-bold">Success</h1>
          <div className=" flex flex-col justify-center items-center">
            <Image src={success} alt="Correct" />
            <div className="flex flex-col justify-center items-center">
              <h2 className="font-bold text-2xl m-2">Payment Successful</h2>
              <p className="m-1 text-gray-400">
                Your transaction was completed successfully.
              </p>
            </div>
          </div>
          <Button
            className="absolute top-5 right-4 bg-red-500 hover:bg-red-600 border-none"
            onClick={() => router.push("/landlord/MyRooms")}
          >
            <ImCross />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
