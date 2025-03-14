import { CldImage, CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, Upload } from "lucide-react";

interface Props {
  setPersonalphoto: (personalphoto: string) => void;
}

const PersonalPhoto = ({ setPersonalphoto }: Props) => {
  const [publicId, setPublicId] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);

  return (
    <div>
      {publicId && (
        <CldImage src={publicId} alt={publicId} width={"500"} height={"500"} />
      )}
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
        onSuccess={({ event, info }) => {
          if (event === "success" && typeof info !== "string" && info?.url) {
            setPersonalphoto(info.url);
            setPublicId(info.public_id);
          }
          setUploading(false);
        }}
      >
        {({ open }) => (
          <Button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white flex items-center gap-2 px-6 py-3 rounded-lg shadow-md transition-all"
            type="button"
            onClick={() => open()}
          >
            {uploading ? (
              <>
                <Loader2 className="animate-spin " /> uploadng...
              </>
            ) : (
              <>
                <Upload /> Upload your recent photo
              </>
            )}
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default PersonalPhoto;
