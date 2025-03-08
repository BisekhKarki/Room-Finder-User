"use client";
import Khalti from "@/components/payment/Khalti";
import Stripe from "@/components/payment/Stripe";
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

const Page = () => {
  const { id } = useParams();

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
    } catch (error: any) {
      toast.error("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (landlordId && landlordId != "") {
      getMyPendingRooms();
    }
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
          onClick={() => router.push("/landlord/PendingRooms")}
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
                      <AdditionalDetails
                        payment={pending.payment}
                        verified={pending.isVerified}
                      />
                      <div className="mt-16">
                        <h1 className="font-bold text-3xl mb-3 font-sans">
                          Payment Methods
                        </h1>
                        <hr />
                        <div className="mt-5">
                          <Khalti
                            name={pending.contact.username}
                            id={landlordId}
                            amount="10000"
                            roomId={pending._id}
                          />
                          <Stripe
                            name={pending.contact.username}
                            id={landlordId}
                            amount="10000"
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
      </div>
    </div>
  );
};

export default Page;
