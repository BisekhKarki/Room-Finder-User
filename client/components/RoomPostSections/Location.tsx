"Use client";

import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";

interface Props {
  counter: number;
  setCounter: (index: number) => void;
}

const Location = ({ counter, setCounter }: Props) => {
  return (
    <div>
      <div>
        <div className="flex gap-10 mb-7">
          <div className="w-1/2">
            {/* <Label className="font-bold text-lg">Street Address</Label> */}
            <Input placeholder="Street Address" className="h-12" />
          </div>
          <div className="w-1/2">
            {/* <Label className="font-bold text-lg">Zip Code</Label> */}
            <Input placeholder="zip/Postal code" className="h-12" />
          </div>
        </div>
        <div className="flex gap-8 mb-7">
          <div className="w-1/2">
            {/* <Label className="font-bold text-lg" >City</Label> */}
            <Input placeholder="city" className="h-12" />
          </div>
          <div className="w-1/2">
            {/* <Label className="font-bold text-lg">Province</Label> */}
            <Input placeholder="province" className="h-12" />
          </div>
        </div>
        <div className="w-full mb-7">
          {/* <Label className="font-bold text-lg" >City</Label> */}
          <Input placeholder="Region/Neighbourhood" className="h-12" />
        </div>
        <div className="w-full">
          {/* <Label className="font-bold text-lg">Province</Label> */}
          <Input placeholder="landmark" className="h-20 " />
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

export default Location;
