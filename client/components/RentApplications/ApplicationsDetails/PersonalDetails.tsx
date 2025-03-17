import React from "react";

interface personal {
  age: string;
  email: string;
  fullName: string;
  marital_status: string;
  numberOfRenters: string;
  permanentAddress: string;
}

interface Props {
  Personal_Details: personal | null;
}

const PersonalDetails = ({ Personal_Details }: Props) => {
  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-5">Personal Details</h1>
      <hr className="mb-4" />
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between">
          <p>Name: {Personal_Details?.fullName}</p>
          <p>Email: {Personal_Details?.email}</p>
          <p>Age: {Personal_Details?.age}</p>
        </div>
        <div className="flex justify-between">
          <p>Marital Status: {Personal_Details?.marital_status}</p>
          <p>Permanent Address: {Personal_Details?.permanentAddress}</p>
          <p>Number of renters: {Personal_Details?.numberOfRenters}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
