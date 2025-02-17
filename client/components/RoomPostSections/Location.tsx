"Use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { locationDetails } from "@/store/form";
import toast from "react-hot-toast";

interface Props {
  counter: number;
  setCounter: (index: number) => void;
}

const Location = ({ counter, setCounter }: Props) => {
  const [zip, setZip] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [landmark, setLandmark] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getLocationDetailsFromLocalStorage =
      localStorage.getItem("Post_Location");

    if (
      getLocationDetailsFromLocalStorage &&
      getLocationDetailsFromLocalStorage.length > 0
    ) {
      const details = JSON.parse(getLocationDetailsFromLocalStorage);
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
    dispatch(
      locationDetails({
        street,
        zip,
        city,
        province,
        region,
        landmark,
      })
    );
    setCounter(counter + 1);
    localStorage.setItem("Last_Page", JSON.stringify(counter + 1));
  };

  return (
    <div>
      <div>
        <div className="flex gap-10 mb-7">
          <div className="w-1/2">
            <Input
              placeholder="Street Address"
              className="h-12"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <Input
              placeholder="zip/Postal code"
              className="h-12"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-8 mb-7">
          <div className="w-1/2">
            <Input
              placeholder="city"
              className="h-12"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <select
              value={province}
              className="w-full h-12 bg-white border rounded-md px-3 py-2"
              onChange={(e) => setProvince(e.target.value)}
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
        <div className="w-full mb-7">
          <Input
            placeholder="Region/Neighbourhood"
            className="h-12"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Input
            placeholder="landmark"
            className="h-20 "
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center gap-5">
        <Button
          type="button"
          className="mt-5 bg-blue-400 hover:bg-blue-500 w-32"
          onClick={() => setLocationDetails()}
        >
          Next <RxArrowRight />
        </Button>
        <Button
          type="button"
          className="mt-5 bg-blue-400 hover:bg-blue-500 w-32"
          onClick={() => setCounter(counter - 1)}
        >
          <RxArrowLeft /> Previous
        </Button>
      </div>
    </div>
  );
};

export default Location;
