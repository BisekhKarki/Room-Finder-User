"use client";

import Apartment from "@/components/Categories/Apartment";
import Office from "@/components/Categories/Office";
import Rooms from "@/components/Categories/Rooms";
import Shop from "@/components/Categories/Shop";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

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
      {index === 1 && <Rooms />}
      {index === 2 && <Shop />}
      {index === 3 && <Apartment />}
      {index === 4 && <Office />}
    </div>
  );
};

export default Page;
