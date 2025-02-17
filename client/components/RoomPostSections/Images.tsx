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
            <Button className="" type="button" onClick={() => open()}>
              Upload Image
            </Button>
          )}
        </CldUploadWidget>
        <div className="flex gap-2 flex-wrap">
          {images &&
            images.length > 0 &&
            images.map((url, index) => (
              <div key={index}>
                <Image src={url} width={500} height={100} alt="Room Images" />
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-center gap-10">
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
