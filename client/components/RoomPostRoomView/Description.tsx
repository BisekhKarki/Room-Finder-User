"use client";

import React from "react";

interface Props {
  description: string;
}

const Description = ({ description }: Props) => {
  return (
    <div className="mb-16">
      <h1 className="font-bold text-3xl mb-3 font-sans">Description</h1>
      <hr />
      <div className="mt-5">
        <p className="text-gray-500 text-base">{description}</p>
        <p></p>
      </div>
    </div>
  );
};

export default Description;
