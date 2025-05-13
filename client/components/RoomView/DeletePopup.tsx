"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { GoStarFill } from "react-icons/go";
import toast from "react-hot-toast";
import { base_url } from "@/constants/BaseUrl";
import { useRouter } from "next/navigation";

interface Props {
  setPopup: (value: boolean) => void;
  token: string;
  landlordId: string;
  roomId: string;
}

const DeletePopup = ({ setPopup, token, landlordId, roomId }: Props) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const router = useRouter();

  const leaveRoom = async () => {
    try {
      const response = await fetch(`${base_url}/rented/tentants/rooms/leave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          landlordId,
          roomId,
          rating,
          comment,
        }),
      });
      const data = await response.json();

      if (response.status === 200) {
        toast.success(data.message);
        router.push("/user/home");
      } else {
        toast.error(data.message);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white shadow-lg rounded-lg w-96 p-6">
        <h1 className="text-2xl font-bold mb-2">Leave Property?</h1>
        <p className="text-gray-600 mb-4">
          Are you sure you want to leave the property?
          <br />
          If yes leave your feedback
        </p>
        <div className="mb-5 space-y-2">
          <h2 className="">Give your feedbacks</h2>
          <Input
            placeholder="Enter your review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="space-y-1">
            <p>Rate the room</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <GoStarFill
                  key={star}
                  size={28}
                  className={`cursor-pointer transition-all ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            onClick={() => setPopup(false)}
            className="bg-gray-200 hover:bg-gray-300 text-black"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              leaveRoom();
              setPopup(false);
            }}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Leave
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
