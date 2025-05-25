"use client";

import ProtectRoutePage from "@/components/ProtectRoutePage";
import { base_url } from "@/constants/BaseUrl";
import { GetToken } from "@/constants/GetToken";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getToken = GetToken();

  useEffect(() => {
    if (getToken) {
      fetchUserData();
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

    setError("");
    setSuccessMessage("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleProfileUpdate = async () => {
    try {
      const response = await fetch(`${base_url}/user/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
        body: JSON.stringify({
          FirstName: userDetails?.FirstName,
          LastName: userDetails?.LastName,
          Phone: userDetails?.Phone,
          Address: userDetails?.Address,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success("Profile updated successfully");
        setCanEdit(false);
        fetchUserData();
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  return (
    <div className="bg-white min-h-screen p-4 sm:p-6 lg:p-8">
      <ProtectRoutePage type="Landlord" />
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
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
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-700">
              Personal Details
            </h2>
            {!canEdit ? (
              <button
                onClick={() => setCanEdit(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleProfileUpdate}
                  className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setCanEdit(false);
                    fetchUserData();
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1 sm:mb-2">
                First Name
              </label>
              <input
                aria-label="firstname"
                disabled={!canEdit}
                className={`w-full p-2 text-sm sm:text-base ${
                  canEdit
                    ? "border rounded-md focus:ring-2 focus:ring-blue-500"
                    : "border-none bg-transparent"
                }`}
                value={userDetails?.FirstName}
                onChange={(e) =>
                  setUserDetails(
                    (prev) => prev && { ...prev, FirstName: e.target.value }
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1 sm:mb-2">
                Last Name
              </label>
              <input
                aria-label="firstname"
                disabled={!canEdit}
                className={`w-full p-2 text-sm sm:text-base ${
                  canEdit
                    ? "border rounded-md focus:ring-2 focus:ring-blue-500"
                    : "border-none bg-transparent"
                }`}
                value={userDetails?.LastName}
                onChange={(e) =>
                  setUserDetails(
                    (prev) => prev && { ...prev, LastName: e.target.value }
                  )
                }
              />
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
              <input
                aria-label="firstname"
                disabled={!canEdit}
                className={`w-full p-2 text-sm sm:text-base ${
                  canEdit
                    ? "border rounded-md focus:ring-2 focus:ring-blue-500"
                    : "border-none bg-transparent"
                }`}
                value={userDetails?.Phone}
                onChange={(e) =>
                  setUserDetails(
                    (prev) => prev && { ...prev, Phone: e.target.value }
                  )
                }
              />
            </div>
            <div className="col-span-full">
              <label className="block text-sm text-gray-600 mb-1 sm:mb-2">
                Address
              </label>
              <input
                aria-label="firstname"
                disabled={!canEdit}
                className={`w-full p-2 text-sm sm:text-base ${
                  canEdit
                    ? "border rounded-md focus:ring-2 focus:ring-blue-500"
                    : "border-none bg-transparent"
                }`}
                value={userDetails?.Address}
                onChange={(e) =>
                  setUserDetails(
                    (prev) => prev && { ...prev, Address: e.target.value }
                  )
                }
              />
            </div>
          </div>
        </div>

        {/* Change Password Section */}
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
              <div className="relative">
                <input
                  aria-label="password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-2 pr-10 text-sm sm:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600"
                >
                  {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="mb-3 sm:mb-4">
              <label className="block text-sm text-gray-600 mb-1 sm:mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  aria-label="password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 pr-10 text-sm sm:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600"
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="mb-4 sm:mb-6">
              <label className="block text-sm text-gray-600 mb-1 sm:mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  aria-label="password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 pr-10 text-sm sm:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm sm:text-base"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
