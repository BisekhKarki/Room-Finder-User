"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import Room from "@/assets/Room.jpg";
import data from "@/constants/Datas";
import { GetToken } from "@/constants/GetToken";
import Image from "next/image";

// Dynamically import components that might use browser APIs
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const FeaturedRoomsMain = dynamic(
  () => import("@/components/FeaturedRoomsMain"),
  { ssr: false }
);
const CategoriesBox = dynamic(() => import("@/components/User/CategoriesBox"), {
  ssr: false,
});
const HomeProperties = dynamic(() => import("@/components/HomeProperties"), {
  ssr: false,
});

interface TokenDecode {
  exp: number;
  iat: number;
  id: string;
  type: string;
}

const Page = () => {
  const [userType, setUsertype] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const token = GetToken();
    if (token) {
      try {
        const decoded: TokenDecode = jwtDecode(token);
        setUsertype(decoded.type);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    if (userType === "Tenants") {
      router.push("/User/home");
    } else if (userType === "landlord") {
      router.push("/landlord/Home");
    }
  }, [userType, mounted, router]);

  if (!mounted) return null;

  return (
    <div className="px-4 sm:px-0">
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-24 py-10 mb-10 lg:mb-20">
        <div className="space-y-5 text-center lg:text-left max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome To Room Finder
          </h1>
          <p className="text-gray-500 leading-7 text-base md:text-lg">
            Explore, Buy, Sell & Research <br className="hidden md:block" />
            Find rooms, apartments, shops, office based on your{" "}
            <br className="hidden md:block" />
            interest in Nepal easily
          </p>
          <Button
            className="bg-blue-500 hover:bg-blue-600 mx-auto lg:mx-0"
            onClick={() => router.push("/properties")}
          >
            Explore Properties
          </Button>
        </div>
        <div className="w-full max-w-lg lg:max-w-2xl">
          <Image
            src={Room.src}
            alt="Room"
            width={500}
            height={500}
            className="rounded w-full h-auto"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>

      <hr className="mt-10" />
      <FeaturedRoomsMain />
      <hr className="mt-10" />
      <CategoriesBox />
      <hr className="mt-10" />

      {/* Data Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-20 py-10">
        {data.map((val, index) => (
          <div
            key={index}
            className="shadow-md p-6 md:px-8 md:py-6 border min-h-[384px] flex flex-col items-center justify-center hover:shadow-lg cursor-pointer transition-all"
          >
            <div className="w-full max-w-[200px] h-auto">
              <Image
                width={500}
                height={500}
                src={val.picture.src}
                alt={`${val.title}`}
                className="w-full h-auto"
              />
            </div>
            <h3 className="text-xl md:text-2xl mb-2 font-bold mt-3 text-center">
              {val.title}
            </h3>
            <p className="text-sm md:text-base w-full text-center text-gray-500 mt-4 px-2">
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
