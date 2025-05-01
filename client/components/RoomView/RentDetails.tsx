"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import DeletePopup from "./DeletePopup";

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
  Province: string;
  city: string;
  landmark: string;
  region: string;
  street: string;
  zip: string;
}

interface PropertyReviews {
  _id: string;
  comment: string;
  rating: number;
  created_at: Date;
}

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
  room_id: string;
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
          roomId={room.room_id}
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
