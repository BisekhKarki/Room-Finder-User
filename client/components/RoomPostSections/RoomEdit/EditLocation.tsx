"Use client";

import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";

import toast from "react-hot-toast";

interface Props {
  counter: number;
  setCounter: (index: number) => void;
}

const EditLocation = ({ counter, setCounter }: Props) => {
  const [zip, setZip] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [landmark, setLandmark] = useState<string>("");

  useEffect(() => {
    const getLocationDetailsFromLocalStorage =
      localStorage.getItem("Edit_Post_location");

    if (
      getLocationDetailsFromLocalStorage &&
      getLocationDetailsFromLocalStorage.length > 0
    ) {
      const details = JSON.parse(getLocationDetailsFromLocalStorage);
      console.log(details);
      setZip(details.zip);
      setStreet(details.street);
      setCity(details.city);
      setProvince(details.province);
      setRegion(details.region);
      setLandmark(details.landmark);
    }
  }, []);

  const setLocationDetails = async () => {
    if (!street || !zip || !city || !province || !region || !landmark) {
      toast.error("Fill all details to procced next step");
      return;
    }

    const locationDetails = {
      street,
      zip,
      city,
      province,
      region,
      landmark,
    };

    localStorage.setItem("Edit_Post_location", JSON.stringify(locationDetails));

    setCounter(counter + 1);
    localStorage.setItem("Edit_Last_Page", JSON.stringify(counter + 1));
  };

  return (
    <div className="px-4 md:px-0">
      <div className="space-y-6">
        {/* Street Address & Zip Code */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-10">
          <div className="w-full md:w-1/2">
            <Input
              placeholder="Street Address"
              className="h-12 w-full"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2">
            <Input
              placeholder="Zip/Postal Code"
              className="h-12 w-full"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
        </div>

        {/* City & Province */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="w-full md:w-1/2">
            <Input
              placeholder="City"
              className="h-12 w-full"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2">
            <select
              value={province}
              className="w-full h-12 bg-background border rounded-md px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onChange={(e) => setProvince(e.target.value)}
              aria-label="Province"
            >
              <option>--- Select Province ---</option>
              <option>Bagmati Province</option>
              <option>Koshi Province</option>
              <option>Madhesh Province</option>
              <option>Gandaki Province</option>
              <option>Lumbini Province</option>
              <option>Karnali Province</option>
              <option>Sudurpashchim Province</option>
            </select>
          </div>
        </div>

        {/* Region & Landmark */}
        <div className="w-full space-y-6">
          <Input
            placeholder="Region/Neighbourhood"
            className="h-12 w-full"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
          <Input
            placeholder="Landmark"
            className="h-20 w-full"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
        <Button
          type="button"
          className="w-full md:w-32 bg-blue-400 hover:bg-blue-500 order-2 md:order-1"
          onClick={() => setCounter(counter - 1)}
        >
          <RxArrowLeft className="mr-2" /> Previous
        </Button>
        <Button
          type="button"
          className="w-full md:w-32 bg-blue-400 hover:bg-blue-500 order-1 md:order-2"
          onClick={() => setLocationDetails()}
        >
          Next <RxArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default EditLocation;
