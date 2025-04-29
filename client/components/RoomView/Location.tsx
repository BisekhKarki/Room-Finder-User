"use client";

import React from "react";

interface LocationProps {
  province?: string;
  city: string;
  street: string;
  region: string;
  landmark: string;
  zip: string;
}

interface Props {
  location: LocationProps;
}

const Location = ({ location }: Props) => {
  return (
    <div className="mb-8 md:mb-16 px-4 md:px-0">
      <h1 className="font-bold text-xl md:text-3xl mb-2 md:mb-3 font-sans">
        Location
      </h1>
      <hr />
      <div className="mt-6 md:mt-8">
        <div className="grid grid-cols-1 md:flex md:flex-col gap-4 md:gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm md:text-base">
                Province: {location.province}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm md:text-base">
                City: {location.city}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm md:text-base">
                Street: {location.street}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm md:text-base">
                Region: {location.region}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm md:text-base">
                Landmark: {location.landmark}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm md:text-base">
                Zip Code: {location.zip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
