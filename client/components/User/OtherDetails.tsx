"use client";
import React from "react";
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
}: OtherDetailsProps) => {
  return (
    <div className="space-y-6 w-full">
      <div className="space-y-4">
        <p className="text-sm md:text-base font-medium">Employment & Income</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            placeholder="Current Job"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
          <Input
            placeholder="Monthly Income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm md:text-base font-medium">Emergency Contact</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            placeholder="Contact Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="md:col-span-2">
            <Input
              placeholder="Relationship"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherDetails;
