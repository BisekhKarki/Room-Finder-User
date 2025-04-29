"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";
// import { Input } from "../ui/input";
import { CldUploadWidget } from "next-cloudinary";
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
    <div className="px-4 md:px-0 space-y-8">
      <div className="space-y-6">
        {/* Upload Button - Color maintained */}
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
              type="button"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => open()}
            >
              Upload Image
            </Button>
          )}
        </CldUploadWidget>

        {/* Image Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-10">
            {images.map((url, index) => (
              <div key={url} className="relative aspect-square group">
                <Image
                  src={url}
                  fill
                  alt="Property images"
                  className="rounded-md object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
                {/* Delete button color maintained */}
                <Button
                  className="bg-red-600 hover:bg-red-700 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                  onClick={() => deleteImages(index)}
                >
                  <FaTrash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Buttons - Colors maintained */}
      <div className="flex flex-col-reverse md:flex-row justify-center gap-5 mt-10">
        <Button
          type="button"
          className="bg-blue-400 hover:bg-blue-500 w-full md:w-32"
          onClick={() => {
            setCounter(counter - 1);
            localStorage.setItem("Last_Page", JSON.stringify(counter - 1));
          }}
        >
          <RxArrowLeft className="mr-2" /> Previous
        </Button>
        <Button
          type="button"
          className="bg-blue-400 hover:bg-blue-500 w-full md:w-32"
          onClick={() => {
            setRoomImages();
            localStorage.setItem("Last_Page", JSON.stringify(counter + 1));
          }}
        >
          Next <RxArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Images;
