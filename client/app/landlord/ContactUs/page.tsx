"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { base_url } from "@/constants/BaseUrl";
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

      const response = await fetch(`${base_url}/ContactUs/send/message`, {
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
      });
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
    <div className="min-h-screen">
      {/* Contact Info Section */}
      <div className="flex justify-center py-6 md:py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl border rounded-md shadow-sm">
          <h1 className="w-full bg-blue-400 text-white text-center px-4 py-3 font-bold text-xl md:text-2xl lg:text-3xl rounded-t-md">
            Get in touch with us
          </h1>

          <div className="flex flex-col space-y-3 md:space-y-4 mt-4 mb-4 px-4 md:px-6">
            <div className="flex gap-2 justify-center items-center">
              <FaPhone className="text-blue-500 text-lg md:text-xl" />
              <p className="text-sm md:text-base text-gray-600">
                +977 9876543210
              </p>
            </div>

            <div className="flex gap-2 justify-center items-center">
              <IoMail className="text-blue-500 text-lg md:text-xl" />
              <p className="text-sm md:text-base text-gray-600 break-all">
                RoomFinder@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="flex justify-center mb-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl shadow-md rounded-md">
          <h1 className="w-full bg-blue-400 text-white text-center px-4 py-3 font-bold text-xl md:text-2xl lg:text-3xl rounded-t-md">
            Contact Us
          </h1>

          <p className="py-3 px-4 md:px-6 text-sm md:text-base text-gray-600">
            Have questions or need assistance? We are here to help! Reach out
            through our form below and we will respond promptly.
          </p>

          <hr className="mb-4 mt-2" />

          <form className="mb-2 px-4 md:px-6 lg:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
            <div className="flex flex-col md:flex-row gap-3 md:gap-5">
              <Input
                placeholder="First Name"
                className="h-10 md:h-12"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
              />
              <Input
                placeholder="Last Name"
                className="h-10 md:h-12"
                value={last}
                onChange={(e) => setLast(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:gap-5">
              <Input
                placeholder="Mobile No."
                className="h-10 md:h-12"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input
                placeholder="Email"
                className="h-10 md:h-12"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Textarea
              placeholder="Enter your message here"
              className="h-32 md:h-40"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button
              type="submit"
              className="w-full bg-blue-400 hover:bg-blue-500 h-12 text-sm md:text-base"
              onClick={(e: React.FormEvent) => sendMessage(e)}
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
