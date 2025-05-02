"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import HomeRoom from "@/components/HomeCategory/HomeRooms";
import HomeShop from "@/components/HomeCategory/HomeShop";
import HomeApartment from "@/components/HomeCategory/HomeApartment";
import HomeOffice from "@/components/HomeCategory/HomeOffice";

const filterButtons = [
  {
    index: 1,
    value: "Room",
  },
  {
    index: 2,
    value: "Shop",
  },
  {
    index: 3,
    value: "Apartment",
  },
  {
    index: 4,
    value: "Office",
  },
];

const Page = () => {
  const [index, setIndex] = useState<number>(1);
  return (
    <div>
      <Navbar />
      <div>
        <div className="flex justify-center py-6 md:py-10 px-4">
          <div className="flex flex-wrap justify-center gap-3 md:gap-5 w-full max-w-4xl">
            {filterButtons.map((b, i) => (
              <Button
                className={`text-sm sm:text-base px-4 sm:px-6 md:px-8 lg:px-10 min-w-[120px] md:min-w-[150px] transition-all ${
                  b.index === index
                    ? "bg-blue-400 text-white hover:bg-blue-500"
                    : "bg-white text-black border-gray-200 hover:bg-gray-50"
                } border shadow-sm hover:shadow-md`}
                key={i}
                onClick={() => setIndex(b.index)}
              >
                {b.value}
              </Button>
            ))}
          </div>
        </div>

        {/* Content sections remain the same */}
        {index === 1 && <HomeRoom />}
        {index === 2 && <HomeShop />}
        {index === 3 && <HomeApartment />}
        {index === 4 && <HomeOffice />}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
