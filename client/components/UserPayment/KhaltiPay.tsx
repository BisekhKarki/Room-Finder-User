"use client";

import React from "react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import khalti from "../../assets/Khalti.jpg";
import Image from "next/image";

interface Props {
  name: string;
  id: string;
  amount: string;
  roomId: string;
}

const KhaltiPay = ({ name, id, amount, roomId }: Props) => {
  const makePayment = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/payment/landlord/khalti",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            id,
            amount,
            roomId,
          }),
        }
      );
      const url = await response.json();

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
        <Image
          src={khalti}
          alt="Khalti Payment"
          width={50}
          height={50}
          className="bg-transparent"
        />{" "}
        khalti Payment
      </Button>
    </div>
  );
};

export default KhaltiPay;
