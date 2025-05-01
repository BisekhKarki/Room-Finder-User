"use client";
import { base_url } from "@/constants/BaseUrl";
import { GetToken } from "@/constants/GetToken";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { FaBookmark } from "react-icons/fa";

interface ContactData {
  email: string;
  phone: string;
  username: string;
}

interface BasicData {
  description: string;
  name: string;
  price: string;
  type: string;
}

interface FeaturesData {
  Kitchen: string;
  balcony: string;
  category: string;
  direction: string;
  floor: string;
  parking: string;
  waterfacility: string;
}

interface LocationData {
  Province: string;
  city: string;
  landmark: string;
  region: string;
  street: string;
  zip: string;
}

interface FeaturedRoom {
  basic: BasicData;
  features: FeaturesData;
  images: string[];
  isVerified: boolean;
  landlordId: string;
  location: LocationData;
  contact: ContactData;
  payment: boolean;
  roomId?: string;
  __v: number;
  _id: string;
}

const PropertiesSection = () => {
  const [properties, setProperties] = useState<FeaturedRoom[]>([]);
  const [originalProperties, setOriginalProperties] = useState<FeaturedRoom[]>(
    []
  );
  const [getToken, setGetToken] = useState<string>("");
  const token = GetToken();
  const router = useRouter();
  const [location, setLocation] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [watchlistsRoom, setWatchlistsRoom] = useState<FeaturedRoom[]>([]);

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
      fetchWatchlists();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getToken]);

  const filterRooms = () => {
    if (
      !location ||
      propertyType === "Property Type" ||
      price === "Price Range"
    ) {
      setProperties(originalProperties);
      toast.error("Please enter all fields to search");
      return;
    }

    let filteredRooms = [...originalProperties];

    if (price === "More than 50k") {
      filteredRooms = filteredRooms.filter(
        (room) =>
          parseInt(room.basic.price) > 50000 &&
          room.basic.type.toLowerCase() === propertyType.toLowerCase() &&
          room.location.city.toLowerCase() === location.toLowerCase()
      );
    } else {
      const [minStr, maxStr] = price.split("-");
      const min = parseInt(minStr) * 1000;
      const max = maxStr.includes("K")
        ? parseInt(maxStr.split("K")[0]) * 1000
        : parseInt(maxStr) * 1000;

      filteredRooms = filteredRooms.filter((room) => {
        const priceNum = parseInt(room.basic.price);
        return (
          priceNum >= min &&
          priceNum <= max &&
          room.basic.type.toLowerCase() === propertyType.toLowerCase() &&
          room.location.city.toLowerCase() === location.toLowerCase()
        );
      });
    }

    if (filteredRooms.length > 0) {
      setProperties(filteredRooms);
    } else {
      toast.success("No rooms found");
      setProperties(originalProperties);
    }
  };

  const saveToWatchLists = async (prop: FeaturedRoom) => {
    try {
      const response = await fetch(`${base_url}/watchlists/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
        body: JSON.stringify({
          roomId: prop._id,
          landlordId: prop.landlordId,
          basic: prop.basic,
          features: prop.features,
          images: prop.images,
          isVerified: prop.isVerified,
          location: prop.location,
          contact: prop.contact,
          payment: prop.payment,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message);
        setWatchlistsRoom((prev) => [...prev, data.watchlists]);
      } else {
        toast.error(data.message);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  const fetchWatchlists = async () => {
    try {
      const response = await fetch(`${base_url}/watchlists/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setWatchlistsRoom(data.message);
      }
    } catch (error) {
      console.error("Error fetching watchlists:", error);
    }
  };

  const removeFromWatchLists = async (id: string) => {
    try {
      const response = await fetch(`${base_url}/watchlists/remove/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        setWatchlistsRoom((prev) => prev.filter((m) => m._id !== id));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error: unknown) {
      console.error(String(error));
    }
  };

  return (
    <>
      <div className="mt-6 md:mt-10 px-4">
        {/* Filter Section */}
        <div className="flex justify-center">
          <div className="w-full max-w-6xl border border-gray-300 rounded-md py-4 md:py-6 shadow-md px-4 sm:px-6">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center">
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full md:flex-1 text-sm md:text-base"
                placeholder="Search by location"
              />

              <select
                aria-label="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full md:w-48 p-2 border rounded-md text-sm md:text-base"
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
                aria-label="type"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full md:w-48 p-2 border rounded-md text-sm md:text-base"
              >
                <option>Property Type</option>
                <option>Room</option>
                <option>Shop</option>
                <option>Office</option>
                <option>Apartment</option>
              </select>

              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <Button
                  className="w-full md:w-32 text-sm md:text-base bg-blue-500 hover:bg-blue-600 py-2 md:py-3"
                  onClick={filterRooms}
                >
                  Search
                </Button>
                <Button
                  className="w-full md:w-32 text-sm md:text-base bg-red-400 hover:bg-red-500 py-2 md:py-3"
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

        {/* Properties Grid */}
        <div className="mt-6 md:mt-10 py-6 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 sm:px-8 lg:px-20 justify-center gap-8 md:gap-12 lg:gap-24 mt-6 md:mt-10">
            {properties && properties.length > 0 ? (
              properties.map((property) => (
                <div
                  key={property._id}
                  className="cursor-pointer hover:-translate-y-2 md:hover:-translate-y-4 transition-all ease-out duration-150 hover:shadow-xl"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-48 md:h-56 lg:h-64">
                    <Image
                      src={property.images[0]}
                      alt={property.basic.name}
                      fill
                      className="rounded-t-md object-cover transition-all duration-150 ease-in-out hover:shadow-xl"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Bookmark Icon */}
                    <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3">
                      {watchlistsRoom.map((watchlistItem) => {
                        if (watchlistItem.roomId === property._id) {
                          return (
                            <FaBookmark
                              key={watchlistItem._id}
                              className="text-blue-500 text-xl hover:text-blue-600 transition-colors"
                              onClick={() =>
                                removeFromWatchLists(watchlistItem._id)
                              }
                            />
                          );
                        }
                        return null;
                      })}
                      {!watchlistsRoom.some(
                        (w) => w.roomId === property._id
                      ) && (
                        <FaBookmark
                          className="text-white text-xl hover:text-gray-200 transition-colors"
                          onClick={() => saveToWatchLists(property)}
                        />
                      )}
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="border px-4 py-3 md:px-6 md:py-4 lg:px-7 lg:py-5 rounded-b-md bg-white">
                    <h3 className="mb-1 text-base md:text-lg font-medium text-gray-900">
                      {property.basic.name}
                    </h3>

                    <div className="flex flex-col md:flex-row md:justify-between gap-2 text-sm md:text-base">
                      <p className="text-gray-900">Rs.{property.basic.price}</p>
                      <p className="text-gray-900">{property.basic.type}</p>
                    </div>

                    <div className="flex flex-col md:flex-row md:justify-between gap-2 mt-1 text-sm md:text-base">
                      <p className="text-gray-900">
                        <span className="hidden md:inline">Province:</span>{" "}
                        {property.location.Province}
                      </p>
                      <p className="text-gray-900">
                        <span className="hidden md:inline">City:</span>{" "}
                        {property.location.city}
                      </p>
                    </div>

                    <Button
                      className="w-full mt-3 md:mt-4 lg:mt-5 text-sm md:text-base bg-blue-500 hover:bg-blue-600"
                      onClick={() =>
                        router.push(`/user/properties/${property._id}`)
                      }
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500 text-lg md:text-xl">
                No properties found
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertiesSection;
