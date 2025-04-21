"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";

interface ImagesProps {
  propertyImage: string[] | undefined;
}

const PropertyImages = ({ propertyImage }: ImagesProps) => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  if (!propertyImage || propertyImage.length === 0) {
    return <div className="text-gray-500">No images available</div>;
  }

  const changeImageIndex = () => {
    if (imageIndex > propertyImage.length - 2) {
      setImageIndex(0);
    } else {
      setImageIndex(imageIndex + 1);
    }
  };

  const decreaseImageIndex = () => {
    if (imageIndex < 1) {
      setImageIndex(propertyImage.length - 1);
    } else {
      setImageIndex(imageIndex - 1);
    }
  };

  return (
    <div className="mt-10 mb-10">
      <div className="px-10 flex overflow-hidden">
        <div className="relative">
          {propertyImage && propertyImage.length > 0 && (
            <Image
              key={imageIndex}
              src={propertyImage[imageIndex]}
              alt="Images"
              width={1500}
              height={1200}
              className=""
            />
          )}
          <div className="absolute top-10 flex justify-between items-center">
            <Button onClick={() => decreaseImageIndex()}>Prev</Button>
            <Button onClick={() => changeImageIndex()}>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyImages;
