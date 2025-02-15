"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";
import { Input } from "../ui/input";
interface Props {
  counter: number;
  setCounter: (index: number) => void;
}

const Images = ({ counter, setCounter }: Props) => {
  const [images, setImages] = useState<[]>([]);

  return (
    <div>
      <div>
        <label>Upload Images</label>
        <Input type="file" multiple />
      </div>
      <div className="flex justify-center gap-10">
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

export default Images;
