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

const Page = () => {
  const [pending, setPending] = useState<[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userDetail, setUserDetails] = useState<string>("");
  const [images, setImages] = useState<Array<string>>([]);
  const router = useRouter();

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
        <div className="flex flex-wrap gap-7 px-10 py-5 mb-40 align-middle mt-10">
          {pending.map((pend, index) => (
            <React.Fragment key={index}>
              <div className="shadow-xl rounded-lg  border hover:cursor-pointer border-gray-300 hover:-translate-y-5 transition-all duration-200 ease-in-out">
                <div className="">
                  <div className="relative">
                    <Image
                      src={pend.images[0]}
                      alt="images"
                      width={300}
                      height={300}
                      className="w-80 rounded-t-md"
                    />
                    <p className="bg-red-500 text-white px-2 py-1 text-xs w-24 absolute shadow-md hover:bg-red-600 top-0 left-0 rounded-tl-md">
                      {pend.payment ? "Payment Done" : "Payment Left"}
                    </p>
                    <p className="bg-yellow-300 text-gray-500 px-2 py-1 text-xs w-24 absolute shadow-md hover:bg-yellow-400 top-0 right-0 rounded-tr-md">
                      {pend.isVerified ? "Verified" : "Unverified"}
                    </p>
                    {/* <div className="absolute top-24 px-2 ">
                      <div className="flex gap-52">
                        <Button className=" bg-transparent text-black hover:bg-transparent border border-gray-700">
                          <GrFormPrevious />
                        </Button>
                        <Button className="text-black bg-transparent hover:bg-transparent border border-gray-700">
                          <MdOutlineNavigateNext />
                        </Button>
                      </div>
                    </div> */}
                  </div>
                  <p className="text-center bg-blue-400 text-white">
                    {pend.basic.type}
                  </p>

                  <div className="px-5">
                    <h1 className="text-xl font-semibold font-sans">
                      Name: {pend.basic.name}
                    </h1>

                    {/* {pend.images.map((img: string, index: number) => {
                return (
                  <div key={index} className="space-y-2">
                    <Image src={img} alt="images" width={300} height={300} />
                  </div>
                );
              })} */}
                    <div className="flex justify-between">
                      <h2 className=" text-base font-sans text-gray-600  py-1">
                        Rs: {pend.basic.price}
                      </h2>
                      <p className="font-sans text-gray-600">
                        {pend.features.category}
                      </p>
                    </div>
                    <p className="flex flex-row items-center text-sm  gap-1">
                      <IoLocation className="text-red-700 text-xl " />
                      {pend.location.city}, {pend.location.street}
                    </p>

                    <div className="flex justify-center m-2">
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
        <p>No Rooms for pending</p>
      )}
    </div>
  );
};

export default Page;
