"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { IoReorderThree } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { RootState } from "@/store/store";

const Navbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [showMobileNavbar, setMobileNavbar] = useState(false);
  const closeNavbarMobile = useRef<HTMLDivElement>(null);
  const { validToken } = useSelector((state: RootState) => state.slice);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const logoutUser = () => {
    localStorage.removeItem("Token");
    router.push("/");
  };

  const navLists = [
    { name: "Home", path: "/" },
    { name: "Our Services", path: "/ourservices" },
    { name: "Categories", path: "/categories" },
    { name: "Contact Us", path: "/contactus" },
    { name: "Properties Available", path: "/properties" },
  ];

  const handleClickOutside = (e: MouseEvent) => {
    if (
      closeNavbarMobile.current &&
      !closeNavbarMobile.current.contains(e.target as Node)
    ) {
      setMobileNavbar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={closeNavbarMobile}>
      <div className="flex justify-between items-center px-4 md:px-6 lg:px-8 py-4 border-b-2 shadow-sm">
        {/* Logo */}
        <p
          onClick={() => router.push("/")}
          className="text-xl md:text-2xl flex items-center gap-2 hover:text-[#4040c4] cursor-pointer transition-colors duration-300 font-bold relative group"
        >
          <IoHomeOutline className="shrink-0" />
          <span className="hidden sm:inline">Room Finder</span>
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#4040c4] transition-all duration-300 group-hover:w-full"></span>
        </p>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-4 xl:gap-6 cursor-pointer">
          {navLists.map((nav) => (
            <li
              key={nav.path}
              className={`text-sm xl:text-base relative group ${
                nav.path === pathName ? "text-blue-400" : "text-gray-600"
              } hover:text-blue-500 transition-colors duration-300`}
              onClick={() => router.push(nav.path)}
            >
              {nav.name}
              <span
                className={`absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full ${
                  nav.path === pathName ? "w-full bg-blue-400" : ""
                }`}
              ></span>
            </li>
          ))}
        </ul>

        {/* Auth Section */}
        {validToken ? (
          <div className="relative" ref={menuRef}>
            <FaUser
              size={24}
              className="cursor-pointer text-blue-400 hover:text-blue-500 transition-colors relative group"
              onClick={() => setOpen(!open)}
            />
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            {open && (
              <div className="absolute right-0 top-8 w-40 border border-gray-200 rounded-lg bg-white shadow-xl z-50">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm relative group">
                    My Profile
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm relative group">
                    Settings
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-red-500 relative group"
                    onClick={logoutUser}
                  >
                    Logout
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              className="hidden lg:inline-flex bg-[#5151FF] hover:bg-[#4040c4] text-sm px-6 py-2 relative group overflow-hidden"
              onClick={() => router.push("/login")}
            >
              <span className="relative z-10">Login</span>
              <span className="absolute inset-0 w-0 bg-[#4040c4] transition-all duration-300 group-hover:w-full"></span>
            </Button>
            <Button
              className="lg:hidden bg-[#5151FF] hover:bg-[#4040c4] p-2 relative overflow-hidden group"
              onClick={() => setMobileNavbar(!showMobileNavbar)}
            >
              <IoReorderThree className="text-xl text-white relative z-10" />
              <span className="absolute inset-0 w-0 bg-[#4040c4] transition-all duration-300 group-hover:w-full"></span>
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {showMobileNavbar && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <Button
                  className="bg-[#5151FF] hover:bg-[#4040c4] px-6 relative overflow-hidden group"
                  onClick={() => {
                    router.push("/login");
                    setMobileNavbar(false);
                  }}
                >
                  <span className="relative z-10">Login</span>
                  <span className="absolute inset-0 w-0 bg-[#4040c4] transition-all duration-300 group-hover:w-full"></span>
                </Button>
                <Button
                  variant="ghost"
                  className="p-2 hover:bg-gray-100"
                  onClick={() => setMobileNavbar(false)}
                >
                  <RxCross2 className="text-xl" />
                </Button>
              </div>
              <ul className="space-y-4">
                {navLists.map((nav) => (
                  <li
                    key={nav.path}
                    className={`text-base relative group ${
                      nav.path === pathName ? "text-blue-400" : "text-gray-600"
                    } hover:text-blue-500 transition-colors duration-300`}
                    onClick={() => {
                      router.push(nav.path);
                      setMobileNavbar(false);
                    }}
                  >
                    {nav.name}
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full ${
                        nav.path === pathName ? "w-full bg-blue-400" : ""
                      }`}
                    ></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
