"use client";

"use client";
import { base_url } from "@/constants/BaseUrl";
import { GetToken } from "@/constants/GetToken";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaBookmark } from "react-icons/fa";

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

interface FeaturedRoom {
  basic: BasicData;
  features: FeaturesData;
  images: string[];
  isVerified: boolean;
  landlordId: string;
  location: LocationData;
  contact: ContactData;
  payment: boolean;
  roomId?: string;
  __v: number;
  _id: string;
}

const Page = () => {
  const [getToken, setGetToken] = useState<string>("");
  const token = GetToken();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      setGetToken(token);
    }
  }, [token]);

  const [watchlistsRoom, setWatchlistsRoom] = useState<FeaturedRoom[]>([]);

  // console.log(watchlistsRoom);

  const removeFromWatchLists = async (id: string) => {
    try {
      const response = await fetch(`${base_url}/watchlists/remove/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        setWatchlistsRoom((prev) => prev.filter((m) => m._id !== id));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error: unknown) {
      console.log(String(error));
    }
  };

  const fetchIng = async () => {
    const response = await fetch(`${base_url}/tenants/rooms/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      setWatchlistsRoom(data.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchIng();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <div className="mt-6 md:mt-10 py-6 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 sm:px-8 lg:px-20 justify-center gap-8 md:gap-12 lg:gap-24 mt-6 md:mt-10">
          {watchlistsRoom && watchlistsRoom.length > 0 ? (
            watchlistsRoom.map((property, index) => (
              <div
                key={index}
                className="cursor-pointer hover:-translate-y-2 md:hover:-translate-y-4 transition-all ease-out duration-150 hover:shadow-xl"
              >
                {/* Image Container */}
                <div className="relative w-full h-48 md:h-56 lg:h-64">
                  <Image
                    src={property.images[0]}
                    alt="property image"
                    fill
                    className="rounded-t-md object-cover transition-all duration-150 ease-in-out hover:shadow-xl"
                  />
                  {/* Bookmark Icon */}
                  <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3">
                    {watchlistsRoom.map((w, idx) => (
                      <FaBookmark
                        key={idx}
                        className="text-blue-300 text-xl hover:text-blue-400 transition-colors"
                        onClick={() => removeFromWatchLists(w._id)}
                      />
                    ))}
                  </div>
                </div>

                {/* Content Container */}
                <div className="border px-4 py-3 md:px-6 md:py-4 lg:px-7 lg:py-5 rounded-b-md">
                  <h3 className="mb-1 text-base md:text-lg font-medium text-gray-900">
                    {property.basic.name}
                  </h3>

                  <div className="flex flex-col md:flex-row md:justify-between gap-2 text-sm md:text-base">
                    <p className="text-gray-900">Rs.{property.basic.price}</p>
                    <p className="text-gray-900">{property.basic.type}</p>
                  </div>

                  <div className="flex flex-col md:flex-row md:justify-between gap-2 mt-1 text-sm md:text-base">
                    <p className="text-gray-900">
                      <span className="hidden md:inline">Province:</span>{" "}
                      {property.location.Province}
                    </p>
                    <p className="text-gray-900">
                      <span className="hidden md:inline">City:</span>{" "}
                      {property.location.city}
                    </p>
                  </div>

                  <Button
                    className="w-full mt-3 md:mt-4 lg:mt-5 text-sm md:text-base bg-blue-500 hover:bg-blue-600"
                    onClick={() => router.push(`/user/history/${property._id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500 text-lg md:text-xl">
              No rooms rented till now
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
