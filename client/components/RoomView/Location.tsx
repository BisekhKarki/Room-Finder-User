"use client";

import React from "react";

interface LocationProps {
  Province: string;
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
    <div className="mb-16">
      <h1 className="font-bold text-3xl mb-3 font-sans">Location</h1>
      <hr />
      <div className="mt-8 mb-16">
        <div className="flex flex-col gap-6 justify-between flex-wrap">
          <div className=" flex justify-between flex-wrap">
            <div className="">
              <p className="text-gray-500 text-base">
                Province: {location.Province}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-base">City: {location.city}</p>
            </div>
            <div>
              <p className="text-gray-500 text-base">
                Street: {location.street}
              </p>
            </div>
          </div>

          <div className="flex justify-between flex-wrap">
            <div>
              <p className="text-gray-500 text-base">
                Region: {location.region}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-base">
                Landmark: {location.landmark}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-base">
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
