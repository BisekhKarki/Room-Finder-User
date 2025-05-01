"use client";

import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/store/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoLocation } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
// import { MdOutlineNavigateNext } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader";
// import { GrFormPrevious } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { GetToken } from "@/constants/GetToken";

import { checkToken } from "@/store/slice";
import { base_url } from "@/constants/BaseUrl";

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

interface PendingRoom {
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
  const [pending, setPending] = useState<Array<PendingRoom> | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userDetail, setUserDetails] = useState<string>("");
  const [images, setImages] = useState<Array<string>>([]);
  const router = useRouter();

  const { userLandlordId } = useSelector((state: RootState) => state.slice);
  const token = GetToken();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (token) {
      dispatch(checkToken({ token }));
    } else if (!token) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (userLandlordId && userLandlordId != "") {
      setUserDetails(userLandlordId);
      console.log(images);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLandlordId]);

  const getMyPendingRooms = async () => {
    setLoading(true);
    if (!token) return;

    try {
      const response = await fetch(`${base_url}/posted/allRooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ landlordId: userDetail }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setPending(data.message);
        setImages(data.message.images);
        setLoading(false);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userLandlordId && userLandlordId != "") {
      getMyPendingRooms();
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetail]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <ClipLoader
            color={"blue"}
            loading={loading}
            size={120}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : pending && pending.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-4 px-2 sm:px-4 md:px-6 py-3 mb-10 md:mb-16 mt-3 md:mt-4">
          {pending.map((pend, index) => (
            <div
              key={index}
              className="w-full mx-auto shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-150 ease-in-out overflow-hidden"
            >
              <div className="min-h-[260px] md:min-h-[220px] flex flex-col">
                <div className="relative aspect-[3/2]">
                  <Image
                    src={pend.images[0]}
                    alt="Property image"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 28vw"
                  />
                  <div className="absolute top-0 w-full flex justify-between">
                    <span className="bg-red-500 text-white px-1.5 py-0.5 text-[0.65rem] md:text-xs font-medium rounded-br">
                      {pend.payment ? "Payment Done" : "Payment Left"}
                    </span>
                    <span className="bg-yellow-300 text-gray-700 px-1.5 py-0.5 text-[0.65rem] md:text-xs font-medium rounded-bl">
                      {pend.isVerified ? "Verified" : "Unverified"}
                    </span>
                  </div>
                </div>

                <div className="p-2 md:p-3 flex-1 flex flex-col">
                  <p className="text-center bg-blue-100 text-blue-800 text-xs md:text-sm py-0.5 rounded-sm mb-1">
                    {pend.basic.type}
                  </p>

                  <h2 className="text-sm md:text-base font-medium mb-1 line-clamp-1">
                    {pend.basic.name}
                  </h2>

                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs md:text-sm font-medium text-gray-800">
                      Rs: {pend.basic.price}
                    </p>
                    <span className="text-[0.65rem] md:text-xs text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
                      {pend.features.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[0.65rem] md:text-xs text-gray-600 mt-auto">
                    <IoLocation className="text-red-600 shrink-0 text-xs" />
                    <p className="line-clamp-1">
                      {pend.location.city}, {pend.location.street}
                    </p>
                  </div>

                  <Button
                    className="w-full mt-1.5 bg-blue-600 hover:bg-blue-700 text-xs md:text-sm py-1"
                    onClick={() => router.push(`/landlord/MyRooms/${pend._id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-[80vh] flex justify-center items-center">
          <p className="text-base md:text-lg font-medium text-gray-600 text-center px-4">
            No Pending Rooms Available
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
