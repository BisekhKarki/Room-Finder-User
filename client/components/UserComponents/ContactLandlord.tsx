"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { base_url } from "@/constants/BaseUrl";

interface Props {
  landlordEmail: string;
  landlordName: string;
}

const ContactLandlord = ({ landlordEmail, landlordName }: Props) => {
  const [first, setFirst] = useState<string>("");
  const [last, setLast] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!first || !last || !email) {
        toast.error("Fill all the details");
        return;
      }

      if (phone.length < 10) {
        toast.error("Phone Number must be of 10 digits");
        return;
      }

      if (message.length < 10) {
        toast.error("Enter message of at least 10 characters");
        return;
      }

      const response = await fetch(`${base_url}/ContactUs/message/from/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first,
          last,
          phone,
          message,
          userEmail: email,
          landlordEmail,
          landlordName,
        }),
      });
      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setFirst("");
        setLast("");
        setPhone("");
        setEmail("");
        setMessage("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 md:px-10 py-8 md:py-10">
      <div className="border border-gray-200 px-4 md:px-8 py-6 md:py-8 flex justify-center rounded-md">
        <form className="mb-2 px-4 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6 w-full md:w-3/4">
          <h1 className="text-center text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Send a message to {landlordName}
          </h1>

          <div className="flex flex-col md:flex-row gap-3 md:gap-5">
            <Input
              placeholder="First Name"
              className="h-9 md:h-10"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
            <Input
              placeholder="Last Name"
              className="h-9 md:h-10"
              value={last}
              onChange={(e) => setLast(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-5">
            <Input
              placeholder="Mobile No."
              className="h-9 md:h-10"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              placeholder="Email"
              className="h-9 md:h-10"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Textarea
            placeholder="Enter your message here"
            className="h-32 md:h-24"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button
            type="submit"
            className="w-full bg-blue-400 hover:bg-blue-500 text-sm md:text-base"
            onClick={(e) => sendMessage(e)}
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactLandlord;
