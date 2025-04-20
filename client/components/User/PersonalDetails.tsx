"use client";

import React from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface PersonalDetailsProps {
  age: string;
  setAge: (value: string) => void;
  renters: string;
  setRenters: (value: string) => void;
  martialStatus: string;
  setMartialStatus: (value: string) => void;
}

const PersonalDetails = ({
  age,
  setAge,
  renters,
  setRenters,
  martialStatus,
  setMartialStatus,
}: PersonalDetailsProps) => {
  return (
    <div className="space-y-3 w-full">
      <p>Personal Details</p>

      <div className="flex gap-5">
        <Input
          className=""
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <Input
          className=""
          placeholder="Number of people to rent"
          value={renters}
          onChange={(e) => setRenters(e.target.value)}
        />
      </div>

      <Select value={martialStatus} onValueChange={setMartialStatus}>
        <SelectTrigger className="w-[500px]">
          <SelectValue placeholder="Martial Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select an Option</SelectLabel>
            <SelectItem value="Married">Married</SelectItem>
            <SelectItem value="Single">Single</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PersonalDetails;
