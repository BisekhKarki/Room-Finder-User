"use client";

import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoLocation } from "react-icons/io5";
import { useSelector } from "react-redux";
// import { MdOutlineNavigateNext } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader";
// import { GrFormPrevious } from "react-icons/gr";
import { useRouter } from "next/navigation";
import {
  BasicData,
  ContactData,
  FeaturesData,
  LocationData,
} from "./[id]/page";
import { GetToken } from "@/constants/GetToken";
interface PendingRooms {
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
  const [pending, setPending] = useState<Array<PendingRooms> | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userDetail, setUserDetails] = useState<string>("");
  const [images, setImages] = useState<Array<string>>([]);
  const router = useRouter();

  const { userLandlordId } = useSelector((state: RootState) => state.slice);
  const token = GetToken();

  useEffect(() => {
    if (userLandlordId && userLandlordId != "") {
      setUserDetails(userLandlordId);
    }
  }, [userLandlordId]);

  const getMyPendingRooms = async () => {
    setLoading(true);

    try {
      if (!token) return;
      const response = await fetch(
        "http://localhost:4000/api/rooms/myRooms/pending",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ landlordId: userDetail }),
        }
      );
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
    console.log(images);

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
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : pending && pending.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 px-10 py-5 mb-40 mt-10">
          {pending.map((pend, index) => (
            <React.Fragment key={index}>
              <div className="w-full max-w-sm mx-auto shadow-xl rounded-lg border hover:cursor-pointer border-gray-300 hover:-translate-y-2 transition-all duration-200 ease-in-out">
                <div className="h-96">
                  <div className="relative">
                    <Image
                      src={pend.images[0]}
                      alt="images"
                      width={400}
                      height={300}
                      className="w-full h-52 object-cover rounded-t-md"
                    />
                    <p className="bg-red-500 text-white px-2 py-1 text-xs w-24 absolute shadow-md hover:bg-red-600 top-0 left-0 rounded-tl-md">
                      {pend.payment ? "Payment Done" : "Payment Left"}
                    </p>
                    <p className="bg-yellow-300 text-gray-500 px-2 py-1 text-xs w-24 absolute shadow-md hover:bg-yellow-400 top-0 right-0 rounded-tr-md">
                      {pend.isVerified ? "Verified" : "Unverified"}
                    </p>
                  </div>
                  <p className="text-center bg-blue-400 text-white">
                    {pend.basic.type}
                  </p>
                  <div className="px-5">
                    <h1 className="text-md font-semibold font-sans mt-2">
                      {pend.basic.name}
                    </h1>
                    <div className="flex justify-between">
                      <h2 className="text-base font-sans text-gray-600 py-1">
                        Rs: {pend.basic.price}
                      </h2>
                      <p className="font-sans text-gray-600">
                        {pend.features.category}
                      </p>
                    </div>
                    <p className="flex flex-row items-center text-sm gap-1">
                      <IoLocation className="text-red-700 text-xl" />
                      {pend.location.city}, {pend.location.street}
                    </p>
                    <div className="flex justify-center mt-3 mb-4">
                      <Button
                        className="w-full bg-blue-500 hover:bg-blue-600"
                        onClick={() =>
                          router.push(`/landlord/PendingRooms/${pend._id}`)
                        }
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="h-[80.5vh] flex justify-center items-center">
          <p className="text-3xl font-bold">No Rooms for pending</p>
        </div>
      )}
    </div>
  );
};

export default Page;
