"use client";

import Image from "next/image";
import parking from "../../assets/parking-area.png";
import balcony from "../../assets/balcony.png";
import room from "../../assets/living-room.png";
import floor from "../../assets/stairs.png";
import water from "../../assets/water-tap.png";
import direction from "../../assets/directions.png";
import React from "react";

interface FeaturesData {
  parking: string;
  balcony: string;
  category: string;
  floor: string;
  direction: string;
  waterfacility: string;
}

interface Props {
  features: FeaturesData;
}

const Features = ({ features }: Props) => {
  return (
    <div className="mb-8 md:mb-16 px-4 md:px-0">
      <h1 className="font-bold text-xl md:text-3xl mb-2 md:mb-3 font-sans">
        Features
      </h1>
      <hr />
      <div className="mt-6 md:mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        <div className="flex items-center flex-col gap-2 p-2 md:p-0">
          <Image
            src={parking}
            alt="parking"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <p className="text-gray-500 text-sm md:text-base text-center">
            {features.parking === "Yes" ? "Available" : "Not Available"}
          </p>
        </div>
        <div className="flex items-center flex-col gap-2 p-2 md:p-0">
          <Image
            src={balcony}
            alt="balcony"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <p className="text-gray-500 text-sm md:text-base text-center">
            {features.balcony === "Yes" ? "Available" : "Not Available"}
          </p>
        </div>
        <div className="flex items-center flex-col gap-2 p-2 md:p-0">
          <Image
            src={room}
            alt="room"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <p className="text-gray-500 text-sm md:text-base text-center">
            {features.category}
          </p>
        </div>
        <div className="flex items-center flex-col gap-2 p-2 md:p-0">
          <Image
            src={floor}
            alt="floor"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <p className="text-gray-500 text-sm md:text-base text-center">
            {features.floor}
          </p>
        </div>
        <div className="flex items-center flex-col gap-2 p-2 md:p-0">
          <Image
            src={direction}
            alt="direction"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <p className="text-gray-500 text-sm md:text-base text-center">
            {features.direction}
          </p>
        </div>
        <div className="flex items-center flex-col gap-2 p-2 md:p-0">
          <Image
            src={water}
            alt="water"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <p className="text-gray-500 text-sm md:text-base text-center">
            {features.waterfacility}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
