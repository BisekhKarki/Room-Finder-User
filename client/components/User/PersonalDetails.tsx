"use client";
import React, { useEffect, useState } from "react";
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
import { base_url } from "@/constants/BaseUrl";

interface PersonalDetailsProps {
  age: string;
  setAge: (value: string) => void;
  renters: string;
  setRenters: (value: string) => void;
  martialStatus: string;
  setMartialStatus: (value: string) => void;
  userName: string;
  setUserName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  userphone: string;
  setUserphone: (value: string) => void;
  token: string;
}

interface userDetails {
  Address: string;
  Email: string;
  FirstName: string;
  LastName: string;
  Phone: string;
  UserType: string;
}

const PersonalDetails = ({
  age,
  setAge,
  renters,
  setRenters,
  martialStatus,
  setMartialStatus,
  userName,
  setUserName,
  email,
  setEmail,
  userphone,
  setUserphone,
  token,
}: PersonalDetailsProps) => {
  const [user, setUser] = useState<userDetails | null>(null);

  useEffect(() => {
    // /rooms/tenant/details
    if (token) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${base_url}/rooms/tenant/details/info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        setUser(data.message);
      }
    } catch (error: unknown) {
      console.log(String(error));
    }
  };

  useEffect(() => {
    if (user) {
      setUserName(user.FirstName + " " + user.LastName);
      setEmail(user.Email);
      setUserphone(user.Phone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="space-y-4 w-full">
      <p className="text-sm md:text-base font-medium">Personal Details</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          placeholder="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Input
        placeholder="phone"
        value={userphone}
        onChange={(e) => setUserphone(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <Input
          placeholder="Number of renters"
          value={renters}
          onChange={(e) => setRenters(e.target.value)}
        />
      </div>

      <Select value={martialStatus} onValueChange={setMartialStatus}>
        <SelectTrigger className="w-full">
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
