"use client";

import Footer from "@/components/Footer";
// import HomeProperties from "@/components/HomeProperties";
import Navbar from "@/components/Navbar";
import React from "react";
import dynamic from "next/dynamic";

const HomeProperties = dynamic(() => import("@/components/HomeProperties"), {
  ssr: false,
});

const Page = () => {
  return (
    <div>
      <Navbar />
      <HomeProperties />
      <Footer />
    </div>
  );
};

export default Page;
