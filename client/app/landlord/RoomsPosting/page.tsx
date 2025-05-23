"use client";

import BasicDetails from "@/components/RoomPostSections/BasicDetails";
import ContactDeatils from "@/components/RoomPostSections/ContactDetails";
import Features from "@/components/RoomPostSections/Features";
import Images from "@/components/RoomPostSections/Images";
import Location from "@/components/RoomPostSections/Location";
import dynamic from "next/dynamic";
import Stepper from "@/components/RoomPostSections/Stepper";
import React, { useEffect, useState } from "react";
import ProtectRoutePage from "@/components/ProtectRoutePage";
// import PinToLocation from "@/components/RoomPostSections/PinToLocation";

const PinToLocation = dynamic(
  () => import("@/components/RoomPostSections/PinToLocation"),
  { ssr: false }
);

const steps = [
  { label: "Basic" },
  { label: "Location" },
  { label: "Pin Location" },
  { label: "Features" },
  { label: "Pictures" },
  { label: "Contact" },
];

const Page = () => {
  const [counter, setCounter] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedPage = localStorage.getItem("Last_Page");
    if (savedPage) {
      try {
        setCounter(parseInt(savedPage));
      } catch (error) {
        console.error("Error parsing Last_Page:", error);
      }
    }
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex-1 min-h-screen">
      <ProtectRoutePage type="Landlord" />
      <div className="m-4 md:m-6">
        <div className="py-4 px-4 md:px-6 rounded-md">
          <h1 className="text-2xl md:text-3xl font-bold">Post Your Property</h1>
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
            {counter === 0 && (
              <BasicDetails counter={counter} setCounter={setCounter} />
            )}
            {counter === 1 && (
              <Location counter={counter} setCounter={setCounter} />
            )}
            {counter === 2 && (
              <PinToLocation counter={counter} setCounter={setCounter} />
            )}
            {counter === 3 && (
              <Features counter={counter} setCounter={setCounter} />
            )}
            {counter === 4 && (
              <Images counter={counter} setCounter={setCounter} />
            )}
            {counter === 5 && (
              <ContactDeatils counter={counter} setCounter={setCounter} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
