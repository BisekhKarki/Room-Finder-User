"use client";

import React from "react";
import { Button } from "../ui/button";
import { RxArrowLeft } from "react-icons/rx";
import { BsSave } from "react-icons/bs";
import { Input } from "../ui/input";

interface Props {
  counter: number;
  setCounter: (index: number) => void;
}

const ContactDeatils = ({ counter, setCounter }: Props) => {
  return (
    <div>
      <div className="flex gap-5 mb-5">
        <Input placeholder="Your Name" className="h-12" />
        <Input placeholder="Your contact Number" className="h-12" />
      </div>
      <div className="flex gap-5 mb-5">
        <Input placeholder="Email" className="h-12" />
      </div>
      <div className="flex gap-5 justify-center">
        <Button
          type="button"
          className="mt-5 bg-blue-400 hover:bg-blue-500 w-32"
          onClick={() => setCounter(counter - 1)}
        >
          <RxArrowLeft /> Previous
        </Button>
        <Button
          type="button"
          className="mt-5 bg-green-600 hover:bg-green-700 w-32"
          onClick={() => {}}
        >
          <BsSave /> Save
        </Button>
      </div>
    </div>
  );
};

export default ContactDeatils;
