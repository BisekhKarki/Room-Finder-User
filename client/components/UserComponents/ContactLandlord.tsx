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

  console.log(landlordName);

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
        toast.error("Enter message of at least 1- characters");
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
    <div className="px-10 py-10">
      <div className="border border-gray-200 px-10 py-5 flex justify-center rounded-md">
        <form className="mb-2 px-10 py-5 space-y-6 w-3/4">
          <h1 className="text-center text-3xl font-bold mb-2">
            Send a message to {landlordName}
          </h1>
          <div className="flex gap-5">
            <Input
              placeholder="First Name"
              className="h-10"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
            <Input
              placeholder="Last Name"
              className="h-10"
              value={last}
              onChange={(e) => setLast(e.target.value)}
            />
          </div>
          <div className="flex gap-5">
            <Input
              placeholder="Mobile No."
              className="h-10"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              placeholder="Email"
              className="h-10"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Textarea
            placeholder="Enter you message here"
            className="h-24"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type="submit"
            className="w-full bg-blue-400 hover:bg-blue-500 "
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
