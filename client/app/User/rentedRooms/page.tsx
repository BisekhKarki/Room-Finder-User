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

interface PropertyPinnedLocation {
  locationName: string;
  latitude: number;
  longitude: number;
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
  last_payment: Date;
  rented_user_name: string;
  room_id: string;
  pinnedLocation: PropertyPinnedLocation;
}

const viewComponentButtons = [
  { index: 1, label: "Info" },
  { index: 3, label: "Contact Landlord" },
  { index: 4, label: "Location" },
  { index: 5, label: "Images" },
  { index: 6, label: "Rent Details" },
];

interface UserDetails {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Address: string;
  UserType: string;
}

const Page = () => {
  const [myroom, setMyRoom] = useState<PropertyDetails | null>(null);
  const [buttonIndex, setButtonIndex] = useState<number>(1);
  const [user, setUser] = useState<UserDetails | null>(null);

  const token = GetToken();

  useEffect(() => {
    if (token) {
      fetchRoomDetails();
      fetchUserDetails();
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

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${base_url}/user/personal`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setUser(data.message);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  return (
    <div className="mt-10 md:mt-20 mb-10 md:mb-14 px-4 sm:px-6 lg:px-8">
      {myroom ? (
        <div>
          {myroom && myroom?.images?.length > 0 && (
            <div className="relative h-48 md:h-96 w-full">
              <Image
                src={myroom.images[0]}
                alt="room images"
                fill
                className="rounded-md object-cover"
              />
            </div>
          )}
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
                location={myroom?.pinnedLocation?.locationName || ""}
                longitude={myroom?.pinnedLocation?.longitude || 0}
                latitude={myroom?.pinnedLocation?.latitude || 0}
              />
            </div>
          )}
          {buttonIndex === 5 && (
            <div className="mt-6 md:mt-10 px-4 md:px-8">
              <PropertyImages propertyImage={myroom.images} />
            </div>
          )}
          {myroom && user && buttonIndex === 6 && (
            <div className="mt-6 md:mt-10 px-4 md:px-8">
              <RentDetails
                room={myroom}
                rentDate={myroom?.last_payment}
                token={token}
                user={user}
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
