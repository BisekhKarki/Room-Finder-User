"use client";
import React, { useEffect, useState } from "react";
import userProfile from "../../../assets/user.png";
import Image from "next/image";

import Error from "next/error";
import toast from "react-hot-toast";
import axios from "axios";

import { GetToken } from "@/constants/GetToken";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import LandlordInfo from "@/components/LandlordInfo";
import { useRouter } from "next/navigation";

interface userDetails {
  Address: string;
  Email: string;
  FirstName: string;
  LastName: string;
  Phone: string;
  UserType: string;
}

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState<userDetails | null>(null);
  const [getToken, setGetToken] = useState<string>("");
  const token = GetToken();

  const getuserDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/user/get/details/user",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      const data = response.data;

      if (response.status === 200) {
        setUser(data.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (token) {
      setGetToken(token);
    }
  }, [token]);

  useEffect(() => {
    if (getToken) {
      getuserDetails();
    }
  }, [getToken]);

  return (
    <div className="py-10">
      <div className="flex gap-20 ">
        <div className="border border-gray-200 rounded-lg px-20 py-10 ml-20 shadow ">
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold mb-1">Room Finder</h1>
            <p className="text-gray-500">
              Your Perfect Space, Just a Click Away!
            </p>
            <hr className="mt-10 mb-2" />
          </div>
          {/* User Information section */}
          <h1 className="text-center text-2xl font-bold mb-10">
            User Information
          </h1>
          <div className="">
            <div className="flex justify-center items-center gap-5">
              <Image src={userProfile} alt="user" width={80} height={100} />
              <div>
                <p className="text-xl font-bold">
                  {user?.FirstName} {user?.LastName}
                </p>
                <p className="text-sm text-gray-500">{user?.Email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Address: {user?.Address}
                </p>
                <p className="text-sm text-gray-600">Phone: {user?.Phone}</p>
                <p className="text-sm text-gray-600">
                  User Type: {user?.UserType}
                </p>
              </div>
            </div>
          </div>
          <hr className="mt-10 mb-2" />
          <div>
            <button
              type="button"
              className="bg-blue-400 px-5 py-2 rounded text-white shadow hover:bg-blue-500 mt-2"
              onClick={() => router.push("/landlord/RoomsPosting")}
            >
              Add Property
            </button>
            <div className="mt-10 flex gap-20">
              <div className="bg-gray-50 rounded-md shadow px-10 py-5 text-center">
                <h4>Active Rooms</h4>
                <p>0</p>
              </div>
              <div className="bg-gray-50 rounded-md shadow px-10 py-5 text-center">
                <h4>Pending Rooms For Approval</h4>
                <p>0</p>
              </div>
            </div>
          </div>
          <hr className="mt-10 mb-5" />
          <ChangePasswordForm />
          <hr className="mt-2 mb-5" />
        </div>
        <LandlordInfo />
      </div>
    </div>
  );
};

export default Page;
