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
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm min-w-[300px] transition-all">
        <div className="px-6 py-6 md:px-8 md:py-7">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">
            Decline Application Confirmation
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-5 md:mb-6">
            Are you sure you want to decline the given applicant?
          </p>
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 sm:space-x-0">
            <Button
              onClick={() => setPopup(false)}
              className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors w-full sm:w-auto text-sm md:text-base"
            >
              Cancel
            </Button>
            <Button
              onClick={() => deleteApplication()}
              className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors w-full sm:w-auto text-sm md:text-base"
            >
              Decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
