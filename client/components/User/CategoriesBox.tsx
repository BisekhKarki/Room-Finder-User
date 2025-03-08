"use client";
import React from "react";

const names = ["Rooms", "Flats", "Apartments", "Shops", "Office"];

const CategoriesBox = () => {
  return (
    <div className="mt-5">
      <h1 className="text-center mb-10 text-4xl font-bold ">Categories</h1>
      <div className="flex justify-center gap-20">
        {names.map((nam, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-md px-10 py-5 shadow-sm hover:shadow-md cursor-pointer"
          >
            <p>{nam}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesBox;
