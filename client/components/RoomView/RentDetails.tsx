"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import DeletePopup from "./DeletePopup";
import {
  BasicData,
  ContactData,
  FeaturesData,
  LocationData,
} from "../User/FeaturedRooms";
import { PropertyReviews } from "@/app/user/rentedRooms/page";

interface PropertyDetails {
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
  reviews: Array<PropertyReviews>;
  rented_date: Date;
  rented_by: string;
  rented_user_name: string;
}

interface Rent {
  rentDate: Date;
  token: string;
  room: PropertyDetails;
}

const RentDetails = ({ rentDate, token, room }: Rent) => {
  const rentDateObj = new Date(rentDate);

  const nextRentDate = new Date(rentDateObj);
  nextRentDate.setDate(nextRentDate.getDate() + 30);

  const [popup, setPopup] = useState<boolean>(false);

  return (
    <div className="mb-16 px-10 py-10">
      {popup && (
        <DeletePopup
          landlordId={room.landlordId}
          roomId={room._id}
          token={token}
          setPopup={setPopup}
        />
      )}
      <h1 className="font-bold text-3xl mb-3 font-sans">Rent Details</h1>
      <hr />

      <div className="mt-5 ">
        <p className="text-gray-500 text-base">
          Last Rent Date: {rentDateObj.toISOString().split("T")[0]}
        </p>
        <p className="text-gray-500 text-base mt-2">
          Next Rent Date: {nextRentDate.toISOString().split("T")[0]}
        </p>
      </div>

      <Button
        className="mt-10 w-52 bg-red-500 hover:bg-red-600"
        onClick={() => setPopup(true)}
      >
        Leave Rent
      </Button>
    </div>
  );
};

export default RentDetails;
