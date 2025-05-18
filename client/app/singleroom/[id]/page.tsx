"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const viewComponentButtons = [
  { index: 1, label: "Info" },
  { index: 2, label: "History" },
  { index: 3, label: "Contact Landlord" },
  { index: 4, label: "Location" },
  { index: 5, label: "Images" },
  { index: 6, label: "Rent Room" },
];

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
  rented_user_name: string;
  room_id: string;
  pinnedLocation: PropertyPinnedLocation;
}

const Page = () => {
  const params = useParams();

  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [buttonIndex, setButtonIndex] = useState<number>(1);
  const router = useRouter();

  const fetchSingleRooms = async () => {
    try {
      const response = await axios.get(
        `${base_url}/rooms/single/${params.id}`,
        {
          headers: {
            "Content-Type": "application/json",
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
    fetchSingleRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mt-10 py-10">
        {/* Back Button Section */}
        <div className="text-2xl mb-5 flex items-center gap-1 ml-4 md:ml-8">
          <IoIosArrowRoundBack
            className="text-gray-800 cursor-pointer"
            onClick={() => router.push("/")}
          />
          <p
            className="text-base cursor-pointer"
            onClick={() => router.push("/")}
          >
            Back
          </p>
        </div>

        {/* Main Image */}
        <div className="px-5 md:px-10">
          {property && property.images && property.images.length > 0 && (
            <Image
              src={property?.images[0]}
              alt="room images"
              width={1200}
              height={1300}
              className="h-full rounded-md hover:shadow-lg cursor-pointer w-full object-cover"
            />
          )}
        </div>

        <hr className="mt-10" />

        {/* Navigation Buttons */}
        <div className="flex flex-wrap px-5 md:px-10 gap-3 md:gap-5">
          {viewComponentButtons.map((btn, index) => (
            <Button
              key={index}
              className={`${
                btn.index === buttonIndex
                  ? "bg-blue-400 text-white hover:bg-blue-500"
                  : "bg-white hover:bg-gray-50 text-black"
              } mt-5 md:mt-10 px-4 py-3 md:px-20 md:py-5 text-sm md:text-base border border-gray-300 shadow-md transition-all duration-200 ease-in-out flex-1 min-w-[150px] text-center`}
              onClick={() => setButtonIndex(btn.index)}
            >
              {btn.label}
            </Button>
          ))}
        </div>

        {/* Content Sections */}
        {buttonIndex === 1 && property && (
          <div className="flex flex-row gap-5 px-5">
            <div className="py-5 border w-full mt-10 px-5 md:px-10 rounded-md border-gray-300">
              <Overview basic={property.basic} />
              <Description description={property.basic.description} />
              <Features features={property.features} />
              <Location location={property.location} />
              <div className="mb-16">
                <h1 className="font-bold text-xl md:text-3xl mb-3 font-sans">
                  Landlord Contact Details
                </h1>
                <hr />
                <div className="flex flex-col md:flex-row justify-between gap-2 mt-5">
                  <p className="text-gray-500 text-sm md:text-base">
                    Name: {property.contact.username}
                  </p>
                  <p className="text-gray-500 text-sm md:text-base">
                    Email: {property.contact.email}
                  </p>
                  <p className="text-gray-500 text-sm md:text-base">
                    Phone: {property.contact.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Sections (apply similar responsive patterns) */}
        {property && buttonIndex === 2 && <History review={property.reviews} />}
        {property && buttonIndex === 3 && (
          <ContactLandlord
            landlordEmail={property?.contact.email}
            landlordName={property.contact.username}
          />
        )}
        {buttonIndex === 4 && (
          <PropertyLocation
            location={property?.pinnedLocation.locationName || ""}
            longitude={property?.pinnedLocation.longitude || 0}
            latitude={property?.pinnedLocation.latitude || 0}
          />
        )}
        {buttonIndex === 5 && (
          <PropertyImages propertyImage={property?.images} />
        )}
        {buttonIndex === 6 && (
          <div className="mt-5 px-10 text-3xl font-bold">
            You need to login to apply for a room
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
