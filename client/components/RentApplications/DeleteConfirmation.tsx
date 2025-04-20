"use client";

import { base_url } from "@/constants/BaseUrl";
import React from "react";
import toast from "react-hot-toast";
import { SingleTenantApplication } from "./SingleApplication";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface Props {
  Application: SingleTenantApplication | null;
  token: string | undefined;
  setPopup: (value: boolean) => void;
}

const DeleteConfirmation = ({ Application, token, setPopup }: Props) => {
  const router = useRouter();
  const deleteApplication = async () => {
    try {
      const response = await fetch(
        `${base_url}/rooms/rent/tenant/single/application/decline`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            roomId: Application?.roomId,
            landlordId: Application?.landlordId,
            userId: Application?.tenantId,
          }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message);
        router.push(`/landlord/MyRooms/${Application?.roomId}`);
      } else {
        toast.error(data.message);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  return (
    <div className="inset-0 bg-opacity-40 fixed  flex justify-center items-center bg-black  z-50">
      <div className="bg-white px-10 py-5 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 ">
          Decline Application Confirmation
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to decline the given applicant
        </p>
        <div className="flex justify-end space-x-3">
          <Button
            onClick={() => setPopup(false)}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200  transition"
          >
            Cancel
          </Button>
          <Button
            onClick={() => deleteApplication()}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700  transition"
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
