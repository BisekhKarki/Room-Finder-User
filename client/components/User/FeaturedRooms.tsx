"use client";
import { base_url, tenant_base_url } from "@/constants/BaseUrl";
import { GetToken } from "@/constants/GetToken";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { FaAngleRight, FaBookmark } from "react-icons/fa";
import { useRouter } from "next/navigation";

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
  province?: string;
  city: string;
  landmark: string;
  region: string;
  street: string;
  zip: string;
}

interface PropertyPinnedLocation {
  locationName: string;
  latitude: number;
  longitude: number;
}

export interface FeaturedRoom {
  basic: BasicData;
  features: FeaturesData;
  images: string[];
  isVerified: boolean;
  landlordId: string;
  roomId?: string;
  location: LocationData;
  contact: ContactData;
  payment: boolean;
  __v: number;
  _id: string;
  show?: boolean;
  pinnedLocation: PropertyPinnedLocation;
}

interface Props {
  watchlistsRoom: Array<FeaturedRoom>;
  setWatchlistsRoom: (
    value: FeaturedRoom[] | ((prev: FeaturedRoom[]) => FeaturedRoom[])
  ) => void;
}

const FeaturedRooms = ({ watchlistsRoom, setWatchlistsRoom }: Props) => {
  const [featured, setFeatured] = useState<Array<FeaturedRoom>>([]);
  const [getToken, setGetToken] = useState<string>("");
  const token = GetToken();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      setGetToken(token);
    }
  }, [token]);

  const fetchFeaturedRooms = async () => {
    try {
      const response = await fetch(`${tenant_base_url}/rooms/featured`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setFeatured(data.message);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  useEffect(() => {
    if (getToken) {
      fetchFeaturedRooms();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getToken]);

  const saveToWatchLists = async (prop: FeaturedRoom) => {
    try {
      const response = await fetch(`${base_url}/watchlists/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
        body: JSON.stringify({
          roomId: prop._id,
          landlordId: prop.landlordId,
          basic: prop.basic,
          features: prop.features,
          images: prop.images,
          isVerified: prop.isVerified,
          location: prop.location,
          contact: prop.contact,
          payment: prop.payment,
          pinnedLocation: prop.pinnedLocation,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message);
        setWatchlistsRoom((prev) => [...prev, data.watchlists]);
      } else {
        toast.error(data.message);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

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
      toast.error(String(error));
    }
  };

  return (
    <div className="mt-10">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 lg:px-20">
        <h1 className="mb-5 text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          Properties
        </h1>
        <div
          className="text-blue-500 flex items-center gap-1 mt-4 md:mt-0 cursor-pointer"
          onClick={() => router.push("/User/Properties")}
        >
          <p className="underline text-sm md:text-base">View more</p>
          <FaAngleRight className="text-sm md:text-base" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-8 lg:px-20 gap-8 md:gap-12 lg:gap-24 mt-10">
        {featured &&
          featured.map((property, index) => {
            const isSaved = watchlistsRoom.some(
              (w) => w.roomId === property._id
            );
            const savedItem = watchlistsRoom.find(
              (w) => w.roomId === property._id
            );

            return (
              <div
                key={index}
                className="cursor-pointer hover:-translate-y-2 lg:hover:-translate-y-4 transition-all ease-out duration-150 hover:shadow-xl mx-auto w-full max-w-sm md:max-w-none"
              >
                <div className="relative aspect-video">
                  <Image
                    src={property.images[0]}
                    alt="property image"
                    fill
                    className="rounded-t-md object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {isSaved ? (
                    <FaBookmark
                      className="absolute bottom-2 right-2 text-blue-300 text-xl backdrop-blur-sm cursor-pointer"
                      onClick={() => removeFromWatchLists(savedItem?._id || "")}
                    />
                  ) : (
                    <FaBookmark
                      className="absolute bottom-2 right-2 text-white text-xl hover:text-blue-200 backdrop-blur-sm cursor-pointer"
                      onClick={() => {
                        console.log(property._id);
                        saveToWatchLists(property);
                      }}
                    />
                  )}
                </div>

                <div className="border px-4 py-3 md:px-6 md:py-5 rounded-b-md">
                  <h3 className="mb-1 text-gray-600 text-sm md:text-base line-clamp-1">
                    {property.basic.name}
                  </h3>
                  <div className="flex flex-col md:flex-row md:gap-10">
                    <p className="text-gray-600 text-sm md:text-base">
                      Rs.{property.basic.price}
                    </p>
                    <p className="text-gray-600 text-sm md:text-base line-clamp-1">
                      {property.basic.type}
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-10 mt-1">
                    <p className="text-gray-600 text-sm md:text-base line-clamp-1">
                      {property.location.province}
                    </p>
                    <p className="text-gray-600 text-sm md:text-base line-clamp-1">
                      {property.location.city}
                    </p>
                  </div>
                  <Button
                    className="w-full mt-3 md:mt-5 bg-blue-500 hover:bg-blue-600 text-sm md:text-base"
                    onClick={() =>
                      router.push(`/User/Properties/${property._id}`)
                    }
                  >
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FeaturedRooms;
