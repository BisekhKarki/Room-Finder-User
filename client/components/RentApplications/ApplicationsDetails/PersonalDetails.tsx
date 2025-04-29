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
    <div className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4">
        Personal Details
      </h1>
      <hr className="border-gray-200 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm md:text-base">
        <div className="space-y-1">
          <p className="font-medium">Name:</p>
          <p>{Personal_Details?.fullName}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Email:</p>
          <p>{Personal_Details?.email}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Age:</p>
          <p>{Personal_Details?.age}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Marital Status:</p>
          <p>{Personal_Details?.marital_status}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Permanent Address:</p>
          <p className="line-clamp-2">{Personal_Details?.permanentAddress}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Number of Renters:</p>
          <p>{Personal_Details?.numberOfRenters}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
