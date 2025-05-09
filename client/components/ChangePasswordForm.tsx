"use client";
import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { IoIosEyeOff } from "react-icons/io";

const ChangePasswordForm = () => {
  const [old, setOld] = useState<boolean>(false);
  const [newPass, setPass] = useState<boolean>(false);
  const [newPassConfirm, setNewPassConfirm] = useState<boolean>(false);

  return (
    <div className="mt-5 px-4">
      <h1 className="text-center font-bold text-xl md:text-2xl lg:text-3xl">
        Update Your Password
      </h1>
      <div className="py-8 md:py-12 flex justify-center">
        <form className="space-y-6 w-full max-w-md">
          <div className="space-y-2">
            <p className="text-sm md:text-base">Old Password</p>
            <div className="relative">
              <input
                type={old ? "text" : "password"}
                placeholder="********"
                className="border border-gray-400 rounded-sm px-3 py-2.5 w-full pr-10 text-sm md:text-base"
              />
              <div className="absolute top-3.5 right-3">
                {old ? (
                  <BsEye
                    onClick={() => setOld(false)}
                    className="h-5 w-5 text-gray-500 cursor-pointer"
                  />
                ) : (
                  <IoIosEyeOff
                    onClick={() => setOld(true)}
                    className="h-5 w-5 text-gray-500 cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm md:text-base">New Password</p>
            <div className="relative">
              <input
                type={newPass ? "text" : "password"}
                placeholder="********"
                className="border border-gray-400 rounded-sm px-3 py-2.5 w-full pr-10 text-sm md:text-base"
              />
              <div className="absolute top-3.5 right-3">
                {newPass ? (
                  <BsEye
                    onClick={() => setPass(false)}
                    className="h-5 w-5 text-gray-500 cursor-pointer"
                  />
                ) : (
                  <IoIosEyeOff
                    onClick={() => setPass(true)}
                    className="h-5 w-5 text-gray-500 cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm md:text-base">Confirm Password</p>
            <div className="relative">
              <input
                type={newPassConfirm ? "text" : "password"}
                placeholder="********"
                className="border border-gray-400 rounded-sm px-3 py-2.5 w-full pr-10 text-sm md:text-base"
              />
              <div className="absolute top-3.5 right-3">
                {newPassConfirm ? (
                  <BsEye
                    onClick={() => setNewPassConfirm(false)}
                    className="h-5 w-5 text-gray-500 cursor-pointer"
                  />
                ) : (
                  <IoIosEyeOff
                    onClick={() => setNewPassConfirm(true)}
                    className="h-5 w-5 text-gray-500 cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="bg-blue-400 text-white px-8 py-2.5 rounded-md w-full md:w-auto text-sm md:text-base hover:bg-blue-500 transition-colors"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
