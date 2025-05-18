"use client";

import { base_url } from "@/constants/BaseUrl";
import { GetToken } from "@/constants/GetToken";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import SingleApplication from "./SingleApplication";

interface Props {
  roomId: string;
  landlordId: string;
}
interface TenantApplication {
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

const Applications = ({ roomId, landlordId }: Props) => {
  const [token, setToken] = useState<string>("");
  const getToken = GetToken();

  const [applications, setApplications] = useState<
    Array<TenantApplication> | []
  >([]);

  const [singleDetails, setSingleDetails] = useState<TenantApplication | null>(
    null
  );

  const [showSingle, setShowSingle] = useState<boolean>(false);

  useEffect(() => {
    if (getToken) {
      setToken(getToken);
    }
  }, [getToken]);

  useEffect(() => {
    if (token) {
      getApplications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const getApplications = async () => {
    try {
      const response = await fetch(
        `${base_url}/rooms/rent/tenants/application/${roomId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const val = await response.json();
      if (response.status === 200) {
        setApplications(val.message);
        console.log(val.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-4 md:py-6 lg:py-8 border w-full mt-4 md:mt-6 px-4 md:px-6 lg:px-8 rounded-lg border-gray-200 shadow-sm">
      {showSingle ? (
        <SingleApplication
          Application={singleDetails}
          setShowSingle={setShowSingle}
          showSingle={showSingle}
          token={token}
          roomId={roomId}
          landlordId={landlordId}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {applications && applications.length > 0 ? (
            applications.map((a, index) => (
              <div
                key={index}
                className="border p-4 md:p-6 rounded-lg hover:shadow-lg transition-shadow duration-200 bg-white"
              >
                <div className="space-y-2 md:space-y-3">
                  <p className="text-sm md:text-base">
                    <span className="font-medium">Name:</span>{" "}
                    {a.personalDetails?.fullName}
                  </p>
                  <p className="text-sm md:text-base">
                    <span className="font-medium">Email:</span>{" "}
                    {a.personalDetails?.email}
                  </p>
                  <p className="text-sm md:text-base">
                    <span className="font-medium">Age:</span>{" "}
                    {a.personalDetails?.age}
                  </p>
                  <p className="text-sm md:text-base">
                    <span className="font-medium">Renters:</span>{" "}
                    {a.personalDetails?.numberOfRenters}
                  </p>
                  <p className="text-sm md:text-base line-clamp-1">
                    <span className="font-medium">Address:</span>{" "}
                    {a.personalDetails?.permanentAddress}
                  </p>
                  <p className="text-sm md:text-base line-clamp-1">
                    <span className="font-medium">Previous Stay:</span>{" "}
                    {a.rental_history?.previous_address}
                  </p>
                  <Button
                    onClick={() => {
                      setSingleDetails(a);
                      setShowSingle(true);
                    }}
                    className="w-full mt-3 md:mt-4 bg-blue-600 hover:bg-blue-700 text-xs md:text-sm py-2"
                  >
                    Show Full Details
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500 text-lg md:text-xl">
              No Applications Found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Applications;
