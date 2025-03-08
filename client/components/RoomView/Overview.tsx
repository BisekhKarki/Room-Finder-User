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
    <div className="mb-16">
      <h1 className="font-bold text-3xl mb-3 font-sans">Overview</h1>
      <hr />
      <div className="mt-5 flex flex-row justify-between">
        <p className="text-gray-500 text-base">Name: {basic.name}</p>
        <p className="text-gray-500 text-base">Price: {basic.price}</p>
        <p className="text-gray-500 text-base">Property Type: {basic.type}</p>
      </div>
    </div>
  );
};

export default Overview;
