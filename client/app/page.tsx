"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Room from "@/assets/Room.jpg";
import FeaturedRoomsMain from "@/components/FeaturedRoomsMain";
import { GetToken } from "@/constants/GetToken";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import CategoriesBox from "@/components/User/CategoriesBox";
import data from "@/constants/Datas";
import HomeProperties from "@/components/HomeProperties";
interface TokenDecode {
  exp: number;
  iat: number;
  id: string;
  type: string;
}

const Page = () => {
  const getToken = GetToken();
  const [userType, setUsertype] = useState<string>("");
  const router = useRouter();
  const validateToken = (token: string) => {
    try {
      const decoded: TokenDecode = jwtDecode(token);
      setUsertype(decoded.type);
      return decoded;
    } catch (err) {
      console.error("Invalid token:", err);
      return null;
    }
  };
  // console.log(userType);

  useEffect(() => {
    if (getToken) {
      validateToken(getToken);
    }
  }, [getToken]);

  useEffect(() => {
    if (userType === "Tenants") {
      router.push("/user/home");
    } else if (userType === "landlord") {
      router.push("/landlord/Home");
    } else {
      return;
    }
  }, [userType, router]);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center gap-44 items-center py-10 mb-20">
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
      <FeaturedRoomsMain />
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
      <HomeProperties />
      <Footer />
    </div>
  );
};

export default Page;
