"use client";

import Description from "@/components/RoomView/Description";
import Features from "@/components/RoomView/Features";
import Location from "@/components/RoomView/Location";
import Overview from "@/components/RoomView/Overview";
import RentDetails from "@/components/RoomView/RentDetails";
import { Button } from "@/components/ui/button";
import ContactLandlord from "@/components/UserComponents/ContactLandlord";

import PropertyImages from "@/components/UserComponents/PropertyImages";
import PropertyLocation from "@/components/UserComponents/PropertyLocation";
import { base_url } from "@/constants/BaseUrl";
import { GetToken } from "@/constants/GetToken";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

export interface PropertyReviews {
  _id: string;
  comment: string;
  rating: number;
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
  reviews: Array<PropertyReviews>;
  rented_date: Date;
  rented_by: string;
  rented_user_name: string;
  room_id: string;
}

const viewComponentButtons = [
  { index: 1, label: "Info" },
  { index: 3, label: "Contact Landlord" },
  { index: 4, label: "Location" },
  { index: 5, label: "Images" },
  { index: 6, label: "Rent Details" },
];

const Page = () => {
  const [myroom, setMyRoom] = useState<PropertyDetails | null>(null);
  const [buttonIndex, setButtonIndex] = useState<number>(1);

  const token = GetToken();

  useEffect(() => {
    if (token) {
      fetchRoomDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchRoomDetails = async () => {
    try {
      const response = await fetch(`${base_url}/rented/tenants/rooms`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setMyRoom(data.message);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  return (
    <div className="mt-20 mb-14">
      {myroom ? (
        <div>
          <div className="">
            {myroom && myroom.images && myroom.images.length > 0 && (
              <div className="relative">
                <div className="flex px-8 gap-3">
                  <div className="">
                    <Image
                      src={myroom?.images[0]}
                      alt="room images"
                      width={1200}
                      height={1300}
                      className="h-full rounded-md hover:shadow-lg cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    {myroom.images &&
                      myroom.images
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
          {buttonIndex === 1 && myroom && (
            <div className="flex flex-row gap-5 px-5">
              <div className="py-5 border w-full mt-10 px-10 rounded-md  border-gray-300">
                <Overview basic={myroom?.basic} />
                <Description description={myroom?.basic.description} />
                <Features features={myroom?.features} />
                <Location location={myroom?.location} />
                <div className="mb-16">
                  <h1 className="font-bold text-3xl mb-3 font-sans">
                    Landlord Contact Details
                  </h1>
                  <hr />
                  <div className=" flex  justify-between mt-5">
                    <p className="text-gray-500 text-base">
                      Name: {myroom?.contact.username}
                    </p>
                    <p className="text-gray-500 text-base">
                      Email: {myroom?.contact.email}
                    </p>
                    <p className="text-gray-500 text-base">
                      Phone: {myroom?.contact.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {myroom && buttonIndex === 3 && (
            <ContactLandlord
              landlordEmail={myroom?.contact.email}
              landlordName={myroom?.contact.username}
            />
          )}
          {buttonIndex === 4 && (
            <PropertyLocation
              location={myroom?.location.city + ", " + myroom?.location.city}
            />
          )}
          {buttonIndex === 5 && (
            <PropertyImages propertyImage={myroom.images} />
          )}
          {myroom && buttonIndex === 6 && (
            <RentDetails
              room={myroom}
              rentDate={myroom?.rented_date}
              token={token}
            />
          )}
        </div>
      ) : (
        <div className="h-[61vh]">
          <p className="font-bold text-3xl px-20">No room rented</p>
        </div>
      )}
    </div>
  );
};

export default Page;
