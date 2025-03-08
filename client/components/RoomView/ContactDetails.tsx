"use client";

import React from "react";
import userAvatar from "../../assets/user.png";
import Image from "next/image";

interface ContactDetails {
  email: string;
  phone: string;
  username: string;
}

interface Props {
  contact: ContactDetails;
}

const ContactDetails = ({ contact }: Props) => {
  return (
    <div className="mb-16">
      <h1 className="font-bold text-3xl mb-3 font-sans">Contact Details</h1>
      <hr />
      <div className="mt-10 flex  flex-col items-center gap-5">
        <Image src={userAvatar} alt="avatar" width={50} height={50} />
        <div className=" flex flex-col gap-3">
          <p className="text-gray-500 text-base">Name: {contact.username}</p>
          <p className="text-gray-500 text-base">Email: {contact.email}</p>
          <p className="text-gray-500 text-base">Phone: {contact.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
