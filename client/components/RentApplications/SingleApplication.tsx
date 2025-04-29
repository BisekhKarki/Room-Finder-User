"use client";
import React, { useEffect, useState } from "react";
import PersonalDetails from "./ApplicationsDetails/PersonalDetails";
import EmploymentAndIncome from "./ApplicationsDetails/EmploymentAndIncome";
import RentalHistory from "./ApplicationsDetails/RentalHistory";
import EmergencyContactDetails from "./ApplicationsDetails/EmergencyContactDetails";
import UserImages from "./ApplicationsDetails/UserImages";
import { Button } from "../ui/button";

import { IoIosArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";
import { base_url } from "@/constants/BaseUrl";
import DeleteConfirmation from "./DeleteConfirmation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

interface UserTransaction {
  _id: string;
  purchase_type: string;
  room_id: string;
  landlord_id: string;
  buyer_id: string;
  buyer_name: string;
  seller_name: string;
  purchase_amount: number; // As numeric value
  purchase_date: Date;
  payment_method: string;
  payment_status: string;
  __v: number;
}

export interface SingleTenantApplication {
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
  roomId?: string;
  landlordId?: string;
}

const SingleApplication = ({
  Application,
  setShowSingle,
  token,
  roomId,
  landlordId,
}: Props) => {
  const [popup, setPopup] = useState<boolean>(false);
  const [done, setDone] = useState<string>("");

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

  const [applicationStatus, setApplicationStatus] =
    useState<UserTransaction | null>(null);

  useEffect(() => {
    if (token) {
      getTransactionsDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTransactionsDetails = async () => {
    try {
      const response = await fetch(
        `${base_url}/payment/tenants/cashOnHand/status/${roomId}/${landlordId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: Application?.tenantId }),
        }
      );
      const val = await response.json();
      if (response.status === 200) {
        setApplicationStatus(val.message);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  const approvePayment = async () => {
    if (!done || done === "") return toast.error("Select Yes or no ");
    try {
      let url;
      if (done === "Yes") {
        url = `/tenants/approval/cashOnHand`;
      } else if (done === "No") {
        url = `/tenants/decline/cashOnHand`;
      }

      const response = await fetch(`${base_url}/payment${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          buyerId: Application?.tenantId,
          roomId: Application?.roomId,
        }),
      });
      const val = await response.json();
      if (response.status === 200) {
        setApplicationStatus(val.message);
        console.log(val.message);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  return (
    <div>
      {popup && (
        <DeleteConfirmation
          Application={Application}
          token={token}
          setPopup={setPopup}
        />
      )}

      {/* Back Button */}
      <div className="text-xl md:text-2xl mb-4 md:mb-5 flex items-center gap-2">
        <IoIosArrowRoundBack
          className="text-gray-800 cursor-pointer text-2xl md:text-3xl"
          onClick={() => setShowSingle(false)}
        />
        <p
          className="text-sm md:text-base cursor-pointer hover:underline"
          onClick={() => setShowSingle(false)}
        >
          Back
        </p>
      </div>

      {Application && (
        <div className="space-y-6 md:space-y-8 mt-6 md:mt-8 mb-6 md:mb-8">
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

      {applicationStatus?.payment_status === "pending" &&
      Application?.tenantId === applicationStatus?.buyer_id ? (
        <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
          <div className="w-full">
            <Label htmlFor="payment_method" className="text-sm md:text-base">
              Payment made by the renter
            </Label>
            <Select
              value={done}
              onValueChange={(value: string) => setDone(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Payment</SelectLabel>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button
            className="w-full md:w-1/3 bg-red-500 hover:bg-red-600 py-3"
            onClick={() => approvePayment()}
          >
            Submit
          </Button>
        </div>
      ) : applicationStatus?.payment_status === "completed" ? (
        <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
          <div>
            <p className="text-lg md:text-xl font-semibold">
              Last Rent Given by the user on: {""}
              <span className="block md:inline text-sm md:text-base font-normal">
                {/* Add date here */}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 md:mt-6 flex flex-col md:flex-row gap-2 md:gap-3">
          <Button
            className="w-full md:w-1/3 bg-blue-500 hover:bg-blue-600 py-3"
            onClick={() => approveApplication()}
          >
            Approve Application
          </Button>
          <Button
            className="w-full md:w-1/3 bg-red-500 hover:bg-red-600 py-3"
            onClick={() => setPopup(true)}
          >
            Decline Application
          </Button>
        </div>
      )}
    </div>
  );
};

export default SingleApplication;
