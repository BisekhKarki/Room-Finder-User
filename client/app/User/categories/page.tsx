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
      <div className="flex justify-center py-10">
        <div className="flex gap-5">
          {filterButtons.map((b, i) => (
            <Button
              className={`${
                b.index === index
                  ? "bg-blue-400 text-white border  px-10  hover:bg-blue-500"
                  : "bg-white text-black border border-gray-200 px-10  hover:bg-gray-50"
              } `}
              key={i}
              onClick={() => setIndex(b.index)}
            >
              {b.value}
            </Button>
          ))}
        </div>
      </div>
      {index === 1 && <Rooms />}
      {index === 2 && <Shop />}
      {index === 3 && <Apartment />}
      {index === 4 && <Office />}
    </div>
  );
};

export default Page;
