"use client";

import ProtectRoutePage from "@/components/ProtectRoutePage";
import { base_url } from "@/constants/BaseUrl";
import { GetToken } from "@/constants/GetToken";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface BasicDetails {
  name: string;
  type: string;
  description: string;
  price: string;
}

interface RentedRoom {
  _id: string;
  _v: number;
  basic: BasicDetails;
  images: Array<string>;
  rented_leave_date: string;
  createdAt: string;
  rented: boolean;
}

interface UserDetails {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Address: string;
  UserType: string;
  _v: number;
  _id: string;
}

export default function Page() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [rentedRooms, setRentedRooms] = useState<Array<RentedRoom> | []>([]);
  const [currentRooms, setCurrentRooms] = useState<Array<RentedRoom> | []>([]);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // const [token,setToken] = useState<string>("")

  const getToken = GetToken();

  useEffect(() => {
    if (getToken) {
      // setToken(getToken)
      fetchUserData();
      fetchRentedRooms();
      fetchCurrentRentedRooms();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getToken]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${base_url}/user/personal`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        setUserDetails(data.message);
      }
    } catch (error: unknown) {
      console.log(String(error));
    }
  };

  const fetchRentedRooms = async () => {
    try {
      const response = await fetch(`${base_url}/user/room/history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        setRentedRooms(data.message);
      }
    } catch (error: unknown) {
      console.log(String(error));
    }
  };

  const fetchCurrentRentedRooms = async () => {
    try {
      const response = await fetch(`${base_url}/user/room/current`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        setCurrentRooms(data.message);
      }
    } catch (error: unknown) {
      console.log(String(error));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${base_url}/user/password/change`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success(data.message);
        setLoading(false);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }

    // Add your password change logic here
    setError("");
    setSuccessMessage("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="bg-white min-h-screen p-4 sm:p-6 lg:p-8">
      <ProtectRoutePage type="Tenants" />
      <div className="max-w-4xl mx-auto">
        {/* Profile Header - Stack on mobile */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Profile Settings
          </h1>
          <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm w-fit">
            {userDetails?.UserType}
          </span>
        </div>

        {/* Personal Details Section */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-700">
            Personal Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1 sm:mb-2">
                First Name
              </label>
              <p className="text-gray-800 text-base">
                {userDetails?.FirstName}
              </p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1 sm:mb-2">
                Last Name
              </label>
              <p className="text-gray-800 text-base">{userDetails?.LastName}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1 sm:mb-2">
                Email
              </label>
              <p className="text-gray-800 text-base break-all">
                {userDetails?.Email}
              </p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1 sm:mb-2">
                Phone
              </label>
              <p className="text-gray-800 text-base">{userDetails?.Phone}</p>
            </div>
            <div className="col-span-full">
              <label className="block text-sm text-gray-600 mb-1 sm:mb-2">
                Address
              </label>
              <p className="text-gray-800 text-base">{userDetails?.Address}</p>
            </div>
          </div>
        </div>

        {/* Rented Rooms History - Improved Mobile Scroll */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-700">
            Rented Rooms History
          </h2>
          <div className="overflow-x-auto pb-2">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="text-left text-sm text-gray-600 border-b">
                  <th className="pb-3 pr-4">Room</th>
                  <th className="pb-3 px-4">Rented Date</th>
                  <th className="pb-3 px-4">Rent Leave Date</th>
                  <th className="pb-3 pl-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(rentedRooms) && rentedRooms.length > 0 ? (
                  rentedRooms.map((room, index) => (
                    <tr key={index} className="text-sm text-gray-800 border-b">
                      <td className="py-4 pr-4">{room.basic.name}</td>
                      <td className="px-4">{room.createdAt.split("T")[0]}</td>
                      <td className="px-4">{room.rented_leave_date}</td>
                      <td className="pl-4">
                        <span
                          className={`text-sm ${
                            room.rented ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {room.rented ? "on rent" : "rented"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No rooms found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Current Room - Improved Mobile Scroll */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-700">
            Current Rented Room
          </h2>

          <div className="overflow-x-auto pb-2">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="text-left text-sm text-gray-600 border-b">
                  <th className="pb-3 pr-4">Room</th>
                  <th className="pb-3 px-4">Date</th>
                  <th className="pb-3 px-4">Price</th>
                  <th className="pb-3 pl-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(rentedRooms) && rentedRooms.length > 0 ? (
                  currentRooms.map((current, index) => (
                    <tr key={index} className="text-sm text-gray-800 border-b">
                      <td className="py-4 pr-4">{current.basic.name}</td>
                      <td className="px-4">
                        {current.createdAt.split("T")[0]}
                      </td>
                      <td className="px-4">Rs. {current.basic.price}</td>
                      <td className="pl-4">
                        <span
                          className={`text-sm ${
                            current.rented ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {current.rented ? "on rent" : "rented"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No rooms found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Change Password Section - Full Width on Mobile */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-700">
            Change Password
          </h2>
          <form onSubmit={handleSubmit} className="max-w-lg">
            {error && (
              <div className="text-red-500 text-sm mb-3 sm:mb-4">{error}</div>
            )}
            {successMessage && (
              <div className="text-green-500 text-sm mb-3 sm:mb-4">
                {successMessage}
              </div>
            )}

            <div className="mb-3 sm:mb-4">
              <label className="block text-sm text-gray-600 mb-1 sm:mb-2">
                Current Password
              </label>
              <input
                aria-label="password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 text-sm sm:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-3 sm:mb-4">
              <label className="block text-sm text-gray-600 mb-1 sm:mb-2">
                New Password
              </label>
              <input
                aria-label="password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 text-sm sm:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4 sm:mb-6">
              <label className="block text-sm text-gray-600 mb-1 sm:mb-2">
                Confirm Password
              </label>
              <input
                aria-label="password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 text-sm sm:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm sm:text-base"
            >
              {loading ? "updating..." : " Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
