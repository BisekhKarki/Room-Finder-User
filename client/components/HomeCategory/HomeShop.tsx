"use client";

import React, { useEffect, useState } from "react";
import { FeaturedRoom } from "../User/FeaturedRooms";
import { base_url } from "@/constants/BaseUrl";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HomeShop = () => {
  const [shop, setShop] = useState<Array<FeaturedRoom> | []>([]);
  const router = useRouter();

  const fetchRooms = async () => {
    try {
      const type = "shop";
      const response = await fetch(`${base_url}/categories/home/${type}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        setShop(data.message);
      }
    } catch (error: unknown) {
      console.log(String(error));
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="mb-60">
      {/* Responsive grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 sm:px-10 lg:px-20 justify-center gap-8 md:gap-16 lg:gap-24 mt-10">
        {shop && shop.length > 0 ? (
          shop.map((property, index) => (
            <div
              key={index}
              className="cursor-pointer hover:-translate-y-2 md:hover:-translate-y-4 transition-all ease-out duration-150 hover:shadow-xl"
            >
              {/* Image container with responsive sizing */}
              <div className="relative w-full h-48 md:h-64 lg:h-80">
                <Image
                  src={property.images[0]}
                  alt="images"
                  fill
                  className="rounded-t-md object-cover transition-all duration-150 ease-in-out hover:shadow-xl"
                />
              </div>

              {/* Content container with responsive padding and text sizing */}
              <div className="border px-4 py-3 md:px-7 md:py-5 rounded-b-md">
                <h3 className="mb-1 text-sm md:text-base font-medium text-gray-900">
                  {property.basic.name}
                </h3>

                {/* Responsive flex container for price/type */}
                <div className="flex flex-col md:flex-row md:gap-10">
                  <p className="text-sm text-gray-900">
                    Rs.{property.basic.price}
                  </p>
                  <p className="text-sm text-gray-900">{property.basic.type}</p>
                </div>

                {/* Responsive flex container for location */}
                <div className="flex flex-col md:flex-row md:gap-10 mt-1">
                  <p className="text-sm text-gray-900">
                    {property.location.province}
                  </p>
                  <p className="text-sm text-gray-900">
                    {property.location.city}
                  </p>
                </div>

                {/* Responsive button */}
                <Button
                  className="w-full mt-3 md:mt-5 text-sm md:text-base bg-blue-500 hover:bg-blue-600 py-2 md:py-4"
                  onClick={() => router.push(`/categories/${property._id}`)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-lg md:text-2xl font-bold px-4 py-5 md:px-10 md:py-10">
            <p>No room available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeShop;
