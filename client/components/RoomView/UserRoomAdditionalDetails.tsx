"use client";

import React from "react";
// import { Button } from "../ui/button";
import KhaltiPay from "../UserPayment/KhaltiPay";

interface Props {
  // payment: boolean;
  // verified: boolean;
  name: string;
  id: string;
  amount: string;
  roomId: string;
}

const UserRoomAdditionalDetails = ({ name, id, amount, roomId }: Props) => {
  return (
    <div>
      <h1 className="font-bold text-3xl mb-3 font-sans">Payment Details</h1>
      <hr />
      <div className="mt-10 flex  flex-col gap-5">
        <KhaltiPay id={id} amount={amount} roomId={roomId} name={name} />
      </div>
    </div>
  );
};

export default UserRoomAdditionalDetails;
