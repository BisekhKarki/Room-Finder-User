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
  console.log(images);
  return (
    <div className="mt-3 mb-3">
      <h1 className="text-3xl font-bold mb-5">
        Citizenship and Personal Photo
      </h1>
      <hr className="mb-4" />
      <div>
        {images && (
          <div className="space-y-6 flex justify-between items-center">
            <div className="space-y-3">
              <p className="font-bold text-xl">Personal Photo</p>
              <Image
                src={images.personal_photo}
                alt="Image"
                width={250}
                height={250}
              />
            </div>
            <div className="space-y-3">
              <p className="font-bold text-xl">Citizenship Front Photo</p>
              <Image
                src={images.citizen_front}
                alt="Image"
                width={250}
                height={250}
              />
            </div>
            <div className="space-y-3">
              <p className="font-bold text-xl">Citizenship Back Photo</p>
              <Image
                src={images.citizen_back}
                alt="Image"
                width={250}
                height={250}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserImages;
