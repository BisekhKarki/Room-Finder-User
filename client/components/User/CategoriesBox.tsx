"use client";
import React from "react";

const names = ["Rooms", "Flats", "Apartments", "Shops", "Office"];

const CategoriesBox = () => {
  return (
    <div className="mt-5">
      <h1 className="text-center mb-8 md:mb-10 text-3xl md:text-4xl font-bold">
        Categories
      </h1>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-20 px-4">
        {names.map((nam, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-md px-4 py-3 md:px-6 md:py-4 text-sm md:text-base w-full max-w-xs sm:w-auto"
          >
            <p>{nam}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesBox;
