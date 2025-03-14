"use client";

import React from "react";
// import { Button } from "../ui/button";
import KhaltiPay from "../UserPayment/KhaltiPay";

interface Props {
  payment: boolean;
  verified: boolean;
}

const UserRoomAdditionalDetails = ({ name, id, amount, roomId }: Props) => {
  return (
    <div>
      <h1 className="font-bold text-3xl mb-3 font-sans">Payment Details</h1>
      <hr />
      <div className="mt-10 flex  flex-col gap-5">
        <KhaltiPay id="" amount="" roomId="" name="" />
      </div>
    </div>
  );
};

export default UserRoomAdditionalDetails;
