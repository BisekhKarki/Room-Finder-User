"use client";

import Description from "@/components/RoomView/Description";
import Features from "@/components/RoomView/Features";
import Location from "@/components/RoomView/Location";
import Overview from "@/components/RoomView/Overview";

import { Button } from "@/components/ui/button";
import ContactLandlord from "@/components/UserComponents/ContactLandlord";
import History from "@/components/UserComponents/History";
import PropertyImages from "@/components/UserComponents/PropertyImages";
import PropertyLocation from "@/components/UserComponents/PropertyLocation";
import { base_url, tenant_base_url } from "@/constants/BaseUrl";
import { GetToken } from "@/constants/GetToken";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { IoIosArrowRoundBack } from "react-icons/io";
import RentRoom from "@/components/UserComponents/RentRoom";
import toast from "react-hot-toast";
import UserPayment from "@/components/UserComponents/UserPayment";

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

export interface reviewsArray {
  comment: string;
  rating: number;
  _id: string;
  created_at: Date;
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
  reviews: Array<reviewsArray> | [];
}

const viewComponentButtons = [
  { index: 1, label: "Info" },
  { index: 2, label: "History" },
  { index: 3, label: "Contact Landlord" },
  { index: 4, label: "Location" },
  { index: 5, label: "Images" },
  { index: 6, label: "Rent Room" },
];

const PropertiesSection = () => {
  const params = useParams();
  const [id, setId] = useState<string>("");
  const [getToken, setToken] = useState<string>("");
  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [buttonIndex, setButtonIndex] = useState<number>(1);
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

  const [applicationStatus, setApplicationStatus] = useState<boolean>(false);
  const getApprovalStatus = async () => {
    const roomId = property?._id;
    const landlordId = property?.landlordId;
    try {
      const response = await fetch(
        `${base_url}/rooms/rent/tenant/application/approval/check/${roomId}/${landlordId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.status == 200) {
        setApplicationStatus(data.message);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  useEffect(() => {
    if (property) {
      getApprovalStatus();
    }
  }, [property]);

  return (
    <div className="mt-10 py-10">
      <div className="text-2xl mb-5 flex items-center gap-1 ml-8">
        <IoIosArrowRoundBack
          className=" text-gray-800 cursor-pointer"
          onClick={() => router.push("/user/properties")}
        />
        <p
          className="text-base cursor-pointer"
          onClick={() => router.push("/user/properties")}
        >
          Back
        </p>
      </div>
      <div className="">
        {property && property.images && property.images.length > 0 && (
          <div className="relative">
            <div className="flex px-8 gap-3">
              <div className="">
                <Image
                  src={property?.images[0]}
                  alt="room images"
                  width={1200}
                  height={1300}
                  className="h-full rounded-md hover:shadow-lg cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-2">
                {property.images &&
                  property.images
                    .slice(1)
                    .map((img, index) => (
                      <Image
                        key={index}
                        src={img}
                        alt="room images"
                        width={400}
                        height={400}
                        className="rounded-md hover:scale-105 hover:shadow-xl cursor-pointer transition-all duration-300 ease-in-out"
                      />
                    ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <hr className="mt-10" />
      <div className="flex px-10 gap-5">
        {viewComponentButtons.map((btn, index) => (
          <Button
            key={index}
            className={` ${
              btn.index === buttonIndex
                ? "bg-blue-400 text-white hover:bg-blue-500"
                : "bg-white hover:bg-gray-50  text-black"
            }  mt-10 px-20 py-5 text-base border border-gray-300 shadow-md  transition-all duration-200 ease-in-out`}
            onClick={() => setButtonIndex(btn.index)}
          >
            {btn.label}
          </Button>
        ))}
      </div>

      {buttonIndex === 1 && property && (
        <div className="flex flex-row gap-5 px-5">
          <div className="py-5 border w-full mt-10 px-10 rounded-md  border-gray-300">
            <Overview basic={property.basic} />
            <Description description={property.basic.description} />
            <Features features={property.features} />
            <Location location={property.location} />
            <div className="mb-16">
              <h1 className="font-bold text-3xl mb-3 font-sans">
                Landlord Contact Details
              </h1>
              <hr />
              <div className=" flex  justify-between mt-5">
                <p className="text-gray-500 text-base">
                  Name: {property.contact.username}
                </p>
                <p className="text-gray-500 text-base">
                  Email: {property.contact.email}
                </p>
                <p className="text-gray-500 text-base">
                  Phone: {property.contact.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {property && buttonIndex === 2 && <History review={property.reviews} />}
      {property && buttonIndex === 3 && (
        <ContactLandlord
          landlordEmail={property?.contact.email}
          landlordName={property.contact.username}
        />
      )}
      {buttonIndex === 4 && <PropertyLocation />}
      {buttonIndex === 5 && <PropertyImages />}
      {buttonIndex === 6 &&
        (applicationStatus ? (
          property &&
          token && (
            <UserPayment
              roomId={property?._id}
              price={property?.basic.price}
              token={token}
              seller={property.contact.username}
              landlord_id={property.landlordId}
            />
          )
        ) : (
          <RentRoom roomId={id} landlordId={property && property.landlordId} />
        ))}
    </div>
  );
};

export default PropertiesSection;
