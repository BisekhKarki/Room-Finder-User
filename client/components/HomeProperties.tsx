"use client";

import React, { useEffect, useState } from "react";
import { FeaturedRoom } from "./User/FeaturedRooms";
import { base_url } from "@/constants/BaseUrl";
import { Button } from "./ui/button";
import Image from "next/image";
import { FaAngleRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

const HomeProperties = () => {
  const [properties, setProperties] = useState<Array<FeaturedRoom> | []>([]);
  const router = useRouter();
  const location = window.location.href.split("3000")[1];

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${base_url}/rooms`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setProperties(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="mb-10 px-4 md:px-0">
      <div className="mt-10">
        <div className="flex flex-col md:flex-row items-center justify-between md:px-8 lg:px-24 mb-8">
          <h1 className="mb-4 md:mb-0 text-2xl md:text-3xl lg:text-4xl font-bold text-center md:text-left">
            Properties
          </h1>
          <div className="text-blue-500 flex items-center gap-1">
            <p className="underline cursor-pointer">View more </p>
            <FaAngleRight className="cursor-pointer" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 xl:gap-24 px-4 md:px-8 lg:px-20">
          {properties &&
            properties.length > 0 &&
            properties.map((property, index) => (
              <div
                key={index}
                className="cursor-pointer hover:-translate-y-2 md:hover:-translate-y-4 transition-all ease-out duration-150 hover:shadow-xl"
              >
                <div className="relative h-48 md:h-56 overflow-hidden rounded-t-md">
                  <Image
                    src={property.images[0]}
                    alt="images"
                    fill
                    className="object-cover hover:scale-105 transition-all duration-150 ease-in-out"
                  />
                </div>
                <div className="border px-4 py-3 md:px-6 md:py-4 lg:px-7 lg:py-5 rounded-b-md">
                  <h3 className="mb-1 text-gray-600 text-lg md:text-xl">
                    Name: {property.basic.name}
                  </h3>
                  <div className="flex flex-col md:flex-row md:gap-10">
                    <p className="text-gray-600">Rs.{property.basic.price}</p>
                    <p className="text-gray-600">{property.basic.type}</p>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-10 mt-1">
                    <p className="text-gray-600">
                      Province: {property.location.province}
                    </p>
                    <p className="text-gray-600">
                      City: {property.location.city}
                    </p>
                  </div>
                  <Button
                    className="w-full mt-3 md:mt-5 bg-blue-500 hover:bg-blue-600 text-sm md:text-base"
                    onClick={() => {
                      if (location === "/properties") {
                        router.push(`properties/${property._id}`);
                      } else if (location === "/") {
                        router.push(`singleroom/${property._id}`);
                      }
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeProperties;
