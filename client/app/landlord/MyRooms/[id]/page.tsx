"use client";

import Description from "@/components/RoomView/Description";
import Overview from "@/components/RoomView/Overview";
import Features from "@/components/RoomView/Features";

import { RootState } from "@/store/store";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import Location from "@/components/RoomView/Location";
import Image from "next/image";
import ContactDetails from "@/components/RoomView/ContactDetails";
import AdditionalDetails from "@/components/RoomView/AdditionalDetails";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Button } from "@/components/ui/button";
import Applications from "@/components/RentApplications/Applications";
import { GetToken } from "@/constants/GetToken";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import EditRoom from "@/components/RoomPostSections/RoomEdit/EditRooms";

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
  province: string;
  city: string;
  landmark: string;
  region: string;
  street: string;
  zip: string;
}

export interface PendingRoom {
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

const viewComponentButtons = [
  { index: 1, label: "Info" },
  { index: 2, label: "Rent Applications" },
  { index: 3, label: "Edit Room" },
];

const Page = () => {
  const { id } = useParams();
  const [buttonIndex, setButtonIndex] = useState<number>(1);

  const [loading, setLoading] = useState<boolean>(false);
  const [pending, setPending] = useState<PendingRoom | null>(null);
  const [landlordId, setLandlordId] = useState<string>("");
  const router = useRouter();

  const { userLandlordId } = useSelector((state: RootState) => state.slice);

  useEffect(() => {
    if (userLandlordId) {
      setLandlordId(userLandlordId);
    }
  }, [userLandlordId]);

  const token = GetToken();

  const getMyPendingRooms = async () => {
    setLoading(true);

    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:4000/api/posted/SingleRoom/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ landlordId: landlordId }),
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        setPending(data.message);
        setLoading(false);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (landlordId && landlordId != "") {
      getMyPendingRooms();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [landlordId]);

  return (
    <div className="py-6 md:py-10 px-4 md:px-6 lg:px-10">
      {/* Back Button */}
      <div className="text-xl md:text-2xl mb-4 md:mb-5 flex items-center gap-2">
        <IoIosArrowRoundBack
          className="text-gray-800 cursor-pointer text-2xl md:text-3xl"
          onClick={() => router.push("/landlord/PendingRooms")}
        />
        <p
          className="text-sm md:text-base cursor-pointer hover:underline"
          onClick={() => router.push("/landlord/MyRooms")}
        >
          Back
        </p>
      </div>

      {/* Main Content */}
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <ClipLoader
              color={"blue"}
              loading={loading}
              size={120}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          pending &&
          Object.keys(pending).length > 0 && (
            <>
              {/* Image Gallery */}
              <Carousel
                showArrows={true}
                showStatus={false}
                showThumbs={false}
                infiniteLoop={true}
                className="carousel-container"
              >
                {pending.images.map((img: string, index: number) => (
                  <div key={index} className="relative aspect-video">
                    <Image
                      src={img}
                      alt={`Room image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 80vw"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </Carousel>
              {/* View Components */}
              <div className="mt-6 md:mt-8">
                {/* View Buttons */}
                <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                  {viewComponentButtons.map((btn, index) => (
                    <Button
                      key={index}
                      className={`text-sm md:text-base px-4 py-3 md:px-6 md:py-4 ${
                        btn.index === buttonIndex
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      } rounded-lg transition-all duration-200 shadow-sm`}
                      onClick={() => setButtonIndex(btn.index)}
                    >
                      {btn.label}
                    </Button>
                  ))}
                </div>

                {/* Content Sections */}
                {buttonIndex === 1 && (
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-4 md:mt-6">
                    {/* Main Details */}
                    <div className="w-full md:w-[70%] border rounded-lg p-4 md:p-6 bg-white">
                      <Overview basic={pending.basic} />
                      <Description description={pending.basic.description} />
                      <Features features={pending.features} />
                      <Location location={pending.location} />
                    </div>

                    {/* Sidebar */}
                    <div className="w-full md:w-[30%] border rounded-lg p-4 md:p-6 bg-white">
                      <ContactDetails contact={pending.contact} />
                      {!pending.payment && (
                        <AdditionalDetails
                          payment={pending.payment}
                          verified={pending.isVerified}
                        />
                      )}
                    </div>
                  </div>
                )}

                {id && buttonIndex === 2 && (
                  <div className="mt-4 md:mt-6">
                    <Applications
                      roomId={id as string}
                      landlordId={landlordId as string}
                    />
                  </div>
                )}
                {buttonIndex === 3 && (
                  <div className="mt-4 md:mt-6">
                    <EditRoom />
                  </div>
                )}
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Page;
