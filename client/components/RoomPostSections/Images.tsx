"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";
import { Input } from "../ui/input";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import toast from "react-hot-toast";
import { imageDetails } from "@/store/form";
import { FaTrash } from "react-icons/fa";

interface Props {
  counter: number;
  setCounter: (index: number) => void;
}

const Images = ({ counter, setCounter }: Props) => {
  const [images, setImages] = useState<Array<string>>([]);

  useEffect(() => {
    const getImagesFromLocalStorage = localStorage.getItem("Post_Images");
    if (getImagesFromLocalStorage && getImagesFromLocalStorage.length > 0) {
      const getImageDetails = JSON.parse(getImagesFromLocalStorage);
      setImages(getImageDetails);
    }
  }, []);

  const dispatch = useDispatch<AppDispatch>();

  const setRoomImages = () => {
    if (images.length <= 0) {
      toast.error("Upload Image");
      return;
    }

    dispatch(imageDetails(images));
    setCounter(counter + 1);
  };

  const deleteImages = (idx: number) => {
    setImages((prev) => prev.filter((img, index) => index !== idx));
    localStorage.setItem("Post_Images", JSON.stringify(images));
  };

  return (
    <div>
      <div>
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
          onSuccess={({ event, info }) => {
            if (event === "success" && typeof info !== "string" && info?.url) {
              setImages((prev) => [...prev, info.url]);
            }
          }}
        >
          {({ open }) => (
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              type="button"
              onClick={() => open()}
            >
              Upload Image
            </Button>
          )}
        </CldUploadWidget>
        <div className="flex gap-10 flex-wrap mt-10">
          {images &&
            images.length > 0 &&
            images.map((url, index) => (
              <div key={index} className="relative">
                <Image src={url} width={500} height={100} alt="Room Images" />
                <Button
                  className="bg-red-600 hover:bg-red-700 absolute top-2 right-1 "
                  onClick={() => deleteImages(index)}
                >
                  <FaTrash />
                </Button>
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-center gap-10 mt-10">
        <Button
          type="button"
          className="mt-5 bg-blue-400 hover:bg-blue-500 w-32"
          onClick={() => {
            setRoomImages();
            localStorage.setItem("Last_Page", JSON.stringify(counter + 1));
          }}
        >
          Next <RxArrowRight />
        </Button>
        <Button
          type="button"
          className="mt-5 bg-blue-400 hover:bg-blue-500 w-32"
          onClick={() => {
            setCounter(counter - 1);
            localStorage.setItem("Last_Page", JSON.stringify(counter - 1));
          }}
        >
          <RxArrowLeft /> Previous
        </Button>
      </div>
    </div>
  );
};

export default Images;
