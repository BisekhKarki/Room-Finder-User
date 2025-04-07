"use client";

import { checkToken } from "@/store/slice";
import { AppDispatch } from "@/store/store";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Room from "../../../assets/Room.jpg";
import FeaturedRooms from "@/components/User/FeaturedRooms";
import data from "../../../constants/Datas";
import SearchComponent from "@/components/SearchComponent";
import CategoriesBox from "@/components/User/CategoriesBox";
import PropertiesSection from "@/components/User/PropertiesSection";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (token) {
      dispatch(checkToken({ token }));
    }
  }, [dispatch]);

  return (
    <div className="py-10 px-2">
      <div className="flex justify-center gap-44 items-center">
        <div className="space-y-5">
          <h1 className="text-4xl font-bold">Welcome To Room Finder</h1>
          <p className="text-gray-500 leading-7">
            Explore, Buy, Sell & Research <br /> Find rooms, apartments, shops,
            office based on your <br /> interest in Nepal easily
          </p>
          <Button className="bg-blue-500 hover:bg-blue-600">
            Explore Properties
          </Button>
        </div>
        <Image src={Room} alt="Room" width={450} className="rounded" />
      </div>
      <hr className="mt-10" />
      <SearchComponent />
      <FeaturedRooms />
      <hr className="mt-10" />
      <CategoriesBox />
      <hr className="mt-10" />
      <div className="flex items-center px-20 justify-between py-10 ">
        {data.map((val, index) => (
          <div
            key={index}
            className="shadow-md px-10 py-5 border h-96 flex flex-col items-center justify-cente hover:shadow-lg cursor-pointer"
          >
            <Image src={val.picture} alt={`${val.title}`} />
            <h3 className="text-2xl mb-2 font-bold mt-3">{val.title}</h3>
            <p className="text-base w-80 text-start text-gray-500 mt-4">
              {val.description}
            </p>
          </div>
        ))}
      </div>
      <hr className="mt-10" />
      <PropertiesSection />
    </div>
  );
};

export default HomePage;
