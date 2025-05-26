"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { featureDetails } from "@/store/form";

interface Props {
  counter: number;
  setCounter: (index: number) => void;
}

const Features = ({ counter, setCounter }: Props) => {
  const [water, setWater] = useState<string>("");
  const [balcony, setBalcony] = useState<string>("");
  const [parking, setParking] = useState<string>("");
  const [kitchen, setKitchen] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [direction, setDirection] = useState<string>("");
  const [floor, setFloor] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getFeaturesFromLocalStorage = localStorage.getItem("Post_Features");
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
      floor === ""
    ) {
      toast.error("Fill all details to proceed next");
      return;
    }
    dispatch(
      featureDetails({
        parking,
        kitchen,
        balcony,
        category,
        waterFacility: water,
        direction,
        floor,
      })
    );
    setCounter(counter + 1);
    localStorage.setItem("Last_Page", JSON.stringify(counter + 1));
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
              <option value="">-- Select Option --</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
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
              <option value="">-- Select Option --</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
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
              <option value="">-- Select Option --</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
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
              <option value="">-- Select Option --</option>
              <option value="Single Room">Single Room</option>
              <option value="Two Rooms">Two Rooms</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="Flat">Flat</option>
              <option value="4 BHK">4 BHK</option>
              <option value="Apartment/Housing">Apartment/Housing</option>
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
              <option value="">-- Select Option --</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
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
              <option value="">-- Select Option --</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="North">North</option>
              <option value="South">South</option>
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
            onChange={(e) => setFloor(e.target.value.replace(/[^0-9]/g, ""))}
            aria-label="Floor number"
            type="number"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col-reverse md:flex-row justify-center gap-4 mt-8">
        <Button
          type="button"
          variant="secondary"
          className="w-full md:w-32 bg-blue-400 hover:bg-blue-500 text-white"
          onClick={() => {
            setCounter(counter - 1);
            localStorage.setItem("Last_Page", JSON.stringify(counter - 1));
          }}
        >
          <RxArrowLeft className="mr-2" /> Previous
        </Button>
        <Button
          type="button"
          className="w-full md:w-32 bg-blue-400 hover:bg-blue-500 text-white"
          onClick={setFeaturesDetails}
        >
          Next <RxArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Features;
