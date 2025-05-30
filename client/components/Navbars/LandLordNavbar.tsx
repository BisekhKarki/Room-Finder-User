"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { IoReorderThree } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { AppDispatch, RootState } from "@/store/store";
import { logout } from "@/store/slice";
import Image from "next/image";
import logo from "@/public/assets/Logo.png";
import toast from "react-hot-toast";

const LandlordNavbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [showMobileNavbar, setMobileNavbar] = useState(false);
  const closeNavbarMobile = useRef<HTMLDivElement>(null);
  const { validToken } = useSelector((state: RootState) => state.slice);
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const logoutUser = () => {
    localStorage.removeItem("Token");

    toast.success("You have been logged out");
    dispatch(logout());
    router.push("/");
  };

  const navLists = [
    { name: "Our Services", path: "/landlord/OurServices" },
    { name: "Post Rooms", path: "/landlord/RoomsPosting" },
    { name: "Contact Us", path: "/landlord/ContactUs" },
    { name: "Pending Rooms", path: "/landlord/PendingRooms" },
    { name: "My Rooms", path: "/landlord/MyRooms" },
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
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div ref={closeNavbarMobile}>
      <div className="flex justify-between items-center px-4 md:px-6 lg:px-8 py-4 border-b-2 shadow-sm">
        {/* Logo */}
        <Image
          src={logo}
          alt="Company Logo"
          className="w-16 h-12 md:w-14 md:h-12 flex-shrink-0"
          width={50}
          height={50}
          priority
        />

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navLists.map((nav) => (
            <li
              key={nav.path}
              className={`relative text-sm xl:text-base px-3 py-1 cursor-pointer ${
                nav.path === pathName
                  ? "text-blue-400 after:scale-x-100"
                  : "text-gray-600 after:scale-x-0"
              } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-400 after:transition-transform after:duration-300 after:origin-center hover:after:scale-x-100`}
              onClick={() => router.push(nav.path)}
            >
              {nav.name}
            </li>
          ))}
        </ul>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {validToken ? (
            <div className="hidden lg:block relative" ref={menuRef}>
              <FaUser
                size={24}
                className="cursor-pointer text-blue-400 hover:text-blue-500 transition-colors"
                onClick={() => setOpen(!open)}
              />
              {open && (
                <div className="absolute right-0 top-8 w-40 border border-gray-200 rounded-lg bg-white shadow-xl z-50">
                  <p
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm rounded-md transition-colors"
                    onClick={() => router.push("/landlord/MyProfile")}
                  >
                    My Profile
                  </p>
                  <hr />
                  <p
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm rounded-md transition-colors"
                    onClick={() => router.push("/landlord/RulesAndRegulation")}
                  >
                    Rules
                  </p>

                  <hr />
                  <p
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-red-500 rounded-md transition-colors"
                    onClick={logoutUser}
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          ) : (
            <Button
              className="hidden lg:inline-flex bg-[#5151FF] hover:bg-[#4040c4] text-sm px-6 py-2"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button
            className="lg:hidden bg-[#5151FF] hover:bg-[#4040c4] p-2"
            onClick={() => setMobileNavbar(true)}
          >
            <IoReorderThree className="text-xl text-white" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {showMobileNavbar && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                {!validToken && (
                  <Button
                    className="bg-[#5151FF] hover:bg-[#4040c4] px-6"
                    onClick={() => {
                      router.push("/login");
                      setMobileNavbar(false);
                    }}
                  >
                    Login
                  </Button>
                )}
                <Button
                  variant="ghost"
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  onClick={() => setMobileNavbar(false)}
                >
                  <RxCross2 className="text-xl" />
                </Button>
              </div>
              <ul className="space-y-4">
                {navLists.map((nav) => (
                  <li
                    key={nav.path}
                    className={`relative text-base px-4 py-2 cursor-pointer ${
                      nav.path === pathName
                        ? "text-blue-400 after:scale-x-100"
                        : "text-gray-600 after:scale-x-0"
                    } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-400 after:transition-transform after:duration-300 after:origin-center hover:after:scale-x-100`}
                    onClick={() => {
                      router.push(nav.path);
                      setMobileNavbar(false);
                    }}
                  >
                    {nav.name}
                  </li>
                ))}
                {validToken && (
                  <>
                    <li
                      className="relative text-base px-4 py-2 cursor-pointer text-gray-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-400 after:transition-transform after:duration-300 after:origin-center after:scale-x-0 hover:after:scale-x-100"
                      onClick={() => {
                        router.push("/landlord/MyProfile");
                        setMobileNavbar(false);
                      }}
                    >
                      My Profile
                    </li>
                    <li
                      className="relative text-base px-4 py-2 cursor-pointer text-red-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-red-500 after:transition-transform after:duration-300 after:origin-center after:scale-x-0 hover:after:scale-x-100"
                      onClick={() => {
                        logoutUser();
                        setMobileNavbar(false);
                      }}
                    >
                      Logout
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandlordNavbar;
