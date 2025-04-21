"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CitizenshipFront from "../User/CitizenshipFront";
import CitizenshipBack from "../User/CitizenshipBack";
import PersonalPhoto from "../User/PersonalPhoto";
import PersonalDetails from "../User/PersonalDetails";
import OtherDetails from "../User/OtherDetails";
import RentalHistory from "../User/RentalHistory";
import { GetToken } from "@/constants/GetToken";
import toast from "react-hot-toast";
import { base_url } from "@/constants/BaseUrl";
import UserPayment from "./UserPayment";
import { PropertyProps } from "@/app/user/properties/[id]/page";

interface RentRoomProps {
  property: PropertyProps | null;
  roomId: string | undefined;
}

const RentRoom = ({ property, roomId }: RentRoomProps) => {
  const [applicationStatus, setApplicationStatus] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const getToken = GetToken();

  useEffect(() => {
    if (getToken) {
      setToken(getToken);
    }
  }, [getToken]);

  const getApprovalStatus = async () => {
    try {
      console.log("Loading");
      const response = await fetch(
        `${base_url}/rooms/rent/tenant/application/approval/check/${property?._id}/${property?.landlordId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.status == 200) {
        setApplicationStatus(data.message);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  useEffect(() => {
    console.log("Loading");
    if (token) {
      getApprovalStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  // console.log(applicationStatus);

  const [citizenshipFront, setCitizenshipFront] = useState<string>("");
  const [citizenshipBack, setCitizenshipBack] = useState<string>("");

  const [personalphoto, setPersonalphoto] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  // For personal Details

  const [age, setAge] = useState<string>("");
  const [renters, setRenters] = useState<string>("");
  const [martialStatus, setMartialStatus] = useState<string>("");

  // For employment , income
  const [job, setJob] = useState<string>("");
  const [income, setIncome] = useState<string>("");

  // For emergency contact details
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [relationship, setRelationship] = useState<string>("");

  // For rental history
  const [history, setHistory] = useState<string>("");
  const [length, setLength] = useState<string>("");

  const [reason, setReason] = useState<string>("");
  const [criminal, setCriminal] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = {
      citizenshipFront,
      citizenshipBack,
      personalphoto,

      age,
      renters,
      martialStatus,

      job,
      income,
      name,
      phone,
      relationship,

      history,
      length,

      reason,
      criminal,
    };
    if (!checked) {
      toast.error("Please agree the terms");
      return;
    }

    // Find empty fields
    const emptyFields = Object.entries(requiredFields)
      .filter(([value]) => value.trim() === "")
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      console.log("Missing Fields:", emptyFields);
      toast.error(`Fill all the details to send approval`);
      return;
    }

    try {
      const response = await fetch(
        `${base_url}/rooms/rent/tentants/application/approval`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            personalDetails: {
              age: age,
              numberOfRenters: renters,
              marital_status: martialStatus,
            },
            employment_and_income: {
              job: job,
              income: income,
            },
            emergency_contact_details: {
              name: name,
              contact: phone,
              relationship: relationship,
            },
            rental_history: {
              previous_address: history,
              length_of_stay: length,

              reason_for_leave: reason,
              criminal_record: criminal,
            },
            images: {
              citizen_front: citizenshipFront,
              citizen_back: citizenshipBack,
              personal_photo: personalphoto,
            },
            roomId: roomId,
            landlordId: property?.landlordId,
          }),
        }
      );

      const data = await response.json();
      if (response.status === 201) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {property && applicationStatus === "accepted" ? (
        <UserPayment
          roomId={property._id}
          price={property.basic.price}
          token={token}
          seller={property.contact.username}
          landlord_id={property.landlordId}
        />
      ) : applicationStatus === "pending" ? (
        <div className="mt-5  px-10">
          <div className=" px-5 py-10  border border-gray-200">
            <div className="px-10">
              <p className="text-gray-700 font-medium">
                Your application is pending
              </p>
              <p className="text-gray-500">
                You will get a notification once its approved by the landlord.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 ">
          <div className="px-5 py-10  border border-gray-200 ">
            <div className="px-10">
              <form className="space-y-5">
                <div className="flex gap-10">
                  <PersonalDetails
                    age={age}
                    setAge={setAge}
                    renters={renters}
                    setRenters={setRenters}
                    martialStatus={martialStatus}
                    setMartialStatus={setMartialStatus}
                  />
                  <OtherDetails
                    job={job}
                    setJob={setJob}
                    income={income}
                    setIncome={setIncome}
                    name={name}
                    setName={setName}
                    phone={phone}
                    setPhone={setPhone}
                    relationship={relationship}
                    setRelationship={setRelationship}
                  />
                </div>
                <RentalHistory
                  history={history}
                  setHistory={setHistory}
                  length={length}
                  setLength={setLength}
                  reason={reason}
                  setReason={setReason}
                />
                <div className="">
                  <Select value={criminal} onValueChange={setCriminal}>
                    <SelectTrigger className="w-[300px]">
                      <SelectValue placeholder="Do you have any past criminal records" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select an Option</SelectLabel>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <p>Personal ID and photos</p>
                  <div className="flex gap-5">
                    <CitizenshipFront
                      setCitizenshipFront={setCitizenshipFront}
                    />
                    <CitizenshipBack setCitizenshipBack={setCitizenshipBack} />
                    <PersonalPhoto setPersonalphoto={setPersonalphoto} />
                  </div>
                </div>
                <p className=" px-1 mt-5 text-start">
                  Before proceeding with the rental process, please complete the
                  tenant application form with accurate and up-to-date
                  information. This includes personal details, employment
                  status, rental history, and references. Providing this
                  information helps ensure a smooth approval process and a
                  suitable match for the rental property. Incomplete or false
                  details may delay or affect your application.
                </p>
                <div className="">
                  <div className="flex items-center gap-3 mb-5">
                    <Input
                      type="checkbox"
                      className="w-4"
                      checked={checked}
                      onClick={() => setChecked(!checked)}
                    />
                    <p>
                      I here by agree that all the details that I have provided
                      are correct and accurate
                    </p>
                  </div>
                  <div className="">
                    <Button
                      onClick={(e) => {
                        if (token) {
                          onSubmit(e);
                        }
                      }}
                      className="w-96 mt-3 bg-blue-500 hover:bg-blue-600"
                    >
                      Send For Approval
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RentRoom;
