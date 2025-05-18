"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import success from "../../../assets/Successpayment.png";
import { useRouter } from "next/navigation";
import { ImCross } from "react-icons/im";
import { base_url } from "@/constants/BaseUrl";
import { GetToken } from "@/constants/GetToken";
// import toast from "react-hot-toast";

interface PurchaseDetails {
  buyer_name: string;
  payment_type: string;
  purchase_amount: number;
  purchase_date: string | Date;
  purchase_type: string;
  room_id: string;
  seller_name: string;
  landlord_id: string;
  tenant_id?: string;
}

const Page = () => {
  const router = useRouter();

  const [purchaseDetails, setPurchaseDetails] =
    useState<PurchaseDetails | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getItems = localStorage.getItem("Rent_Purchase_Details");
      console.log("From localStorage:", getItems);
      if (getItems) {
        setPurchaseDetails(JSON.parse(getItems));
      }
    }
  }, []);
  const token = GetToken();
  useEffect(() => {
    if (token && purchaseDetails) {
      savePurchaseDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, purchaseDetails]);
  const savePurchaseDetails = async () => {
    try {
      const response = await fetch(
        `${base_url}/payment/tenants/khalti/purchase/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(purchaseDetails),
        }
      );
      const data = await response.json();
      console.log(data.message);
    } catch (error: unknown) {
      console.log(String(error));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl">
        <div className="relative bg-white rounded-xl border border-gray-200 shadow-lg p-6 sm:p-8 md:p-12 transition-all duration-300 hover:shadow-xl">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-red-500 hover:bg-red-50 rounded-full p-1.5"
            onClick={() => router.push("/User/Properties")}
          >
            <ImCross className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>

          {/* Content Container */}
          <div className="flex flex-col items-center space-y-6 md:space-y-8">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Success
            </h1>

            {/* Image Section */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
              <Image
                src={success}
                alt="Payment Successful"
                layout="fill"
                objectFit="contain"
                className="animate-pulse"
              />
            </div>

            {/* Status Section */}
            <div className="text-center space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Payment Successful
              </h2>
              <p className="text-gray-500 text-sm sm:text-base max-w-md">
                Your transaction was completed successfully.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
