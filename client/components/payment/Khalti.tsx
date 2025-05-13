"use client";

import React from "react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { GetToken } from "@/constants/GetToken";
import { base_url } from "@/constants/BaseUrl";

interface Props {
  name: string;
  id: string;
  amount: string;
  roomId: string;
}

const Khalti = ({ name, id, amount, roomId }: Props) => {
  localStorage.setItem("RoomId", JSON.stringify(roomId));
  const token = GetToken();

  const makePayment = async () => {
    try {
      const response = await fetch(`${base_url}/payment/landlord/khalti`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          id,
          amount,
          roomId,
        }),
      });
      const url = await response.json();
      console.log(url);

      if (url.success) {
        window.location.href = url.message;
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  return (
    <div>
      <Button
        className="mb-2 mt-5 bg-[#5C2E91] hover:bg-[#542985] text-white w-full h-10"
        onClick={() => makePayment()}
      >
        khalti Payment
      </Button>
    </div>
  );
};

export default Khalti;
