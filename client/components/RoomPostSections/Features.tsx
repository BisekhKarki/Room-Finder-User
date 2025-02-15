"use client";

import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";

interface Props {
  counter: number;
  setCounter: (index: number) => void;
}

const Features = ({ counter, setCounter }: Props) => {
  return (
    <div>
      <div>
        <div className="flex gap-8 mb-7">
          <div className="w-1/2">
            <label>Parking</label>
            <select className="w-full h-12 bg-white border rounded-md px-3 py-2">
              <option>-- Select Option --</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="w-1/2">
            <label>Kitchen</label>
            <select className="w-full h-12 bg-white border rounded-md px-3 py-2">
              <option>-- Select Option --</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>
        <div className="flex gap-8 mb-7">
          <div className="w-1/2">
            <label>Balcony</label>
            <select className="w-full h-12 bg-white border rounded-md px-3 py-2">
              <option>-- Select Option --</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div className="w-1/2">
            <label>Category</label>
            <select className="w-full h-12 bg-white border rounded-md px-3 py-2">
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
              <select className="w-full h-12 bg-white border rounded-md px-3 py-2">
                <option>-- Select Option --</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>
          <div className="w-1/2">
            <label>Faced</label>
            <div className="w-full">
              <select className="w-full h-12 bg-white border rounded-md px-3 py-2">
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
          <Input placeholder="1,2,3 eg" className="h-12" />
        </div>
      </div>
      <div className="flex justify-center gap-5">
        <Button
          type="button"
          className="mt-5 bg-blue-400 hover:bg-blue-500 w-32"
          onClick={() => setCounter(counter + 1)}
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

export default Features;
