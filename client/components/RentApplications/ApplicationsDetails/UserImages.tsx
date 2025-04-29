import Image from "next/image";
import React from "react";

interface Images {
  citizen_front: string;
  citizen_back: string;
  personal_photo: string;
}

interface Props {
  images: Images | never;
}

const UserImages = ({ images }: Props) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4">
        Identity Documents
      </h1>
      <hr className="border-gray-200 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="space-y-2">
          <p className="font-medium text-sm md:text-base">Personal Photo</p>
          <div className="relative aspect-square w-full">
            <Image
              src={images.personal_photo}
              alt="Personal photo"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="space-y-2">
          <p className="font-medium text-sm md:text-base">Citizenship Front</p>
          <div className="relative aspect-square w-full">
            <Image
              src={images.citizen_front}
              alt="Citizenship front"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="space-y-2">
          <p className="font-medium text-sm md:text-base">Citizenship Back</p>
          <div className="relative aspect-square w-full">
            <Image
              src={images.citizen_back}
              alt="Citizenship back"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserImages;
