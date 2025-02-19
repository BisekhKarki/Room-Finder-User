"use client";

import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoLocation } from "react-icons/io5";
import { useSelector } from "react-redux";

import ClipLoader from "react-spinners/ClipLoader";

const Page = () => {
  const [pending, setPending] = useState<[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userDetail, setUserDetails] = useState<string>("");
  const [images, setImages] = useState<Array<string>>([]);

  const { userLandlordId } = useSelector((state: RootState) => state.slice);

  useEffect(() => {
    if (userLandlordId && userLandlordId != "") {
      setUserDetails(userLandlordId);
    }
  }, [userLandlordId]);

  const getMyPendingRooms = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:4000/api/rooms/myRooms/pending",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
    } catch (error: any) {
      toast.error("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userLandlordId && userLandlordId != "") {
      getMyPendingRooms();
    }

    return () => {};
  }, [userDetail]);

  console.log(pending);

  return (
    <div>
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
      ) : pending && Object.keys(pending).length > 0 ? (
        <div className="flex gap-5 px-10 py-5 mb-40 align-middle mt-10">
          {pending.map((pend, index) => (
            <React.Fragment key={index}>
              <div className="shadow-xl rounded-lg  border hover:cursor-pointer border-gray-300 hover:-translate-y-5 transition-all duration-200 ease-in-out">
                <div className="space-y-2">
                  <Image
                    src={pend.images[0]}
                    alt="images"
                    width={300}
                    height={300}
                    className="w-96 rounded-t-md"
                  />
                  <div className="space-y-2 px-5 py-5">
                    <div>
                      <h1>{pend.basic.name}</h1>
                      <p>
                        {pend.payment ? "Payment Done" : "Payment is not done"}
                      </p>
                      <p>Verified: {pend.isVerified ? "Yes" : "No"}</p>
                    </div>
                    {/* {pend.images.map((img: string, index: number) => {
                return (
                  <div key={index} className="space-y-2">
                    <Image src={img} alt="images" width={300} height={300} />
                  </div>
                );
              })} */}

                    <p className="flex flex-row items-center gap-1">
                      <IoLocation /> {pend.location.city},{" "}
                      {pend.location.street}
                    </p>
                    <p>{pend.features.category}</p>
                    <div className="flex justify-center">
                      <Button className="w-full">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <p>No Rooms for pending</p>
      )}
    </div>
  );
};

export default Page;
