"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { IoReorderThree } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

import { FaUser } from "react-icons/fa";
import { AppDispatch, RootState } from "@/store/store";
import { logout } from "@/store/slice";

const Navbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [showMobileNavbar, setMobileNavbar] = useState(false);
  const closeNavbarMobile = useRef(null);
  const { validToken } = useSelector((state: RootState) => state.slice);
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const logoutUser = () => {
    dispatch(logout());
  };

  const navLists = [
    { name: "Home", path: "/" },
    { name: "Our Services", path: "/our-services" },
    { name: "Categories", path: "/categories" },
    { name: "Contact Us", path: "/contact-us" },
    { name: "Properties Available", path: "/properties" },
  ];

  const handleClickOutside = (e: Event) => {
    // Step 3: Close navbar if clicked outside
    if (
      closeNavbarMobile.current &&
      !closeNavbarMobile.current.contains(e.target)
    ) {
      setMobileNavbar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => handleClickOutside(e));
    return () => {
      document.removeEventListener("mousedown", (e) => handleClickOutside(e));
    };
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div>
      <div className="" ref={closeNavbarMobile}>
        <div className="  flex justify-between px-5 py-5 border border-b-2 shadow ">
          <p
            onClick={() => router.push("/")}
            className="md:text-xl sm:text-sm  max-sm:text-xl flex items-center gap-2 text-2xl  hover:text-[#4040c4] cursor-pointer transition-all ease-in-out duration-300 font-bold"
          >
            <IoHomeOutline /> Room Finder
          </p>
          <ul className="md:gap-3 md:text-sm sm:gap-2 sm:text-[12px] flex items-center  gap-5 cursor-pointer max-sm:hidden">
            {navLists.map((nav, i) => {
              return (
                <li
                  key={i}
                  className={
                    nav.path === pathName ? "text-blue-400" : "text-gray-500"
                  }
                  onClick={() => router.push(nav.path)}
                >
                  {nav.name}
                </li>
              );
            })}
          </ul>
          {validToken ? (
            <div className="relative" ref={menuRef}>
              <FaUser
                size={27}
                className="cursor-pointer text-blue-400"
                onClick={() => setOpen(!open)}
              />
              {open && (
                <div className="absolute w-32 top-4 right-4 border border-gray-200 rounded-md bg-blue-400 text-white  shadow-xl">
                  <ul>
                    <li className="text-sm px-5 py-1 cursor-pointer">
                      My Profile
                    </li>
                    <hr />
                    <li className="text-sm px-5 py-1 cursor-pointer">
                      Setting
                    </li>
                    <hr />
                    <li
                      className="text-sm px-5 py-1 cursor-pointer"
                      onClick={() => logoutUser()}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center gap-3 relative">
              <Button
                className=" md:w-20 sm:w-14 w-24 max-sm:hidden  bg-[#5151FF] hover:bg-[#4040c4]"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
              <Button
                className="sm:hidden bg-[#5151FF] hover:bg-[#4040c4] text-white"
                onClick={() => setMobileNavbar(!showMobileNavbar)}
              >
                <IoReorderThree />
              </Button>
              {/* Navbar for mobile */}
              {showMobileNavbar && (
                <div
                  className={`${
                    showMobileNavbar ? "-translate-x-0" : "-translate-x-full"
                  } absolute -right-6 -top-5 shadow-xl h-screen bg-white  w-64 sm:hidden transition-transform duration-300 ease-in-out `}
                >
                  <div className="px-5 py-5">
                    <div className="flex gap-2 ">
                      <Button
                        className=" md:w-20 sm:w-14 w-24 max-sm:w-14  bg-[#5151FF] hover:bg-[#4040c4]"
                        onClick={() => {
                          router.push("/login");
                          setMobileNavbar(!showMobileNavbar);
                        }}
                      >
                        Login
                      </Button>
                      <Button
                        className="bg-[#5151FF] hover:bg-[#4040c4]"
                        onClick={() => setMobileNavbar(!showMobileNavbar)}
                      >
                        <RxCross2 />
                      </Button>
                    </div>
                    <div className=" bg-white list-none flex flex-col gap-3 mt-5">
                      {navLists.map((nav, i) => {
                        return (
                          <li
                            key={i}
                            className={
                              nav.path === pathName
                                ? "text-blue-400"
                                : "text-gray-500"
                            }
                            onClick={() => {
                              router.push(nav.path);
                              setMobileNavbar(!showMobileNavbar);
                            }}
                          >
                            {nav.name}
                          </li>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
