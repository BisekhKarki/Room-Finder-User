"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";

interface OtherDetailsProps {
  job: string;
  setJob: (value: string) => void;
  income: string;
  setIncome: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  relationship: string;
  setRelationship: (value: string) => void;
  contact: string;
  setContact: (value: string) => void;
}

const OtherDetails = ({
  job,
  setJob,
  income,
  setIncome,
  name,
  setName,
  phone,
  setPhone,
  relationship,
  setRelationship,
  contact,
  setContact,
}: OtherDetailsProps) => {
  return (
    <div className="space-y-6 w-full">
      <div className="space-y-3">
        <p>Employment & Income Details</p>
        <div className="flex gap-5">
          <Input
            className=""
            placeholder="Current Job"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
          <Input
            className=""
            placeholder="Monthly Income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-3">
        <p>Emergency Contact Details</p>
        <div className="flex gap-5">
          <Input
            className=""
            placeholder="Name of the person"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            className=""
            placeholder="Contact Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex gap-5">
          <Input
            className=""
            placeholder="Relationship to the person"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
          />
          <Input
            className=""
            placeholder="Alternate Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default OtherDetails;
