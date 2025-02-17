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
      !floor
    ) {
      toast.error("Fill all details to procced next");
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
    <div>
      <div>
        <div className="flex gap-8 mb-7">
          <div className="w-1/2">
            <label>Parking</label>
            <select
              className="w-full h-12 bg-white border rounded-md px-3 py-2"
              value={parking}
              onChange={(e) => setParking(e.target.value)}
            >
              <option>-- Select Option --</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="w-1/2">
            <label>Kitchen</label>
            <select
              className="w-full h-12 bg-white border rounded-md px-3 py-2"
              value={kitchen}
              onChange={(e) => setKitchen(e.target.value)}
            >
              <option>-- Select Option --</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>
        <div className="flex gap-8 mb-7">
          <div className="w-1/2">
            <label>Balcony</label>
            <select
              className="w-full h-12 bg-white border rounded-md px-3 py-2"
              value={balcony}
              onChange={(e) => setBalcony(e.target.value)}
            >
              <option>-- Select Option --</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div className="w-1/2">
            <label>Category</label>
            <select
              className="w-full h-12 bg-white border rounded-md px-3 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
        <div className="flex gap-8 mb-6">
          <div className="w-1/2">
            <label>Water Facility</label>
            <div className="w-full">
              <select
                className="w-full h-12 bg-white border rounded-md px-3 py-2"
                value={water}
                onChange={(e) => setWater(e.target.value)}
              >
                <option>-- Select Option --</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>
          <div className="w-1/2">
            <label>Faced</label>
            <div className="w-full">
              <select
                className="w-full h-12 bg-white border rounded-md px-3 py-2"
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
              >
                <option>-- Select Option --</option>
                <option>East</option>
                <option>West</option>
                <option>North</option>
                <option>South</option>
              </select>
            </div>
          </div>
        </div>
        <div className="">
          <label>Floor</label>
          <Input
            placeholder="1,2,3 eg"
            className="h-12"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center gap-5">
        <Button
          type="button"
          className="mt-5 bg-blue-400 hover:bg-blue-500 w-32"
          onClick={() => setFeaturesDetails()}
        >
          Next <RxArrowRight />
        </Button>
        <Button
          type="button"
          className="mt-5 bg-blue-400 hover:bg-blue-500 w-32"
          onClick={() => {
            setCounter(counter - 1);
            localStorage.setItem("Last_Page", JSON.stringify(counter - 1));
          }}
        >
          <RxArrowLeft /> Previous
        </Button>
      </div>
    </div>
  );
};

export default Features;
