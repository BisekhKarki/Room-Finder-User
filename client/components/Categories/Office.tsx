"use client";
import { base_url, tenant_base_url } from "@/constants/BaseUrl";
import { GetToken } from "@/constants/GetToken";
import React, { useEffect, useState } from "react";
import { FeaturedRoom } from "../User/FeaturedRooms";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { FaBookmark } from "react-icons/fa";
import toast from "react-hot-toast";

const Office = () => {
  const [office, setOffice] = useState<Array<FeaturedRoom> | []>([]);
  const router = useRouter();

  const [token, setToken] = useState<string>("");

  const getToken = GetToken();

  useEffect(() => {
    if (getToken) {
      setToken(getToken);
    }
  }, [getToken]);

  useEffect(() => {
    if (token) {
      fetchRooms();
      fetchIng();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const [watchlistsRoom, setWatchlistsRoom] = useState<
    Array<FeaturedRoom> | []
  >([]);

  const fetchIng = async () => {
    if (!getToken) return;
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
  };

  const fetchRooms = async () => {
    try {
      const type = "office";
      const response = await fetch(`${tenant_base_url}/rooms/filter/${type}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setOffice(data.message);
      }
    } catch (error: unknown) {
      console.log(String(error));
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
          pinnedLocation: prop.pinnedLocation,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  return (
    <div className="mb-60">
      <div className="grid grid-cols-3 px-20 justify-center gap-24 mt-10">
        {office && office.length > 0 ? (
          office.map((property, index) => (
            <div
              key={index}
              className="cursor-pointer hover:-translate-y-4 transition-all ease-out duration-150 hover:shadow-xl"
            >
              <div className="relative">
                <Image
                  src={property.images[0]}
                  alt="images"
                  width={390}
                  height={400}
                  className="rounded-t-md  transition-all duration-150 ease-in-out hover:shadow-xl"
                />
                {watchlistsRoom.map((w, index) =>
                  w.roomId === property._id ? (
                    <FaBookmark
                      key={index}
                      className="absolute bottom-1 right-2 text-blue-300  text-xl"
                      onClick={() => saveToWatchLists(property)}
                    />
                  ) : (
                    <FaBookmark
                      key={index}
                      className="absolute bottom-1 right-2 text-white  text-xl"
                      onClick={() => saveToWatchLists(property)}
                    />
                  )
                )}
              </div>
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
                    Province: {property.location.province}
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
          ))
        ) : (
          <div className="text-2xl font-bold px-10 py-10">
            <p>No room available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Office;
