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
  const [user, setUser] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getContactFromLocalStorage = localStorage.getItem("Post_Contact");
    console.log(getContactFromLocalStorage);
    if (getContactFromLocalStorage && getContactFromLocalStorage?.length > 1) {
      const details = JSON.parse(getContactFromLocalStorage);
      setUser(details?.username);
      setPhone(details?.phone);
      setEmail(details?.email);
    }
  }, []);

  const setUserContact = () => {
    if (!user || !phone || !email) {
      toast.error("Fill all the details to procced next");
    }
    dispatch(
      contactDetails({
        username: user,
        phone,
        email,
      })
    );
    localStorage.setItem("Last_Page", JSON.stringify(counter));
  };

  return (
    <div>
      <div className="flex gap-5 mb-5">
        <Input
          placeholder="Your Name"
          className="h-12"
          value={user}
          onChange={(e) => setUser(e.target.value)}
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
            setCounter(counter - 1);
            localStorage.setItem("Last_Page", JSON.stringify(counter - 1));
          }}
        >
          <RxArrowLeft /> Previous
        </Button>
        <Button
          type="button"
          className="mt-5 bg-green-600 hover:bg-green-700 w-32"
          onClick={() => setUserContact()}
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
