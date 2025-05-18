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
import { base_url } from "@/constants/BaseUrl";
import { GetToken } from "@/constants/GetToken";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { IoIosArrowRoundBack } from "react-icons/io";
import RentRoom from "@/components/UserComponents/RentRoom";

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
  province: string;
  city: string;
  landmark: string;
  region: string;
  street: string;
  zip: string;
}

interface reviewsArray {
  comment: string;
  rating: number;
  _id: string;
  created_at: Date;
}
interface PropertyPinnedLocation {
  locationName: string;
  latitude: number;
  longitude: number;
}

interface PropertyProps {
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
  pinnedLocation: PropertyPinnedLocation;
}

const viewComponentButtons = [
  { index: 1, label: "Info" },
  { index: 2, label: "History" },
  { index: 3, label: "Contact Landlord" },
  { index: 4, label: "Location" },
  { index: 5, label: "Images" },
  { index: 6, label: "Rent Room" },
];

const Page = () => {
  const params = useParams();
  const [id, setId] = useState<string>("");
  const [getToken, setToken] = useState<string>("");
  const [property, setProperty] = useState<PropertyProps | null>(null);
  const [buttonIndex, setButtonIndex] = useState<number>(1);
  const router = useRouter();

  const token = GetToken();
  useEffect(() => {
    setId(params.id as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) {
      setToken(token);
    }
  }, [token]);

  const fetchSingleRooms = async () => {
    try {
      const response = await axios.get(
        `${base_url}/watchlists/get/single/${id}`,
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
    } catch (error: unknown) {
      console.log(String(error));
    }
  };

  useEffect(() => {
    if (getToken) {
      fetchSingleRooms();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getToken]);

  return (
    <div className="mt-4 py-4 md:py-10 px-4">
      {/* Back Button */}
      <div
        className="flex items-center gap-1 mb-4 md:mb-5 ml-2 md:ml-8"
        onClick={() => router.push("/User/watchlists")}
      >
        <IoIosArrowRoundBack className="text-gray-800 cursor-pointer text-2xl md:text-3xl" />
        <p className="text-xs md:text-sm cursor-pointer">Back</p>
      </div>

      {/* Main Image */}
      {property && property?.images?.length > 0 && (
        <div className="relative h-48 md:h-96 w-full">
          <Image
            src={property.images[0]}
            alt="room images"
            fill
            className="rounded-md object-cover"
          />
        </div>
      )}

      <hr className="mt-6 md:mt-10" />

      {/* Navigation Buttons */}
      <div className="grid grid-cols-3 xs:grid-cols-3 sm:grid-cols-6 gap-1 md:gap-2 mt-4 md:mt-6">
        {viewComponentButtons.map((btn) => (
          <Button
            key={btn.index}
            className={`text-xs xs:text-xs sm:text-sm md:text-base 
              h-10 md:h-14 px-2 md:px-4 rounded-sm md:rounded-md 
              truncate hover:bg-gray-50 transition-all ${
                buttonIndex === btn.index
                  ? "bg-blue-400"
                  : "bg-white text-black"
              }`}
            onClick={() => setButtonIndex(btn.index)}
          >
            {btn.label}
          </Button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="mt-6 md:mt-10">
        {property && buttonIndex === 1 && (
          <div className="space-y-6 md:space-y-8">
            <Overview basic={property.basic} />
            <Description description={property.basic.description} />
            <Features features={property.features} />
            <Location location={property.location} />

            <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
              <h2 className="text-lg md:text-2xl font-semibold mb-3">
                Landlord Contact
              </h2>
              <div className="space-y-2 md:space-y-0 md:flex md:justify-between">
                <p className="text-xs md:text-sm">
                  <span className="font-medium">Name:</span>{" "}
                  {property.contact.username}
                </p>
                <p className="text-xs md:text-sm">
                  <span className="font-medium">Email:</span>{" "}
                  {property.contact.email}
                </p>
                <p className="text-xs md:text-sm">
                  <span className="font-medium">Phone:</span>{" "}
                  {property.contact.phone}
                </p>
              </div>
            </div>
          </div>
        )}

        {property && buttonIndex === 2 && <History review={property.reviews} />}

        {buttonIndex === 3 && property && (
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <ContactLandlord
              landlordEmail={property.contact.email}
              landlordName={property.contact.username}
            />
          </div>
        )}

        {buttonIndex === 4 && property && (
          <div className="h-64 md:h-96">
            <PropertyLocation
              location={property.pinnedLocation?.locationName}
              longitude={property.pinnedLocation?.longitude}
              latitude={property.pinnedLocation?.latitude}
            />
          </div>
        )}

        {buttonIndex === 5 && property && (
          <PropertyImages propertyImage={property.images} />
        )}

        {buttonIndex === 6 && property && (
          <RentRoom property={property} roomId={id} />
        )}
      </div>
    </div>
  );
};

export default Page;
