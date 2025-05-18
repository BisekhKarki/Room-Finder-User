"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { RxArrowLeft } from "react-icons/rx";
import { BsSave } from "react-icons/bs";
import { Input } from "../../ui/input";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { base_url } from "@/constants/BaseUrl";
import { GetToken } from "@/constants/GetToken";

interface Props {
  counter: number;
  setCounter: (index: number) => void;
}

interface PinnedLocationProps {
  locationName: string;
  latitude: number;
  longitude: number;
}

const EditContactDeatils = ({ counter, setCounter }: Props) => {
  const [userName, setUserName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const router = useRouter();
  const gettoken = GetToken();

  useEffect(() => {
    if (gettoken) {
      setToken(gettoken);
    }
  }, [gettoken]);

  // Room Every Details
  const [basic, setBasic] = useState<Array<string>>([]);
  const [location, setLocation] = useState<Array<string>>([]);
  const [features, setFeatures] = useState<Array<string>>([]);
  const [images, setImages] = useState<Array<string>>([]);
  const [pinnedLocation, setPinnedLocation] =
    useState<PinnedLocationProps | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const basicDetails = localStorage.getItem("Edit_Post_Basic");
    const locationDetails = localStorage.getItem("Edit_Post_location");
    const featureDetails = localStorage.getItem("Edit_Post_features");
    const imageDetails = localStorage.getItem("Edit_Post_images");
    const pinnedLocationMap = localStorage.getItem("Edit_Pinned_Location");

    if (
      basicDetails &&
      locationDetails &&
      featureDetails &&
      imageDetails &&
      pinnedLocationMap
    ) {
      const getBasic = JSON.parse(basicDetails);
      const getLocation = JSON.parse(locationDetails);
      const getFeatures = JSON.parse(featureDetails);
      const getImages = JSON.parse(imageDetails);
      const getPinned = JSON.parse(pinnedLocationMap);

      setBasic(getBasic);
      setLocation(getLocation);
      setFeatures(getFeatures);
      setImages(getImages);
      setPinnedLocation({
        locationName: getPinned.pinned_Location,
        latitude: getPinned.latitude,
        longitude: getPinned.longitude,
      });
    }
  }, []);

  useEffect(() => {
    const getContactFromLocalStorage =
      localStorage.getItem("Edit_Post_contact");

    if (getContactFromLocalStorage && getContactFromLocalStorage?.length > 1) {
      const details = JSON.parse(getContactFromLocalStorage);
      setUserName(details?.username);
      setPhone(details?.phone);
      setEmail(details?.email);
    }
  }, []);

  const setUserContact = () => {
    if (!userName || !phone || !email) {
      toast.error("Fill all the details to procced next");
    }
    const contactDetails = {
      username: userName,
      phone,
      email,
    };
    localStorage.setItem("Edit_Post_contact", JSON.stringify(contactDetails));
    localStorage.setItem("Edit_Last_Page", JSON.stringify(counter));
  };

  const sendForApproval = async () => {
    setUserContact();
    if (!token) return toast.error("No token provided");

    try {
      const response = await fetch(
        `${base_url}/posted/edit/room/details/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            basic,
            location,
            features,
            images,
            contact: {
              username: userName,
              email,
              phone,
            },
            pinnedLocation,
          }),
        }
      );

      const val = await response.json();
      if (val.success) {
        toast.success(val.message);
        localStorage.removeItem("Edit_Last_Page");
        localStorage.removeItem("Edit_Post_Basic");
        localStorage.removeItem("Edit_Post_contact");
        localStorage.removeItem("Edit_Post_images");
        localStorage.removeItem("Edit_Post_location");
        localStorage.removeItem("Edit_Post_features");
        setUserName("");
        setEmail("");
        setPhone("");
        router.push(`/landlord/MyRooms`);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  return (
    <div className="px-4 md:px-0 space-y-4">
      {/* Name & Contact Number */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Your Name"
          className="h-12 w-full"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          placeholder="Your Contact Number"
          className="h-12 w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="w-full">
        <Input
          placeholder="Email"
          className="h-12 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
        <Button
          type="button"
          className="bg-blue-400 hover:bg-blue-500 w-full md:w-32"
          onClick={() => {
            if (!userName || !phone || !email) {
              toast.error("Fill all the details to proceed");
              return;
            }
            setCounter(counter - 1);
            localStorage.setItem("Last_Page", JSON.stringify(counter - 1));
          }}
        >
          <RxArrowLeft className="mr-2" /> Previous
        </Button>
        <Button
          type="button"
          className="bg-green-600 hover:bg-green-700 w-full md:w-32"
          onClick={() => sendForApproval()}
        >
          <BsSave className="mr-2" /> Save
        </Button>
      </div>
    </div>
  );
};

export default EditContactDeatils;
