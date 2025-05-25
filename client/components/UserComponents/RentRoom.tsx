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
import { useRouter } from "next/navigation";

interface ContactData {
  email: string;
  phone: string;
  username: string;
}

interface BasicData {
  description: string;
  name: string;
  price: string;
  type: string;
}

interface FeaturesData {
  Kitchen: string;
  balcony: string;
  category: string;
  direction: string;
  floor: string;
  parking: string;
  waterfacility: string;
}

interface LocationData {
  province?: string;
  city: string;
  landmark: string;
  region: string;
  street: string;
  zip: string;
}

interface reviewsArray {
  comment: string;
  rating: number;
  _id: string;
  created_at: Date;
}

interface PropertyProps {
  basic: BasicData;
  features: FeaturesData;
  images: string[];
  isVerified: boolean;
  landlordId: string;
  location: LocationData;
  contact: ContactData;
  payment: boolean;
  __v: number;
  _id: string;
  reviews: Array<reviewsArray> | [];
}

interface RentRoomProps {
  property: PropertyProps;
  roomId: string | undefined;
}

const RentRoom = ({ property, roomId }: RentRoomProps) => {
  const router = useRouter();

  const [applicationStatus, setApplicationStatus] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [alreadyRented, setAlreadyRented] = useState<boolean>(false);
  const [citizenshipFront, setCitizenshipFront] = useState<string>("");
  const [citizenshipBack, setCitizenshipBack] = useState<string>("");

  const [personalphoto, setPersonalphoto] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  // For personal Details
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userphone, setUserphone] = useState<string>("");
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

  const getToken = GetToken();

  useEffect(() => {
    if (getToken) {
      setToken(getToken);
    }
  }, [getToken]);

  const getApprovalStatus = async () => {
    try {
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
    if (token) {
      getApprovalStatus();
      checkAlreadyRented();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  // console.log(applicationStatus);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = {
      age,
      renters,
      martialStatus,

      name,
      phone,
      relationship,

      citizenshipFront,
      citizenshipBack,
      personalphoto,

      criminal,
    };

    // Find empty fields
    const emptyFields = Object.entries(requiredFields)
      .filter(([key, value]) => {
        const isEmpty = value.trim() === "";

        console.log("Key: ", key);

        return isEmpty;
      })
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      console.log("Missing Fields:", emptyFields);
      toast.error(`Fill ${emptyFields[0]} to send approval`);
      return;
    }

    if (!checked) {
      toast.error("Please agree the terms");
      return;
    }

    // console.log({
    //   personalDetails: {
    //     fullName: userName,
    //     email: email,
    //     perosonalContact: userphone,
    //     age: age,
    //     numberOfRenters: renters,
    //     marital_status: martialStatus,
    //   },
    //   employment_and_income: {
    //     job: job,
    //     income: income,
    //   },
    //   emergency_contact_details: {
    //     name: name,
    //     contact: phone,
    //     relationship: relationship,
    //   },
    //   rental_history: {
    //     previous_address: history,
    //     length_of_stay: length,

    //     reason_for_leave: reason,
    //     criminal_record: criminal,
    //   },
    //   images: {
    //     citizen_front: citizenshipFront,
    //     citizen_back: citizenshipBack,
    //     personal_photo: personalphoto,
    //   },
    //   roomId: roomId,
    //   landlordId: property?.landlordId,
    // });

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
              fullName: userName,
              email: email,
              perosonalContact: userphone,
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
        router.push("/User/Properties");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error: unknown) {
      console.log(String(error));
    }
  };

  const checkAlreadyRented = async () => {
    try {
      const response = await fetch(`${base_url}/rooms/user/rented/already`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        setAlreadyRented(data.message);
      }
    } catch (error: unknown) {
      console.log(String(error));
    }
  };

  return (
    <>
      {alreadyRented ? (
        <div className="px-10  mt-5">
          <div className="border border-gray-300 rounded px-4 py-2 space-y-2">
            <p className="text-gray-600">You cannot rent this room</p>
            <p className="text-gray-600">
              To rent it you must leave the current rented room
            </p>
          </div>
        </div>
      ) : property && applicationStatus === "accepted" ? (
        <UserPayment
          roomId={property._id}
          price={property.basic.price}
          token={token}
          seller={property.contact.username}
          landlord_id={property.landlordId}
        />
      ) : applicationStatus === "pending" ? (
        <div className="mt-5 px-4 md:px-10">
          <div className="px-4 md:px-5 py-6 md:py-10 border border-gray-200 rounded-lg">
            <div className="px-4 md:px-10 space-y-3">
              <p className="text-gray-700 font-medium text-base md:text-lg">
                Your application is pending
              </p>
              <p className="text-gray-500 text-sm md:text-base">
                You will get a notification once its approved by the landlord.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 px-4 md:px-0">
          <div className="border border-gray-200 rounded-lg">
            <div className="px-4 md:px-8 py-6 md:py-10">
              <form className="space-y-6 md:space-y-8">
                <div className="flex flex-col lg:flex-row gap-8 md:gap-10">
                  <PersonalDetails
                    age={age}
                    setAge={setAge}
                    renters={renters}
                    setRenters={setRenters}
                    martialStatus={martialStatus}
                    setMartialStatus={setMartialStatus}
                    userName={userName}
                    setUserName={setUserName}
                    email={email}
                    setEmail={setEmail}
                    userphone={userphone}
                    setUserphone={setUserphone}
                    token={token}
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

                <div className="w-full">
                  <Select value={criminal} onValueChange={setCriminal}>
                    <SelectTrigger className="w-full max-w-[500px]">
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

                <div className="space-y-4">
                  <p className="text-sm md:text-base font-medium">
                    Personal ID and photos
                  </p>
                  <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <CitizenshipFront
                      setCitizenshipFront={setCitizenshipFront}
                    />
                    <CitizenshipBack setCitizenshipBack={setCitizenshipBack} />
                    <PersonalPhoto setPersonalphoto={setPersonalphoto} />
                  </div>
                </div>

                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Before proceeding with the rental process, please complete the
                  tenant application form with accurate and up-to-date
                  information. This includes personal details, employment
                  status, rental history, and references. Providing this
                  information helps ensure a smooth approval process and a
                  suitable match for the rental property. Incomplete or false
                  details may delay or affect your application.
                </p>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <Input
                      type="checkbox"
                      className="w-4 h-4 mt-1"
                      checked={checked}
                      // onClick={() => setChecked(!checked)}
                      onChange={(e) => setChecked(e.target.checked)}
                    />
                    <p className="text-xs md:text-sm">
                      I hereby agree that all the details I have provided are
                      correct and accurate
                    </p>
                  </div>
                  <Button
                    onClick={(e) => {
                      if (token) {
                        onSubmit(e);
                      }
                    }}
                    className="w-full max-w-[400px] md:w-96 bg-blue-500 hover:bg-blue-600"
                  >
                    Send For Approval
                  </Button>
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
