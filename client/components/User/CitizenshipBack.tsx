"use client";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, Upload } from "lucide-react";

interface Props {
  setCitizenshipBack: (citizenshipBack: string) => void;
}

const CitizenshipBack = ({ setCitizenshipBack }: Props) => {
  const [publicId, setPublicId] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);

  return (
    <div className="w-full space-y-3">
      {publicId && (
        <CldImage
          src={publicId}
          alt="Citizenship Back"
          width={500}
          height={300}
          className="w-full h-auto rounded-md border"
        />
      )}
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
        onSuccess={({ event, info }) => {
          if (event === "success" && typeof info !== "string" && info?.url) {
            setCitizenshipBack(info.url);
            setPublicId(info.public_id);
          }
          setUploading(false);
        }}
      >
        {({ open }) => (
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 px-4 py-2 text-xs md:text-sm"
            type="button"
            onClick={() => {
              setUploading(true);
              open();
            }}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span className="hidden xs:inline">Citizenship Back</span>
              </>
            )}
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default CitizenshipBack;
