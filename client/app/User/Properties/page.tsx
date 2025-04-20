"use client";
import { base_url } from "@/constants/BaseUrl";
import { GetToken } from "@/constants/GetToken";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export interface ContactData {
  email: string;
  phone: string;
  username: string;
}

export interface BasicData {
  description: string;
  name: string;
  price: string;
  type: string;
}

export interface FeaturesData {
  Kitchen: string;
  balcony: string;
  category: string;
  direction: string;
  floor: string;
  parking: string;
  waterfacility: string;
}

export interface LocationData {
  Province: string;
  city: string;
  landmark: string;
  region: string;
  street: string;
  zip: string;
}

export interface FeaturedRoom {
  basic: BasicData;
  features: FeaturesData;
  images: string[];
  isVerified: boolean;
  landlordId: string;
  location: LocationData;
  contact: ContactData;
  payment: boolean;
  __v: number;
  _id: string;
}

const PropertiesSection = () => {
  const [properties, setProperties] = useState<Array<FeaturedRoom> | []>([]);
  const [originalProperties, setOriginalProperties] = useState<
    Array<FeaturedRoom> | []
  >([]);
  const [getToken, setGetToken] = useState<string>("");
  const token = GetToken();
  const router = useRouter();
  const [location, setLocation] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");

  useEffect(() => {
    if (token) {
      setGetToken(token);
    }
  }, [token]);

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${base_url}/tenants/rooms/all/rooms`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setProperties(data.message);
        setOriginalProperties(data.message);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  useEffect(() => {
    if (getToken) {
      fetchRooms();
    }
  }, [getToken]);

  const filterRooms = () => {
    if (
      !location ||
      propertyType === "  Property Type" ||
      price === "Price Range"
    ) {
      setProperties(originalProperties);
      toast.error("Please eneter all field to search");
      return;
    }

    if (price === "More than 50k") {
      const filteredRooms = properties.filter((room) => {
        const parsedNumber = parseInt(room.basic.price);
        return (
          parsedNumber > 50000 &&
          room.basic.type.toLowerCase() === propertyType.toLowerCase() &&
          room.location.city.toLowerCase() === location.toLowerCase()
        );
      });

      if (filteredRooms.length > 0) {
        setProperties(filteredRooms);
      } else if (filterRooms.length === 0) {
        toast.success("No rooms found");
        setProperties(originalProperties);
      }
      return;
    }
    const [minStr, maxStr] = price.split("-");
    const min = parseInt(minStr) * 1000;
    const max = parseInt(maxStr.split("K")[0]) * 1000;

    const filteredRooms = properties.filter((room) => {
      const parsedNumber = parseInt(room.basic.price);
      const matchesPrice = parsedNumber >= min && parsedNumber <= max;
      const matchesType =
        room.basic.type.toLowerCase() === propertyType.toLowerCase();
      const matchesLocation =
        room.location.city.toLowerCase() === location.toLowerCase();

      return matchesPrice && matchesType && matchesLocation;
    });

    console.log("Filtered rooms:", filteredRooms);

    if (filteredRooms.length > 0) {
      setProperties(filteredRooms);
    } else if (filterRooms.length === 0) {
      toast.success("No rooms found");
      setProperties(originalProperties);
    }
  };
  return (
    <>
      <div className="mt-10">
        <div className="flex justify-center cursor-pointer">
          <div className="flex items-center justify-center gap-20 border border-gray-300 rounded-md py-10 w-[1300px] shadow-md">
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-96 border border-gray-300"
              placeholder="Search by location"
            />
            <select
              value={price}
              aria-label="Select an option"
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 px-12 py-3 rounded-md cursor-pointer"
            >
              <option>Price Range</option>
              <option>5-10k</option>
              <option>10-20k</option>
              <option>20-30k</option>
              <option>30-40k</option>
              <option>40-50k</option>
              <option>More than 50k</option>
            </select>
            <select
              aria-label="Select an option"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="border border-gray-300 px-12 py-3 rounded-md cursor-pointer"
            >
              <option>Property Type</option>
              <option>Room</option>
              <option>Shop</option>
              <option>Office</option>
              <option>Apartment</option>
            </select>
            <div className="flex flex-col gap-2">
              <Button
                className="bg-blue-500 w-32 hover:bg-blue-600"
                onClick={() => {
                  filterRooms();
                }}
              >
                Search
              </Button>
              <Button
                className="bg-red-400 w-32 hover:bg-red-500"
                onClick={() => {
                  setProperties(originalProperties);
                  setLocation("");
                  setPrice("");
                  setPropertyType("");
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 py-10">
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
                      router.push(`/user/properties/${property._id}`)
                    }
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default PropertiesSection;
