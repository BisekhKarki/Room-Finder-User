"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import services from "@/constants/Services";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div>
      <Navbar />
      <div className="px-10 py-10">
        <h1 className="text-4xl font-bold">Our Services</h1>
        <p className="w-2/3 mt-7 text-gray-500">
          At Room Finder, we simplify your search for the perfect space. Whether
          you are looking to rent a room, post a vacancy, make secure online
          payments, or find accommodations tailored to your interests, we have
          got you covered. Our platform is designed to connect you with the
          right options effortlessly, ensuring a seamless and personalized
          experience every step of the way. Let us help you find your ideal
          space today!
        </p>

        <div className="flex flex-col justify-center items-center mt-10 gap-10">
          {services.map(
            ({ title, description, tagline, image, alt, reverse }, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row ${
                  reverse ? "md:flex-row-reverse" : ""
                } border-t-2 items-center gap-20 shadow-md hover:shadow-xl hover:cursor-pointer rounded-md p-5`}
              >
                <Image
                  src={image}
                  alt={alt}
                  width={500}
                  height={400}
                  className="rounded-lg"
                />
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold">{title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{tagline}</p>
                  <p className="mt-2 text-gray-700">{description}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
