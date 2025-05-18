"use client";

import React from "react";
import PinLocationMap from "./PinLocation";

interface Props {
  counter: number;
  setCounter: (index: number) => void;
}

const PinToLocation = ({ counter, setCounter }: Props) => {
  return (
    <div>
      <p className="font-bold text-center text-xl mt-2">
        Double Tap in the map to pin location
      </p>
      <div>
        <PinLocationMap counter={counter} setCounter={setCounter} />
      </div>
    </div>
  );
};

export default PinToLocation;
