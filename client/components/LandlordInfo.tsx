"use client";
import React from "react";
import { FaUser } from "react-icons/fa";

const LandlordInfo = () => {
  return (
    <div className="border border-gray-200 rounded-lg shadow px-10 py-20">
      <div className="flex items-center gap-5">
        <FaUser className="text-2xl text-green-500 " />
        <div>
          <p className="text-base">1203</p>
          <p text-sm>Total Tenants</p>
        </div>
      </div>
    </div>
  );
};

export default LandlordInfo;
