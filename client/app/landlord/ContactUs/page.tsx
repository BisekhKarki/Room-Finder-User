"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaPhone } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

const Page = () => {
  const [first, setFirst] = useState<string>("");
  const [last, setLast] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const sendMessage = async (e: Event) => {
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

      const response = await fetch(
        "http://localhost:4000/api/ContactUs/send/message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first,
            last,
            email,
            phone,
            message,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
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
    <div>
      <div className="flex justify-center py-10">
        <div className="w-5/6 border rounded-md">
          <h1 className="w-full bg-blue-400 text text-white text-center px-4 py-3 font-bold text-2xl rounded-t-xl">
            Get in touch with us
          </h1>

          <div className="flex flex-col justify-center mt-3 mb-3">
            <div className="flex gap-2 justify-center text-center items-center">
              <FaPhone className="text-blue-500 " />
              <p className="text-base text-gray-500">Phone: +977 9876543210</p>
            </div>

            <div className="flex gap-2 justify-center text-center items-center">
              <IoMail className="text-blue-500 text-xl" />
              <p className="text-base text-gray-500">
                Email: RoomFinder@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-10">
        <div className="w-2/3 shadow-md rounded-md">
          <h1 className="w-full bg-blue-400 text text-white text-center px-4 py-3 font-bold text-3xl rounded-t-xl">
            Contact Us
          </h1>
          <p className="py-3 px-6 text-gray-500">
            Have questions or need assistance? We're here to help! Reach out to
            our friendly team through our Contact Us page. Whether you're
            looking for more information, have feedback, or need support, we're
            just a message away. Fill out the form below, and we'll get back to
            you promptly. Your satisfaction is our priority!
          </p>
          <hr className="mb-5 mt-2 w-full" />
          <form className="mb-2 px-10 py-5 space-y-6">
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
    </div>
  );
};

export default Page;
