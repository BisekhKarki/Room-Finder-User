"use client";

import React from "react";
import { SingleTenantApplication } from "./SingleApplication";
import { Button } from "../ui/button";

interface Props {
  Application: SingleTenantApplication | null;
  token: string | undefined;
  setRemove: (value: boolean) => void;
}

const RemoveTenantsPopup = ({ Application, token, setRemove }: Props) => {
  console.log({
    Application,
    token,
  });

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-40 bg-black">
      <div className="bg-white px-10 py-5 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 ">
          Decline Application Confirmation
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to decline the given applicant
        </p>
        <div className="flex justify-end space-x-3">
          <Button
            onClick={() => setRemove(false)}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200  transition"
          >
            Cancel
          </Button>
          <Button
            // onClick={() => deleteApplication()}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700  transition"
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RemoveTenantsPopup;
