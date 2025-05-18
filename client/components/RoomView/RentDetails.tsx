"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import DeletePopup from "./DeletePopup";
import MonthlyPayment from "../UserComponents/MonthlyPay";
import { base_url } from "@/constants/BaseUrl";

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

interface UserDetails {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Address: string;
  UserType: string;
}

interface Rent {
  rentDate: Date;
  token: string;
  room: PropertyDetails;
  user: UserDetails;
}

const RentDetails = ({ rentDate, token, room, user }: Rent) => {
  const rentDateObj = new Date(rentDate);

  const nextRentDate = new Date(rentDateObj);
  nextRentDate.setDate(nextRentDate.getDate() + 30);

  const [popup, setPopup] = useState<boolean>(false);
  const [paymentLast, setPaymentLast] = useState<Date | null>(null);

  const checkPaymntDue = () => {
    const today = new Date();

    if (!paymentLast) {
      return true;
    }

    const lastPaymentDate = new Date(paymentLast);
    const diffInMs = today.getTime() - lastPaymentDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays >= 30;
  };

  console.log(checkPaymntDue());

  useEffect(() => {
    if (token && room) {
      getApplicationsLastPayment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getApplicationsLastPayment = async () => {
    try {
      const response = await fetch(
        `${base_url}/rooms/rent/tenants/last_payment/${room.room_id}/${room.rented_by}`,
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
        setPaymentLast(val.message);
        console.log(val.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

      {/* Rented Room  */}
      {user && checkPaymntDue() && (
        <MonthlyPayment
          roomId={room.room_id}
          price={room.basic.price}
          token={token}
          seller={room.contact.username}
          landlord_id={room.landlordId}
          user={user}
        />
      )}

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
