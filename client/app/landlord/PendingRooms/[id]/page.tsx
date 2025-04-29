"use client";
import Khalti from "@/components/payment/Khalti";

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
import { GetToken } from "@/constants/GetToken";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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

const Page = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [pending, setPending] = useState<PendingRoom | null>(null);
  const [landlordId, setLandlordId] = useState<string>("");
  const router = useRouter();

  const { userLandlordId } = useSelector((state: RootState) => state.slice);
  const token = GetToken();

  useEffect(() => {
    if (userLandlordId) {
      setLandlordId(userLandlordId);
    }
  }, [userLandlordId]);

  const getMyPendingRooms = async () => {
    setLoading(true);
    console.log(landlordId);
    try {
      const response = await fetch(
        `http://localhost:4000/api/rooms/myRooms/pending/single/get/${id}`,
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
      console.log(data);
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
    <div className="py-4 md:py-10 px-4 md:px-10">
      {/* Back Button */}
      <div className="text-xl md:text-2xl mb-5 flex items-center gap-2">
        <IoIosArrowRoundBack
          className="text-gray-800 cursor-pointer text-3xl md:text-4xl"
          onClick={() => router.push("/landlord/PendingRooms")}
        />
        <p
          className="text-sm md:text-base cursor-pointer hover:underline"
          onClick={() => router.push("/landlord/PendingRooms")}
        >
          Back to Pending Rooms
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <ClipLoader
            color={"blue"}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        pending &&
        Object.keys(pending).length > 0 && (
          <>
            {/* Image Carousel */}
            <div className="w-full mb-6 md:mb-10 rounded-xl overflow-hidden">
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
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-5 md:gap-8">
              {/* Left Section */}
              <div className="w-full md:w-[75%] border md:mt-10 p-4 md:p-6 rounded-lg border-gray-200">
                <Overview basic={pending.basic} />
                <Description description={pending.basic.description} />
                <Features features={pending.features} />
                <Location location={pending.location} />
              </div>

              {/* Right Sidebar */}
              <div className="w-full md:w-[25%] border md:mt-10 rounded-lg border-gray-200">
                <div className="p-4 md:p-6 space-y-6">
                  <ContactDetails contact={pending.contact} />
                  <AdditionalDetails
                    payment={pending.payment}
                    verified={pending.isVerified}
                  />

                  {/* Payment Section */}
                  <div className="mt-8">
                    <h2 className="font-bold text-xl md:text-2xl mb-3">
                      Payment Methods
                    </h2>
                    <hr className="mb-4" />
                    <div className="mt-4">
                      <Khalti
                        name={pending.contact.username}
                        id={landlordId}
                        amount="10000"
                        roomId={pending._id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Page;
