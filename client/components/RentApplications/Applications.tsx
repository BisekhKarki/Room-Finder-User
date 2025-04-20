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

  // console.log(showSingle);

  return (
    <div className="py-5 border w-full mt-10 px-10 rounded-md  border-gray-300">
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
        <div className="flex gap-5 flex-wrap">
          {applications && applications.length > 0 ? (
            applications.map((a, index) => (
              <div key={index} className="">
                <div className="">
                  <div className="w-full border px-10 py-5 shadow-md rounded-md space-y-2 hover:shadow-xl cursor-pointer transition-all duration-150 ease-in-out">
                    <p>Name: {a.personalDetails?.fullName}</p>
                    <p>Name: {a.personalDetails?.email}</p>
                    <p>Age: {a.personalDetails?.age}</p>
                    <p>
                      Number of Renters: {a.personalDetails?.numberOfRenters}
                    </p>
                    <p>
                      Permanent Address: {a.personalDetails?.permanentAddress}
                    </p>
                    <p>Previous stay: {a.rental_history?.previous_address}</p>
                    <Button
                      onClick={() => {
                        setSingleDetails(a);
                        setShowSingle(true);
                      }}
                      className="w-full bg-blue-500 hover:bg-blue-600 transition-all ease-in-out duration-200"
                    >
                      Show Full Details
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No Applications till now</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Applications;
