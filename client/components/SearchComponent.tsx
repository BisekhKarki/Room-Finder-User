"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setCategory } from "@/store/slice";

const SearchComponent = () => {
  const [location, setLocation] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const search = () => {
    dispatch(
      setCategory({
        location,
        price,
        propertyType,
      })
    );
  };

  return (
    <div className="mt-10">
      <div className="flex justify-center cursor-pointer">
        <div className="flex items-center justify-center gap-20 border border-gray-300 rounded-md py-10 w-5/6 shadow-md">
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-96 border border-gray-300"
            placeholder="Search by location"
          />
          <select
            value={price}
            defaultValue=""
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 px-12 py-3 rounded-md cursor-pointer"
          >
            <option>Price Range</option>
            <option>5-10k</option>
            <option>10-20k</option>
            <option>20-30k</option>
            <option>30-40k</option>
            <option>40-50k</option>
            <option>More than 50k</option>
          </select>
          <select
            defaultValue=""
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="border border-gray-300 px-12 py-3 rounded-md cursor-pointer"
          >
            <option>Property Type</option>
            <option>Room</option>
            <option>Shop</option>
            <option>Office</option>
            <option>Apartment</option>
          </select>
          <Button
            className="bg-blue-500 w-32 hover:bg-blue-600"
            onClick={() => search()}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
