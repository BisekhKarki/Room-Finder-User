"use client";
import React from "react";
import PersonalDetails from "./ApplicationsDetails/PersonalDetails";
import EmploymentAndIncome from "./ApplicationsDetails/EmploymentAndIncome";
import RentalHistory from "./ApplicationsDetails/RentalHistory";
import EmergencyContactDetails from "./ApplicationsDetails/EmergencyContactDetails";
import UserImages from "./ApplicationsDetails/UserImages";
import { Button } from "../ui/button";

import { IoIosArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";
import { base_url } from "@/constants/BaseUrl";

interface SingleTenantApplication {
  _id: string;
  accepted: boolean;
  createdAt: string;
  updatedAt: string;
  tenantId: string;
  landlordId: string;
  roomId: string;
  __v: number;
  personalDetails: {
    fullName: string;
    email: string;
    personalContact?: string;
    age: string;
    numberOfRenters: string;
    permanentAddress: string;
    marital_status: string;
  };
  employment_and_income: {
    job: string;
    income: string;
  };
  emergency_contact_details: {
    name: string;
    contact: string;
    relationship: string;
    alternateContact?: string;
  };
  rental_history: {
    previous_address: string;
    length_of_stay: string;
    current_landlord_contact: string;
    reason_for_leave: string;
    criminal_record: string;
  };
  images: {
    citizen_front: string;
    citizen_back: string;
    personal_photo: string;
  };
}

interface Props {
  Application: SingleTenantApplication | null;
  setShowSingle: (val: boolean) => void;
  showSingle: boolean;
  token: string;
}

const SingleApplication = ({ Application, setShowSingle, token }: Props) => {
  const approveApplication = async () => {
    try {
      const response = await fetch(
        `${base_url}/rooms/rent/tenant/single/application/approval/accept`,
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
      } else {
        toast.error(data.message);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  return (
    <div>
      <div className="text-2xl mb-5 flex items-center gap-1">
        <IoIosArrowRoundBack
          className=" text-gray-800 cursor-pointer"
          onClick={() => setShowSingle(false)}
        />
        <p
          className="text-base cursor-pointer"
          onClick={() => setShowSingle(false)}
        >
          Back
        </p>
      </div>

      {Application && (
        <div className="space-y-10 mt-10 mb-10">
          <PersonalDetails Personal_Details={Application.personalDetails} />
          <EmploymentAndIncome
            IncomeDetails={Application.employment_and_income}
          />
          <RentalHistory History={Application.rental_history} />
          <EmergencyContactDetails
            emergency={Application.emergency_contact_details}
          />
          <UserImages images={Application.images} />
        </div>
      )}
      <div className="mt-5">
        <Button
          className=" w-1/4 bg-blue-500 hover:bg-blue-600 "
          onClick={() => approveApplication()}
        >
          Approve Applications
        </Button>
      </div>
    </div>
  );
};

export default SingleApplication;
