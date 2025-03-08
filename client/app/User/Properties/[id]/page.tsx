"use client";

import AdditionalDetails from "@/components/RoomView/AdditionalDetails";
import ContactDetails from "@/components/RoomView/ContactDetails";
import Description from "@/components/RoomView/Description";
import Features from "@/components/RoomView/Features";
import Location from "@/components/RoomView/Location";
import Overview from "@/components/RoomView/Overview";
import { Button } from "@/components/ui/button";
import { tenant_base_url } from "@/constants/BaseUrl";
import { GetToken } from "@/constants/GetToken";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";

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

export interface PropertyDetails {
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
  const params = useParams();
  const [id, setId] = useState<string>("");
  const [getToken, setToken] = useState<string>("");
  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const router = useRouter();

  const token = GetToken();
  useEffect(() => {
    setId(params.id);
  }, []);

  useEffect(() => {
    if (token) {
      setToken(token);
    }
  }, [token]);

  console.log(property);

  const fetchSingleRooms = async () => {
    try {
      const response = await axios.get(
        `${tenant_base_url}/rooms/property/details/single/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      const data = await response.data;
      if (response.status === 200) {
        setProperty(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (getToken) {
      fetchSingleRooms();
    }
  }, [getToken]);

  const increaseImageIndex = () => {
    if (property) {
      setImageIndex((prev) =>
        prev > property.images.length - 2 ? 0 : prev + 1
      );
    }
  };

  const decreaseImageIndex = () => {
    if (property) {
      setImageIndex((prevIndex) =>
        prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="mt-10 py-10">
      <div className="text-2xl mb-5 flex items-center gap-1">
        <IoIosArrowRoundBack
          className=" text-gray-800 cursor-pointer"
          onClick={() => router.push("/User/Properties")}
        />
        <p
          className="text-base cursor-pointer"
          onClick={() => router.push("/User/Properties")}
        >
          Back
        </p>
      </div>
      <div>
        {property && property.images && property.images.length > 0 && (
          <div className="relative">
            <div>
              <Image
                src={property?.images[imageIndex]}
                alt="room images"
                width={1200}
                height={1200}
                className="px-5"
              />
            </div>
            <div className="absolute top-96">
              <div className="flex flex-row justify-between gap-2">
                <Button
                  className="bg-white text-black"
                  onClick={() => decreaseImageIndex()}
                >
                  <FaAngleLeft />
                </Button>

                <Button
                  className="bg-white text-black"
                  onClick={() => increaseImageIndex()}
                >
                  <FaAngleRight />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {property && (
        <div className="flex flex-row gap-5">
          <div className="py-5 border w-3/4 mt-10 px-10 rounded-md  border-gray-300">
            <Overview basic={property.basic} />
            <Description description={property.basic.description} />
            <Features features={property.features} />
            <Location location={property.location} />
          </div>
          <div className="w-1/4 border mt-10 rounded-md border-gray-200">
            <div className="px-5 py-5">
              <ContactDetails contact={property.contact} />
              <AdditionalDetails
                payment={property.payment}
                verified={property.isVerified}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesSection;
