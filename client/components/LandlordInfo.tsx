"use client";
import React from "react";
import { FaUser } from "react-icons/fa";

const LandlordInfo = () => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow px-6 py-12 md:px-10 md:py-20 max-w-max mx-auto">
      <div className="flex items-center gap-4 md:gap-6">
        <FaUser className="text-2xl md:text-3xl text-green-500" />
        <div>
          <p className="text-xl md:text-2xl font-semibold text-gray-800">
            1203
          </p>
          <p className="text-sm md:text-base text-gray-500">Total Tenants</p>
        </div>
      </div>
    </div>
  );
};

export default LandlordInfo;
