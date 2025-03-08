"use client";

import React from "react";

interface Props {
  payment: boolean;
  verified: boolean;
}

const AdditionalDetails = ({ payment, verified }: Props) => {
  return (
    <div>
      <h1 className="font-bold text-3xl mb-3 font-sans">Additional Details</h1>
      <hr />
      <div className="mt-10 flex  flex-col gap-5">
        <p className="text-gray-500 text-base">
          Payment: {payment ? "Already Paid" : "No payment made"}{" "}
        </p>
        <p className="text-gray-500 text-base">
          Verified: {verified ? "Room verified" : "Room not verified"}
        </p>
      </div>
    </div>
  );
};

export default AdditionalDetails;
