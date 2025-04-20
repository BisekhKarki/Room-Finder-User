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
    <div className="py-10 px-10">
      <div className="text-2xl mb-5 flex items-center gap-1">
        <IoIosArrowRoundBack
          className=" text-gray-800 cursor-pointer"
          onClick={() => router.push("/landlord/PendingRooms")}
        />
        <p
          className="text-base cursor-pointer"
          onClick={() => router.push("/landlord/MyRooms")}
        >
          Back
        </p>
      </div>
      <div>
        <div className="">
          {loading ? (
            <div>
              <ClipLoader
                color={"blue"}
                loading={loading}
                // cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            pending &&
            Object.keys(pending).length > 0 && (
              <>
                <div className="flex flex-row gap-2 w-full">
                  {pending.images.map((img: string, index: number) => (
                    <div className="w-full" key={index}>
                      <Image
                        src={img}
                        alt="rooms"
                        className=""
                        width={1000}
                        height={500}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex  gap-5">
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
                  {buttonIndex === 1 && (
                    <div className="flex flex-row gap-5">
                      <div className="py-5 border w-3/4 mt-10 px-10 rounded-md  border-gray-300">
                        <Overview basic={pending.basic} />
                        <Description description={pending.basic.description} />
                        <Features features={pending.features} />
                        <Location location={pending.location} />
                      </div>
                      <div className="w-1/4 border mt-10 rounded-md border-gray-200">
                        <div className="px-5 py-5">
                          <ContactDetails contact={pending.contact} />
                          {pending.payment ? (
                            ""
                          ) : (
                            <AdditionalDetails
                              payment={pending.payment}
                              verified={pending.isVerified}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {id && buttonIndex === 2 && (
                    <Applications
                      roomId={id as string}
                      landlordId={landlordId as string}
                    />
                  )}
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
