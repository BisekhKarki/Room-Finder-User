"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImagesProps {
  propertyImage: string[] | undefined;
}

const PropertyImages = ({ propertyImage }: ImagesProps) => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  if (!propertyImage || propertyImage.length === 0) {
    return <div className="text-gray-500">No images available</div>;
  }

  const handleNext = () => {
    setImageIndex((prev) => (prev === propertyImage.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setImageIndex((prev) => (prev === 0 ? propertyImage.length - 1 : prev - 1));
  };

  return (
    <div className="mt-10 mb-10">
      <div className="px-10 flex justify-center overflow-hidden">
        <div className="relative group aspect-video overflow-hidden rounded-xl shadow-lg">
          {propertyImage && propertyImage.length > 0 && (
            <Image
              key={imageIndex}
              src={propertyImage[imageIndex]}
              alt="Images"
              // fill
              width={1200}
              height={1000}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              className="object-cover"
            />
          )}

          <div className="absolute inset-0 flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrev}
              className="h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {propertyImage.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === imageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Image Counter */}
          <div className="absolute top-4 right-4 bg-black/30 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            {imageIndex + 1} / {propertyImage.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyImages;
