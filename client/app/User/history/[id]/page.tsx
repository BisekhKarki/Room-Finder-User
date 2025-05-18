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
        `${base_url}/rented/tenant/room/history/${id}`,
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
    <div className="mt-10 py-10">
      <div
        className="text-2xl mb-5 flex items-center gap-1 ml-8"
        onClick={() => router.push("/user/history")}
      >
        <IoIosArrowRoundBack
          className=" text-gray-800 cursor-pointer"
          //   onClick={() => router.push("/user/properties")}
        />
        <p
          className="text-base cursor-pointer"
          //   onClick={() => router.push("/user/")}
        >
          Back
        </p>
      </div>
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
      <hr className="mt-10" />
      <div className="flex flex-wrap gap-2 md:gap-5 px-2 md:px-10">
        {viewComponentButtons.map((btn, index) => (
          <Button
            key={index}
            className={`${
              btn.index === buttonIndex
                ? "bg-blue-400 text-white hover:bg-blue-500"
                : "bg-white hover:bg-gray-50 text-black"
            } mt-4 md:mt-10 px-4 md:px-20 py-2 md:py-5 text-sm md:text-base border border-gray-300 shadow-md transition-all duration-200 ease-in-out w-full sm:w-auto`}
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
      {buttonIndex === 4 && (
        <PropertyLocation
          location={property?.pinnedLocation?.locationName || ""}
          longitude={property?.pinnedLocation?.longitude || 0}
          latitude={property?.pinnedLocation?.latitude || 0}
        />
      )}
      {buttonIndex === 5 && <PropertyImages propertyImage={property?.images} />}
    </div>
  );
};

export default Page;
