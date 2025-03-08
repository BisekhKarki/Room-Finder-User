"use client";
import { base_url } from "@/constants/BaseUrl";
import { GetToken } from "@/constants/GetToken";
import { RootState } from "@/store/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
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

const PropertiesSection = () => {
  const [properties, setProperties] = useState<Array<FeaturedRoom> | []>([]);
  const [getToken, setGetToken] = useState<string>("");
  const token = GetToken();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      setGetToken(token);
    }
  }, [token]);

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${base_url}/tenants/rooms/featured`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setProperties(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (getToken) {
      fetchRooms();
    }
  }, [getToken]);

  return (
    <div className="mt-10 py-10">
      <div className="">
        <h1 className="mb-5 text-4xl font-bold px-24">Properties</h1>
      </div>
      <div className="flex justify-center gap-20 mt-10">
        {properties &&
          properties.length > 0 &&
          properties.map((property, index) => (
            <div
              key={index}
              className="cursor-pointer hover:-translate-y-4 transition-all ease-out duration-150 hover:shadow-xl"
            >
              <Image
                src={property.images[0]}
                alt="images"
                width={390}
                height={400}
                className="rounded-t-md hover:scale-105 transition-all duration-150 ease-in-out hover:shadow-xl hover:rounded-md"
              />
              <div className="border px-7 py-5 rounded-b-md">
                <h3 className="mb-1 text-gray-600">
                  Name: {property.basic.name}
                </h3>
                <div className="flex gap-10">
                  <p className="text-gray-600">Rs.{property.basic.price}</p>
                  <p className="text-gray-600">{property.basic.type}</p>
                </div>
                <div className="flex gap-10 mt-1">
                  <p className="text-gray-600">
                    Province: {property.location.Province}
                  </p>
                  <p className="text-gray-600">
                    City: {property.location.city}
                  </p>
                </div>
                <Button
                  className="w-full mt-5 bg-blue-500 hover:bg-blue-600"
                  onClick={() =>
                    router.push(`/User/Properties/${property._id}`)
                  }
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PropertiesSection;
