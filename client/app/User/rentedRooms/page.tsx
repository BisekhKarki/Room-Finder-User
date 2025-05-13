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

interface ContactData {
  email: string;
  phone: string;
  username: string;
}

interface BasicData {
  description: string;
  name: string;
  price: string;
  type: string;
}

interface FeaturesData {
  Kitchen: string;
  balcony: string;
  category: string;
  direction: string;
  floor: string;
  parking: string;
  waterfacility: string;
}

interface LocationData {
  Province: string;
  city: string;
  landmark: string;
  region: string;
  street: string;
  zip: string;
}

interface PropertyReviews {
  _id: string;
  comment: string;
  rating: number;
  created_at: Date;
}

interface PropertyDetails {
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
    <div className="mt-10 md:mt-20 mb-10 md:mb-14 px-4 sm:px-6 lg:px-8">
      {myroom ? (
        <div>
          <div className="">
            {myroom && myroom.images && myroom.images.length > 0 && (
              <div className="relative">
                <div className="flex items-center justify-center">
                  <div className="w-full ">
                    <Image
                      src={myroom?.images[0]}
                      alt="room images"
                      width={1200}
                      height={1300}
                      className="h-full w-full rounded-md object-cover aspect-video"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <hr className="mt-6 md:mt-10" />
          <div className="flex flex-wrap gap-3 md:gap-5 mt-6 md:mt-10">
            {viewComponentButtons.map((btn, index) => (
              <Button
                key={index}
                className={`w-full sm:w-auto ${
                  btn.index === buttonIndex
                    ? "bg-blue-400 text-white hover:bg-blue-500"
                    : "bg-white hover:bg-gray-50 text-black"
                } px-4 py-3 text-sm md:text-base md:px-20 md:py-5 border border-gray-300 shadow-md transition-all duration-200 ease-in-out`}
                onClick={() => setButtonIndex(btn.index)}
              >
                {btn.label}
              </Button>
            ))}
          </div>
          {buttonIndex === 1 && myroom && (
            <div className="flex flex-col lg:flex-row gap-5 mt-6 md:mt-10">
              <div className="py-5 border w-full mt-6 md:mt-10 px-4 md:px-8 lg:px-10 rounded-md border-gray-300">
                <Overview basic={myroom?.basic} />
                <Description description={myroom?.basic.description} />
                <Features features={myroom?.features} />
                <Location location={myroom?.location} />
                <div className="mb-8 md:mb-16">
                  <h1 className="font-bold text-xl md:text-3xl mb-3 font-sans">
                    Landlord Contact Details
                  </h1>
                  <hr />
                  <div className="flex flex-col md:flex-row justify-between mt-4 space-y-2 md:space-y-0 md:space-x-4">
                    <p className="text-gray-500 text-sm md:text-base">
                      Name: {myroom?.contact.username}
                    </p>
                    <p className="text-gray-500 text-sm md:text-base">
                      Email: {myroom?.contact.email}
                    </p>
                    <p className="text-gray-500 text-sm md:text-base">
                      Phone: {myroom?.contact.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {myroom && buttonIndex === 3 && (
            <div className="mt-6 md:mt-10 px-4 md:px-8">
              <ContactLandlord
                landlordEmail={myroom?.contact.email}
                landlordName={myroom?.contact.username}
              />
            </div>
          )}
          {buttonIndex === 4 && (
            <div className="mt-6 md:mt-10 px-4 md:px-8">
              <PropertyLocation
                location={`${myroom?.location.city}, ${myroom?.location.Province}`}
              />
            </div>
          )}
          {buttonIndex === 5 && (
            <div className="mt-6 md:mt-10 px-4 md:px-8">
              <PropertyImages propertyImage={myroom.images} />
            </div>
          )}
          {myroom && buttonIndex === 6 && (
            <div className="mt-6 md:mt-10 px-4 md:px-8">
              <RentDetails
                room={myroom}
                rentDate={myroom?.rented_date}
                token={token}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="h-[50vh] flex items-center justify-center mb-36">
          <p className="font-bold text-xl md:text-3xl text-center">
            No room rented
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
