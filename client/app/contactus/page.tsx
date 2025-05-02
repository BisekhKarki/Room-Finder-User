"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { base_url } from "@/constants/BaseUrl";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaPhone } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

const Page = () => {
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { first, last, email, phone, message } = formData;

      if (!first || !last || !email) {
        toast.error("Please fill all required fields");
        return;
      }

      if (phone && phone.length < 10) {
        toast.error("Phone number must be 10 digits");
        return;
      }

      if (message.length < 10) {
        toast.error("Message must be at least 10 characters");
        return;
      }

      const response = await fetch(`${base_url}/ContactUs/send/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setFormData({
          first: "",
          last: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(data.message || "Error sending message");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to send message");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Contact Info Section */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="mx-auto max-w-4xl bg-white rounded-lg shadow-sm">
            <h1 className="bg-blue-400 text-white text-xl md:text-2xl font-bold text-center p-4 md:p-6 rounded-t-lg">
              Get in touch with us
            </h1>

            <div className="space-y-4 p-6 md:p-8">
              <div className="flex items-center gap-3 text-gray-600">
                <FaPhone className="flex-shrink-0 text-blue-500" />
                <span className="text-sm md:text-base">+977 9876543210</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <IoMail className="flex-shrink-0 text-blue-500 text-lg" />
                <span className="text-sm md:text-base">
                  RoomFinder@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="container mx-auto px-4 pb-12">
          <div className="mx-auto max-w-4xl bg-white rounded-lg shadow-sm">
            <h2 className="bg-blue-400 text-white text-xl md:text-2xl font-bold text-center p-4 md:p-6 rounded-t-lg">
              Contact Us
            </h2>

            <div className="p-6 md:p-8">
              <p className="text-gray-600 text-sm md:text-base mb-6">
                Have questions or need assistance? We are here to help! Reach
                out to our friendly team through our Contact Us page. Whether
                you are looking for information, have feedback, or need support,
                we are just a message away.
              </p>

              <form onSubmit={sendMessage} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="first"
                    placeholder="First Name"
                    value={formData.first}
                    onChange={handleChange}
                    className="h-12"
                    required
                  />
                  <Input
                    name="last"
                    placeholder="Last Name"
                    value={formData.last}
                    onChange={handleChange}
                    className="h-12"
                    required
                  />
                  <Input
                    name="phone"
                    placeholder="Mobile No. (optional)"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-12"
                  />
                  <Input
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12"
                    required
                  />
                </div>

                <Textarea
                  name="message"
                  placeholder="Enter your message here"
                  value={formData.message}
                  onChange={handleChange}
                  className="min-h-[150px]"
                  required
                />

                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-400 hover:bg-blue-500 text-lg"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
