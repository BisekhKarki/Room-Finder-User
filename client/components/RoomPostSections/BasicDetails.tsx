"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { RxArrowRight } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { basicDetails } from "@/store/form";
import toast from "react-hot-toast";

interface Props {
  counter: number;
  setCounter: (index: number) => void;
}

const BasicDetails = ({ counter, setCounter }: Props) => {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getBasicValuesFromLocalStorage = localStorage.getItem("Post_Basic");
    console.log(getBasicValuesFromLocalStorage);
    if (
      getBasicValuesFromLocalStorage &&
      getBasicValuesFromLocalStorage?.length > 1
    ) {
      const details = JSON.parse(getBasicValuesFromLocalStorage);
      setName(details?.name);
      setType(details?.type);
      setPrice(details?.price);
      setTitle(details?.title);
      setDescription(details?.description);
    }
  }, []);

  const setBasicDetailsValues = async () => {
    if (
      !name ||
      type === "--- Select Type ---" ||
      !price ||
      !title ||
      !description
    ) {
      toast.error("Please fill in all the details");
      return;
    }
    dispatch(
      basicDetails({
        name,
        type,
        price,
        title,
        description,
      })
    );

    setCounter(counter + 1);
    localStorage.setItem("Last_Page", JSON.stringify(counter + 1));
  };

  return (
    <div>
      <div className="flex gap-10 mb-8">
        <Input
          placeholder="name of the property"
          className="w-[36rem] h-12"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          value={type}
          className="w-[36rem] h-12 bg-white border rounded-md px-3 py-2"
          onChange={(e) => setType(e.target.value)}
        >
          <option>--- Select Type ---</option>
          <option>Residental Properties</option>
          <option>Commercial Property</option>
        </select>
      </div>
      <div className="flex gap-10">
        <Input
          placeholder="Price"
          className="w-[36rem] h-12"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          placeholder="title"
          className="w-[36rem] h-12"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <Textarea
        placeholder="Write a full description about your property"
        className="h-32 mt-7"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex justify-center">
        <Button
          type="button"
          className="mt-5 bg-blue-400 hover:bg-blue-500 w-32"
          onClick={() => setBasicDetailsValues()}
        >
          Next <RxArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default BasicDetails;
