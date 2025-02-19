"use client";
import BasicDetails from "@/components/RoomPostSections/BasicDetails";
import ContactDeatils from "@/components/RoomPostSections/ContactDetails";
import Features from "@/components/RoomPostSections/Features";
import Images from "@/components/RoomPostSections/Images";
import Location from "@/components/RoomPostSections/Location";
import Stepper from "@/components/RoomPostSections/Stepper";
// import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

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

const Page = () => {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    const getCounter = localStorage.getItem("Last_Page");
    if (getCounter && getCounter.length > 0) {
      const getValue = JSON.parse(getCounter);
      setCounter(parseInt(getValue));
    }
  }, []);

  return (
    <>
      <div className="m-6">
        <div className=" py-4 px-6 rounded-md">
          <h1 className="text-3xl font-bold">Post Your Property</h1>
          <p className="mt-3 text-gray-500">
            Easily list, manage, and promote your rental properties, connect
            with potential tenants, and streamline your leasing process—all in
            one place. Maximize your property visibility and minimize the
            hassle!
          </p>
        </div>
        <hr className=" w-full  mt-5" />

        <div className="mt-10">
          <Stepper
            items={steps}
            activeItem={counter}
            setActiveItem={setCounter}
          />
          <div className="shadow-md py-4 px-6 border border-gray-300 mt-5 rounded-md">
            {counter === 0 && (
              <BasicDetails counter={counter} setCounter={setCounter} />
            )}
            {counter === 1 && (
              <Location counter={counter} setCounter={setCounter} />
            )}
            {counter === 2 && (
              <Features counter={counter} setCounter={setCounter} />
            )}
            {counter === 3 && (
              <Images counter={counter} setCounter={setCounter} />
            )}

            {counter === 4 && (
              <ContactDeatils counter={counter} setCounter={setCounter} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
