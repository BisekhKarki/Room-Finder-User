"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";
import toast from "react-hot-toast";

interface Props {
  counter: number;
  setCounter: (index: number) => void;
}

const EditFeatures = ({ counter, setCounter }: Props) => {
  const [water, setWater] = useState<string>("");
  const [balcony, setBalcony] = useState<string>("");
  const [parking, setParking] = useState<string>("");
  const [kitchen, setKitchen] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [direction, setDirection] = useState<string>("");
  const [floor, setFloor] = useState<string>("");

  useEffect(() => {
    const getFeaturesFromLocalStorage =
      localStorage.getItem("Edit_Post_features");
    if (getFeaturesFromLocalStorage && getFeaturesFromLocalStorage.length > 0) {
      const details = JSON.parse(getFeaturesFromLocalStorage);
      setBalcony(details.balcony);
      setWater(details.waterFacility);
      setParking(details.parking);
      setKitchen(details.kitchen);
      setCategory(details.category);
      setDirection(details.direction);
      setFloor(details.floor);
    }
  }, []);

  const setFeaturesDetails = () => {
    if (
      water === "" ||
      balcony === "" ||
      parking === "" ||
      kitchen === "" ||
      category === "" ||
      direction === "" ||
      !floor
    ) {
      toast.error("Fill all details to procced next");
      return;
    }

    const featuresDetails = {
      parking,
      kitchen,
      balcony,
      category,
      waterFacility: water,
      direction,
      floor,
    };
    localStorage.setItem("Edit_Post_features", JSON.stringify(featuresDetails));

    setCounter(counter + 1);
    localStorage.setItem("Edit_Last_Page", JSON.stringify(counter + 1));
  };

  return (
    <div className="px-4 md:px-0">
      <div className="space-y-6">
        {/* Parking & Kitchen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Parking</label>
            <select
              className="w-full h-12 bg-background border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
              value={parking}
              onChange={(e) => setParking(e.target.value)}
              aria-label="Parking availability"
            >
              <option>-- Select Option --</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Kitchen</label>
            <select
              className="w-full h-12 bg-background border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
              value={kitchen}
              onChange={(e) => setKitchen(e.target.value)}
              aria-label="Kitchen availability"
            >
              <option>-- Select Option --</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>

        {/* Balcony & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Balcony</label>
            <select
              className="w-full h-12 bg-background border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
              value={balcony}
              onChange={(e) => setBalcony(e.target.value)}
              aria-label="Balcony availability"
            >
              <option>-- Select Option --</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Category</label>
            <select
              className="w-full h-12 bg-background border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Property category"
            >
              <option>-- Select Option --</option>
              <option>Single Room</option>
              <option>Two Rooms</option>
              <option>1 BHK</option>
              <option>2 BHK</option>
              <option>3 BHK</option>
              <option>Flat</option>
              <option>4 BHK</option>
              <option>Apartment/Housing</option>
            </select>
          </div>
        </div>

        {/* Water Facility & Faced Direction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Water Facility</label>
            <select
              className="w-full h-12 bg-background border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
              value={water}
              onChange={(e) => setWater(e.target.value)}
              aria-label="Water facility availability"
            >
              <option>-- Select Option --</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Faced</label>
            <select
              className="w-full h-12 bg-background border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              aria-label="Facing direction"
            >
              <option>-- Select Option --</option>
              <option>East</option>
              <option>West</option>
              <option>North</option>
              <option>South</option>
            </select>
          </div>
        </div>

        {/* Floor Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Floor</label>
          <Input
            placeholder="e.g., 1, 2, 3"
            className="h-12 w-full"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            aria-label="Floor number"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col-reverse md:flex-row justify-center gap-4 mt-8">
        <Button
          type="button"
          variant="secondary"
          className="w-full md:w-32  bg-blue-400 hover:bg-blue-500 text-white"
          onClick={() => {
            setCounter(counter - 1);
            localStorage.setItem("Last_Page", JSON.stringify(counter - 1));
          }}
        >
          <RxArrowLeft className="mr-2" /> Previous
        </Button>
        <Button
          type="button"
          className="w-full md:w-32  bg-blue-400 hover:bg-blue-500 text-white"
          onClick={() => setFeaturesDetails()}
        >
          Next <RxArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default EditFeatures;
