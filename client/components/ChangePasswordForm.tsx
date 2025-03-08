"use client";
import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { IoIosEyeOff } from "react-icons/io";

const ChangePasswordForm = () => {
  const [old, setOld] = useState<boolean>(false);
  const [newPass, setPass] = useState<boolean>(false);
  const [newPassConfirm, setNewPassConfirm] = useState<boolean>(false);

  return (
    <div className="mt-5">
      <h1 className="text-center font-bold text-2xl">Update Your Password</h1>
      <div className="py-10">
        <form className="space-y-5">
          <div className="space-y-1">
            <p>Old Password</p>
            <div className="relative">
              <input
                type={old ? "text" : "password"}
                placeholder="********"
                className="border border-gray-400 rounded-sm px-3 py-1 w-80"
              />
              <div className="absolute top-2 right-60">
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
          <div className="space-y-1">
            <p>New Password</p>
            <div className="relative">
              <input
                type={newPass ? "text" : "password"}
                placeholder="********"
                className="border border-gray-400 rounded-sm px-3 py-1 w-80"
              />
              <div className="absolute top-2 right-60">
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
          <div className="space-y-1">
            <p>Confirm Password</p>
            <div className="relative">
              <input
                type={newPassConfirm ? "text" : "password"}
                placeholder="********"
                className="border border-gray-400 rounded-sm px-3 py-1 w-80"
              />
              <div className="absolute top-2 right-60">
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
          <button
            type="submit"
            className="bg-blue-400 text-white px-5 py-1 rounded-md text-lg hover:bg-blue-500"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
