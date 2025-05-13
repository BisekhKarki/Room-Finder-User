"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { RxArrowRight } from "react-icons/rx";

import toast from "react-hot-toast";

interface Props {
  counter: number;
  setCounter: (index: number) => void;
}

const EditBasicDetails = ({ counter, setCounter }: Props) => {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const getBasicValuesFromLocalStorage =
      localStorage.getItem("Edit_Post_Basic");

    if (
      getBasicValuesFromLocalStorage &&
      getBasicValuesFromLocalStorage?.length > 1
    ) {
      const details = JSON.parse(getBasicValuesFromLocalStorage);

      setName(details?.name);
      setType(details?.type);
      setPrice(details?.price);

      setDescription(details?.description);
    }
  }, []);

  const setBasicDetailsValues = async () => {
    if (!name || type === "--- Select Type ---" || !price || !description) {
      toast.error("Please fill in all the details");
      return;
    }

    const basicDetails = {
      name,
      type,
      price,
      description,
    };

    localStorage.setItem("Edit_Post_Basic", JSON.stringify(basicDetails));

    setCounter(counter + 1);
    localStorage.setItem("Edit_Last_Page", JSON.stringify(counter + 1));
  };

  return (
    <div className="px-4 md:px-0">
      <div className="flex flex-col md:flex-row gap-5 md:gap-10 mb-8">
        <Input
          placeholder="Name of the property"
          className="w-full h-12"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          value={type}
          className="w-full h-12 bg-background border rounded-md px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onChange={(e) => setType(e.target.value)}
          aria-label="Type"
        >
          <option>--- Select Type ---</option>
          <option>room</option>
          <option>office</option>
          <option>apartment</option>
          <option>shop</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row gap-5 md:gap-10 mb-8">
        <Input
          placeholder="Price"
          className="w-full h-12"
          value={price}
          readOnly
        />
      </div>

      <Textarea
        placeholder="Write a full description about your property"
        className="h-32 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex justify-center mt-8">
        <Button
          type="button"
          className="w-full md:w-32 bg-blue-400 hover:bg-blue-500"
          onClick={() => setBasicDetailsValues()}
        >
          Next <RxArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default EditBasicDetails;
