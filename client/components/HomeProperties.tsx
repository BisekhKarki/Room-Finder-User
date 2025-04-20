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
    <div className="mb-10">
      <div className="mt-10">
        <div className="flex items-center justify-between px-24">
          <h1 className="mb-5 text-4xl font-bold text-center">Properties</h1>
          <div className="text-blue-500 flex items-center gap-1">
            <p className="underline cursor-pointer">View more </p>
            <FaAngleRight className="cursor-pointer" />
          </div>
        </div>
        <div className="grid grid-cols-3 px-20 justify-center gap-24 mt-10">
          {properties &&
            properties.length > 0 &&
            properties.map((property, index) => (
              <div
                key={index}
                className="cursor-pointer hover:-translate-y-4 transition-all ease-out duration-150 hover:shadow-xl"
              >
                <Image
                  src={property.images[0]}
                  alt="images"
                  width={390}
                  height={400}
                  className="rounded-t-md hover:scale-105 transition-all duration-150 ease-in-out hover:shadow-xl hover:rounded-md"
                />
                <div className="border px-7 py-5 rounded-b-md">
                  <h3 className="mb-1 text-gray-600">
                    Name: {property.basic.name}
                  </h3>
                  <div className="flex gap-10">
                    <p className="text-gray-600">Rs.{property.basic.price}</p>
                    <p className="text-gray-600">{property.basic.type}</p>
                  </div>
                  <div className="flex gap-10 mt-1">
                    <p className="text-gray-600">
                      Province: {property.location.Province}
                    </p>
                    <p className="text-gray-600">
                      City: {property.location.city}
                    </p>
                  </div>
                  <Button
                    className="w-full mt-5 bg-blue-500 hover:bg-blue-600"
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
