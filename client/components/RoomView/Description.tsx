"use client";

import React from "react";

interface Props {
  description: string;
}

const Description = ({ description }: Props) => {
  return (
    <div className="mb-8 md:mb-16">
      <h1 className="font-bold text-xl md:text-3xl mb-2 md:mb-3 font-sans">
        Description
      </h1>
      <hr />
      <div className="mt-4 md:mt-5 px-4 md:px-0">
        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Description;
