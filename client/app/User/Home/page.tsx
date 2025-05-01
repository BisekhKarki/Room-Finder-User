"use client";

import { checkToken } from "@/store/slice";
import { AppDispatch } from "@/store/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Room from "../../../assets/Room.jpg";
import FeaturedRooms from "@/components/User/FeaturedRooms";
import data from "../../../constants/Datas";

import CategoriesBox from "@/components/User/CategoriesBox";
import PropertiesSection from "@/components/User/PropertiesSection";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { base_url } from "@/constants/BaseUrl";
import { GetToken } from "@/constants/GetToken";

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
  province?: string;
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

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [watchlistsRoom, setWatchlistsRoom] = useState<FeaturedRoom[]>([]);
  const getToken = GetToken();
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
    if (getToken) {
      setToken(getToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) {
      fetchIng();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchIng = async () => {
    const response = await fetch(`${base_url}/watchlists/get`, {
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
  return (
    <div className="py-10 px-2 md:px-4">
      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 lg:gap-24 items-center px-4">
        <div className="space-y-5 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome To Room Finder
          </h1>
          <p className="text-gray-500 leading-7 text-sm md:text-base">
            Explore, Buy, Sell & Research <br /> Find rooms, apartments, shops,
            office based on your <br /> interest in Nepal easily
          </p>
          <div className="flex justify-center md:justify-start">
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-sm md:text-base"
              onClick={() => router.push("/user/properties")}
            >
              Explore Properties
            </Button>
          </div>
        </div>
        <Image
          src={Room}
          alt="Room"
          width={450}
          height={300}
          className="rounded w-full max-w-xs md:max-w-sm lg:max-w-md"
        />
      </div>
      <hr className="mt-10" />

      <FeaturedRooms
        watchlistsRoom={watchlistsRoom}
        setWatchlistsRoom={setWatchlistsRoom}
      />
      <hr className="mt-10" />
      <CategoriesBox />
      <hr className="mt-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 lg:px-20 gap-8 py-10">
        {data.map((val, index) => (
          <div
            key={index}
            className="shadow-md border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <div className="relative aspect-video w-full">
              <Image
                src={val.picture}
                alt={val.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            <div className="p-4 md:p-6 flex-1">
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">
                {val.title}
              </h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                {val.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <hr className="mt-10" />
      <PropertiesSection
        watchlistsRoom={watchlistsRoom}
        setWatchlistsRoom={setWatchlistsRoom}
      />
    </div>
  );
};

export default HomePage;
