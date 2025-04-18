"use client";

import React, { useEffect, useState } from "react";
import { FeaturedRoom } from "../User/FeaturedRooms";
import { GetToken } from "@/constants/GetToken";
import { tenant_base_url } from "@/constants/BaseUrl";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Shop = () => {
  const [shop, setShop] = useState<Array<FeaturedRoom> | []>([]);
  const router = useRouter();

  const [token, setToken] = useState<string>("");

  const getToken = GetToken();

  useEffect(() => {
    if (getToken) {
      setToken(getToken);
    }
  }, [getToken]);

  const fetchRooms = async () => {
    try {
      const type = "shop";
      const response = await fetch(`${tenant_base_url}/rooms/filter/${type}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    if (token) {
      fetchRooms();
    }
  }, [token]);

  return (
    <div className="mb-10">
      <div className="grid grid-cols-3 px-20 justify-center gap-24 mt-10">
        {shop &&
          shop.length > 0 &&
          shop.map((property, index) => (
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
                <h3 className="mb-1 text-gray-900">
                  Name: {property.basic.name}
                </h3>
                <div className="flex gap-10">
                  <p className="text-gray-900">Rs.{property.basic.price}</p>
                  <p className="text-gray-900">{property.basic.type}</p>
                </div>
                <div className="flex gap-10 mt-1">
                  <p className="text-gray-900">
                    Province: {property.location.Province}
                  </p>
                  <p className="text-gray-900">
                    City: {property.location.city}
                  </p>
                </div>
                <Button
                  className="w-full mt-5 bg-blue-500 hover:bg-blue-600"
                  onClick={() =>
                    router.push(`/user/categories/${property._id}`)
                  }
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Shop;
