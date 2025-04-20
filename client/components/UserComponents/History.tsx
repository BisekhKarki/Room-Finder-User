"use client";

import React from "react";
import { GoStarFill } from "react-icons/go";

import user from "@/assets/user.png";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

export interface reviews {
  comment: string;
  rating: number;
  _id: string;
  created_at: Date;
}

interface Props {
  review: Array<reviews> | [];
}

const History = ({ review }: Props) => {
  return (
    <div className="px-10">
      <div className="py-5 border w-full mt-10 px-10 rounded-md  border-gray-300">
        {review && review.length > 0 ? (
          <div className="flex items-center gap-10 flex-wrap">
            {review.map((r, k) => (
              <div
                key={k}
                className="bg-gray-100  rounded border border-gray-300 px-10 py-5 hover:shadow-md cursor-pointer transition-all duration-300 ease-in-out"
              >
                <div className="space-y-1 flex gap-4">
                  <Image src={user} width={50} height={45} alt="user" />
                  <div className="space-y-1">
                    <div>
                      <p className="text-sm">Review by User</p>
                      <div>
                        <div className="flex ">
                          {[1, 2, 3, 4, 5].map((s, k) => (
                            <GoStarFill
                              key={k}
                              className={`${
                                s <= r.rating
                                  ? "text-yellow-300"
                                  : "text-gray-300"
                              } text-sm `}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm ml-10">{r.comment}</p>
                <p className="text-end mt-5 text-sm">
                  {formatDistanceToNow(new Date(r.created_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div>No reviews made</div>
        )}
      </div>
    </div>
  );
};

export default History;
