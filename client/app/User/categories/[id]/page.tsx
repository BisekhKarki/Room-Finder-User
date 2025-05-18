"use client";

import {
  BasicData,
  ContactData,
  FeaturesData,
  LocationData,
} from "@/components/User/FeaturedRooms";
import React, { useEffect, useState } from "react";
import { base_url, tenant_base_url } from "@/constants/BaseUrl";
import axios from "axios";
import { GetToken } from "@/constants/GetToken";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import History from "@/components/UserComponents/History";
import ContactLandlord from "@/components/UserComponents/ContactLandlord";
import PropertyLocation from "@/components/UserComponents/PropertyLocation";
import PropertyImages from "@/components/UserComponents/PropertyImages";
import UserPayment from "@/components/UserComponents/UserPayment";
import RentRoom from "@/components/UserComponents/RentRoom";
import Overview from "@/components/RoomView/Overview";
import Description from "@/components/RoomView/Description";
import Features from "@/components/RoomView/Features";
import Location from "@/components/RoomView/Location";
import { IoIosArrowRoundBack } from "react-icons/io";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const viewComponentButtons = [
  { index: 1, label: "Info" },
  { index: 2, label: "History" },
  { index: 3, label: "Contact Landlord" },
  { index: 4, label: "Location" },
  { index: 5, label: "Images" },
  { index: 6, label: "Rent Room" },
];

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
  reviews: Array<reviewsArray> | [];
  pinnedLocation: PropertyPinnedLocation;
}

const Page = () => {
  const params = useParams();
  const [id, setId] = useState<string | undefined>("");
  const [getToken, setToken] = useState<string>("");
  const [property, setProperty] = useState<PropertyDetails | null>(null);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-6 md:mt-10 py-6 md:py-10 px-4 sm:px-6 lg:px-8">
      {/* Back Button Section */}
      <div className="text-lg md:text-2xl mb-4 md:mb-5 flex items-center gap-1 ml-2 sm:ml-4 md:ml-8">
        <IoIosArrowRoundBack
          className="text-gray-800 cursor-pointer hover:text-gray-600"
          onClick={() => router.push("/User/categories")}
        />
        <p
          className="text-sm md:text-base cursor-pointer hover:text-gray-600"
          onClick={() => router.push("/User/categories")}
        >
          Back
        </p>
      </div>

      {/* Main Image Section */}
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
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-2 sm:px-4 md:px-8 mt-6 md:mt-10">
        {viewComponentButtons.map((btn) => (
          <Button
            key={btn.index}
            className={`text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-2 md:py-3 ${
              btn.index === buttonIndex
                ? "bg-blue-400 text-white hover:bg-blue-500"
                : "bg-white text-black hover:bg-gray-50"
            } border border-gray-200 md:border-300 shadow-sm transition-all`}
            onClick={() => setButtonIndex(btn.index)}
          >
            {btn.label}
          </Button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="px-2 sm:px-4 md:px-8">
        {buttonIndex === 1 && property && (
          <div className="flex flex-col lg:flex-row gap-3 md:gap-5 mt-6 md:mt-10">
            <div className="w-full py-3 md:py-5 border mt-3 sm:mt-6 md:mt-10 px-2 sm:px-4 md:px-8 rounded-md border-gray-200 md:border-gray-300">
              {/* Contact Details */}
              <div className="mb-4 md:mb-8">
                <h1 className="font-bold text-lg sm:text-xl md:text-3xl mb-2 md:mb-3">
                  Landlord Contact Details
                </h1>
                <hr />
                <div className="flex flex-col sm:flex-row justify-between gap-1 md:gap-2 mt-3 md:mt-5 text-xs sm:text-sm md:text-base">
                  <p className="truncate">Name: {property.contact.username}</p>
                  <p className="truncate">Email: {property.contact.email}</p>
                  <p className="truncate">Phone: {property.contact.phone}</p>
                </div>
              </div>

              {/* Info Sections */}
              <Overview basic={property.basic} />
              <Description description={property.basic.description} />
              <Features features={property.features} />
              <Location location={property.location} />
            </div>
          </div>
        )}

        {/* Other Sections */}
        {property && buttonIndex === 2 && (
          <div className="mt-4 md:mt-8">
            <History review={property.reviews} />
          </div>
        )}

        {property && buttonIndex === 3 && (
          <div className="mt-4 md:mt-8  mx-auto">
            <ContactLandlord
              landlordEmail={property.contact.email}
              landlordName={property.contact.username}
            />
          </div>
        )}

        {buttonIndex === 4 && (
          <div className="mt-4 md:mt-8">
            <PropertyLocation
              location={property?.pinnedLocation.locationName || ""}
              longitude={property?.pinnedLocation.longitude || 0}
              latitude={property?.pinnedLocation.latitude || 0}
            />
          </div>
        )}

        {buttonIndex === 5 && (
          <div className="mt-4 md:mt-8">
            <PropertyImages propertyImage={property?.images} />
          </div>
        )}

        {buttonIndex === 6 && (
          <div className="mt-4 md:mt-8 max-w-2xl mx-auto px-2 sm:px-4">
            {applicationStatus ? (
              <UserPayment
                roomId={property?._id as string}
                price={property?.basic.price as string}
                token={token}
                seller={property?.contact.username as string}
                landlord_id={property?.landlordId as string}
              />
            ) : (
              <RentRoom
                roomId={id}
                property={property as unknown as PropertyDetails}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
