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
    <div className="mb-16">
      <h1 className="font-bold text-3xl mb-3 font-sans">Features</h1>
      <hr />
      <div className="mt-10 flex justify-between flex-wrap ">
        <div className="flex items-center flex-col gap-2">
          <Image src={parking} alt="parking" width={35} height={35} />
          <p className="text-gray-500 text-base">
            {features.parking === "Yes" ? "Available" : "Not Available"}
          </p>
        </div>
        <div className="flex items-center flex-col gap-2">
          <Image src={balcony} alt="parking" width={35} height={35} />
          <p className="text-gray-500 text-base">
            {features.balcony === "Yes" ? "Available" : "Not Available"}
          </p>
        </div>
        <div className="flex items-center flex-col gap-2">
          <Image src={room} alt="parking" width={35} height={35} />
          <p className="text-gray-500 text-base">{features.category}</p>
        </div>
        <div className="flex items-center flex-col gap-2">
          <Image src={floor} alt="parking" width={35} height={35} />
          <p className="text-gray-500 text-base">{features.floor}</p>
        </div>
        <div className="flex items-center flex-col gap-2">
          <Image src={direction} alt="parking" width={35} height={35} />
          <p className="text-gray-500 text-base">{features.direction}</p>
        </div>
        <div className="flex items-center flex-col gap-2">
          <Image src={water} alt="parking" width={35} height={35} />
          <p className="text-gray-500 text-base">{features.waterfacility}</p>
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default Features;
