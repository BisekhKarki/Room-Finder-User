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
  buyer_name: string; // Corrected from "uyer_name"
  payment_type: string;
  purchase_amount: number;
  purchase_date: string | Date; // Can be either a string (ISO format) or Date object
  purchase_type: string;
  room_id: string;
  seller_name: string; // Corrected incomplete value
}

const Page = () => {
  const router = useRouter();

  const [purchaseDetails, setPurchaseDetails] =
    useState<PurchaseDetails | null>(null);

  useEffect(() => {
    const getItems = localStorage.getItem("Rent_Purchase_Details");
    if (getItems) {
      setPurchaseDetails(JSON.parse(getItems));
    }
  }, []);
  const token = GetToken();
  useEffect(() => {
    if (token) {
      savePurchaseDetails();
    }
  }, [token]);
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
            onClick={() => router.push("/user/properties")}
          >
            <ImCross />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
