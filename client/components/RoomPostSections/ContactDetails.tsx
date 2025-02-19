"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RxArrowLeft } from "react-icons/rx";
import { BsSave } from "react-icons/bs";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { contactDetails } from "@/store/form";
import { FaMoneyBill } from "react-icons/fa";

interface Props {
  counter: number;
  setCounter: (index: number) => void;
}

const ContactDeatils = ({ counter, setCounter }: Props) => {
  const [userName, setUserName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [landlordId, setLandlordId] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getUserId = localStorage.getItem("userId");
    if (getUserId) {
      const id = JSON.parse(getUserId);
      setLandlordId(id);
    }
  }, []);

  // Room Every Details
  const [basic, setBasic] = useState<Array<string>>([]);
  const [location, setLocation] = useState<Array<string>>([]);
  const [features, setFeatures] = useState<Array<string>>([]);
  const [images, setImages] = useState<Array<string>>([]);

  useEffect(() => {
    const basicDetails = localStorage.getItem("Post_Basic");
    const locationDetails = localStorage.getItem("Post_Location");
    const featureDetails = localStorage.getItem("Post_Features");
    const imageDetails = localStorage.getItem("Post_Images");

    if (basicDetails && locationDetails && featureDetails && imageDetails) {
      const getBasic = JSON.parse(basicDetails);
      const getLocation = JSON.parse(locationDetails);
      const getFeatures = JSON.parse(featureDetails);
      const getImages = JSON.parse(imageDetails);

      setBasic(getBasic);
      setLocation(getLocation);
      setFeatures(getFeatures);
      setImages(getImages);
    }
  }, []);

  useEffect(() => {
    const getContactFromLocalStorage = localStorage.getItem("Post_Contact");

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
    dispatch(
      contactDetails({
        username: userName,
        phone,
        email,
      })
    );
    localStorage.setItem("Last_Page", JSON.stringify(counter));
  };

  const sendForApproval = async () => {
    setUserContact();

    try {
      if (landlordId) {
        const response = await fetch(
          "http://localhost:4000/api/rooms/approval",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
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
              landlordId: landlordId,
            }),
          }
        );

        console.log({
          basic,
          location,
          features,
          images,
          contact: {
            username: userName,
            email,
            phone,
          },
          landlordId: landlordId,
        });
        const val = await response.json();
        if (val.success) {
          toast.success(val.message);
          localStorage.removeItem("Last_Page");
          localStorage.removeItem("Post_Basic");
          localStorage.removeItem("Post_Contact");
          localStorage.removeItem("Post_Images");
          localStorage.removeItem("Post_Location");
          localStorage.removeItem("Post_Features");
        } else {
          toast.error(val.message);
        }
      }
    } catch (error: any) {
      toast.error("Internal Server Error");
    }
  };

  return (
    <div>
      <div className="flex gap-5 mb-5">
        <Input
          placeholder="Your Name"
          className="h-12"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          placeholder="Your contact Number"
          className="h-12"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="flex gap-5 mb-5">
        <Input
          placeholder="Email"
          className="h-12"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex gap-5 justify-center">
        <Button
          type="button"
          className="mt-5 bg-blue-400 hover:bg-blue-500 w-32"
          onClick={() => {
            if (!user || !phone || !email) {
              toast.error("Fill all the details to procced next");
            }
            dispatch(
              contactDetails({
                username: userName,
                phone,
                email,
              })
            );
            setCounter(counter - 1);
            localStorage.setItem("Last_Page", JSON.stringify(counter - 1));
          }}
        >
          <RxArrowLeft /> Previous
        </Button>
        <Button
          type="button"
          className="mt-5 bg-green-600 hover:bg-green-700 w-32"
          onClick={() => sendForApproval()}
        >
          <BsSave /> Save
        </Button>
        <Button
          type="button"
          className="mt-5 bg-purple-600 hover:bg-purple-700 w-36"
          onClick={() => setUserContact()}
        >
          <FaMoneyBill /> Make Payment
        </Button>
      </div>
    </div>
  );
};

export default ContactDeatils;
