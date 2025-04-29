"use client";

import React from "react";

interface OverviewProps {
  name: string;
  price: string;
  type: string;
}

interface Props {
  basic: OverviewProps;
}

const Overview = ({ basic }: Props) => {
  return (
    <div className="mb-8 md:mb-16">
      <h1 className="font-bold text-xl md:text-3xl mb-2 md:mb-3 font-sans">
        Overview
      </h1>
      <hr />
      <div className="mt-4 md:mt-5 flex flex-col md:flex-row gap-y-3 justify-between items-start    md:items-center">
        <p className="text-gray-500 text-sm md:text-base text-center md:text-left w-full md:w-auto">
          Name: {basic.name}
        </p>
        <p className="text-gray-500 text-sm md:text-base text-center md:text-left w-full md:w-auto">
          Price: {basic.price}
        </p>
        <p className="text-gray-500 text-sm md:text-base text-center md:text-left w-full md:w-auto">
          Property Type: {basic.type}
        </p>
      </div>
    </div>
  );
};

export default Overview;
