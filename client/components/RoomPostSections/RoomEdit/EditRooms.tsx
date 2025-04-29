"use client";

import Stepper from "@/components/RoomPostSections/Stepper";
// import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import EditBasicDetails from "./EditBasicDetails";
import { useParams } from "next/navigation";
import { base_url } from "@/constants/BaseUrl";
import { GetToken } from "@/constants/GetToken";
import EditLocation from "./EditLocation";
import EditFeatures from "./EditFeatures";
import EditImages from "./EditImages";
import EditContactDeatils from "./EditContact";

const steps = [
  {
    label: "Basic",
  },
  {
    label: "Location",
  },
  {
    label: "Features",
  },
  {
    label: "Pictures",
  },
  {
    label: "Contact",
  },
];

const EditRoom = () => {
  const [counter, setCounter] = useState<number>(0);
  const { id } = useParams();

  useEffect(() => {
    const getCounter = localStorage.getItem("Edit_Last_Page");
    if (getCounter && getCounter.length > 0) {
      const getValue = JSON.parse(getCounter);
      setCounter(parseInt(getValue));
    }
  }, []);

  const token = GetToken();

  useEffect(() => {
    if (token && id) {
      fetchRooms();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${base_url}/posted/edit/room/get/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem(
          "Edit_Post_Basic",
          JSON.stringify(data.message.basic)
        );
        localStorage.setItem(
          "Edit_Post_contact",
          JSON.stringify(data.message.contact)
        );
        localStorage.setItem(
          "Edit_Post_features",
          JSON.stringify(data.message.features)
        );
        localStorage.setItem(
          "Edit_Post_images",
          JSON.stringify(data.message.images)
        );
        localStorage.setItem(
          "Edit_Post_location",
          JSON.stringify(data.message.location)
        );
      }
    } catch (error: unknown) {
      console.log(String(error));
    }
  };

  return (
    <>
      <div className="flex-1 min-h-screen">
        <div className="m-4 md:m-6">
          <div className="py-4 px-4 md:px-6 rounded-md">
            <h1 className="text-2xl md:text-3xl font-bold">
              Edit Your Property
            </h1>
            <p className="mt-3 text-sm md:text-base text-gray-500">
              Easily list, manage, and promote your rental properties, connect
              with potential tenants, and streamline your leasing process—all in
              one place. Maximize your property visibility and minimize the
              hassle!
            </p>
          </div>

          <hr className="w-full mt-5" />

          <div className="mt-6 md:mt-10">
            <Stepper
              items={steps}
              activeItem={counter}
              setActiveItem={setCounter}
            />
            <div className="shadow-md py-3 px-4 md:py-4 md:px-6 border border-gray-300 mt-5 rounded-md max-w-6xl mx-auto bg-white">
              {" "}
              {counter === 0 && (
                <EditBasicDetails counter={counter} setCounter={setCounter} />
              )}
              {counter === 1 && (
                <EditLocation counter={counter} setCounter={setCounter} />
              )}
              {counter === 2 && (
                <EditFeatures counter={counter} setCounter={setCounter} />
              )}
              {counter === 3 && (
                <EditImages counter={counter} setCounter={setCounter} />
              )}
              {counter === 4 && (
                <EditContactDeatils counter={counter} setCounter={setCounter} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditRoom;
