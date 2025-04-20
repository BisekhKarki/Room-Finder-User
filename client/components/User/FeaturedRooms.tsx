"use client";
import { tenant_base_url } from "@/constants/BaseUrl";
import { GetToken } from "@/constants/GetToken";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "../ui/button";
import { FaAngleRight } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export interface ContactData {
  email: string;
  phone: string;
  username: string;
}

export interface BasicData {
  description: string;
  name: string;
  price: string;
  type: string;
}

export interface FeaturesData {
  Kitchen: string;
  balcony: string;
  category: string;
  direction: string;
  floor: string;
  parking: string;
  waterfacility: string;
}

export interface LocationData {
  Province: string;
  city: string;
  landmark: string;
  region: string;
  street: string;
  zip: string;
}

export interface FeaturedRoom {
  basic: BasicData;
  features: FeaturesData;
  images: string[];
  isVerified: boolean;
  landlordId: string;
  location: LocationData;
  contact: ContactData;
  payment: boolean;
  __v: number;
  _id: string;
}

const FeaturedRooms = () => {
  const [featured, setFeatured] = useState<Array<FeaturedRoom> | []>([]);
  const [getToken, setGetToken] = useState<string>("");
  const token = GetToken();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      setGetToken(token);
    }
  }, [token]);

  const fetchFeaturedRooms = async () => {
    try {
      const response = await fetch(`${tenant_base_url}/rooms/featured`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setFeatured(data.message);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  useEffect(() => {
    if (getToken) {
      fetchFeaturedRooms();
    }
    //
  }, [getToken]);

  // console.log(featured);

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between px-20">
        <h1 className="mb-5 text-4xl font-bold text-center">Featured Rooms</h1>
        <div
          className="text-blue-500 flex items-center gap-1"
          onClick={() => router.push("/user/properties")}
        >
          <p className="underline cursor-pointer">View more </p>
          <FaAngleRight className="cursor-pointer" />
        </div>
      </div>
      <div className="grid grid-cols-3 px-12 justify-center gap-20 mt-10">
        {featured &&
          featured.length > 0 &&
          featured.map((feature, index) => (
            <div
              key={index}
              className="cursor-pointer hover:-translate-y-4 transition-all ease-out duration-150 hover:shadow-xl"
            >
              <Image
                src={feature.images[0]}
                alt="images"
                width={390}
                height={400}
                className="rounded-t-md hover:scale-105 transition-all duration-150 ease-in-out hover:shadow-xl hover:rounded-md"
              />
              <div className="border px-7 py-5 rounded-b-md">
                <h3 className="mb-1 text-gray-600">
                  Name: {feature.basic.name}
                </h3>
                <div className="flex gap-10">
                  <p className="text-gray-600">Rs.{feature.basic.price}</p>
                  <p className="text-gray-600">{feature.basic.type}</p>
                </div>
                <div className="flex gap-10 mt-1">
                  <p className="text-gray-600">
                    Province: {feature.location.Province}
                  </p>
                  <p className="text-gray-600">City: {feature.location.city}</p>
                </div>
                <Button className="w-full mt-5 bg-blue-500 hover:bg-blue-600">
                  View Details
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeaturedRooms;
