import React from "react";

const Footer = () => {
  return (
    <div className="text-gray-400 text-center py-4 md:py-5 border-t border-gray-200 shadow-md flex flex-wrap gap-1 md:gap-2 justify-center items-center px-4 text-sm md:text-base">
      &copy; {new Date().getFullYear()} Room Finder
      <span className="whitespace-nowrap">All Rights Reserved</span>
    </div>
  );
};

export default Footer;
