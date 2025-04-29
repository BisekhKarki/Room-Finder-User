"use client";
import React from "react";
import { GoStarFill } from "react-icons/go";
import user from "@/assets/user.png";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

export interface Review {
  comment: string;
  rating: number;
  _id: string;
  created_at: Date;
}

interface Props {
  review: Array<Review> | [];
}

const History = ({ review }: Props) => {
  return (
    <div className="px-4 xs:px-5 sm:px-6 lg:px-8">
      <div className="py-4 sm:py-6 border w-full mt-6 sm:mt-8 px-4 sm:px-6 rounded-lg border-gray-200 shadow-sm">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
          Customer Reviews
        </h2>

        {review && review.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {review.map((r) => (
              <div
                key={r._id}
                className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-all duration-300 ease-in-out flex flex-col"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={user}
                      width={40}
                      height={40}
                      alt="user"
                      className="rounded-full border-2 border-gray-200 w-8 h-8 sm:w-10 sm:h-10"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-800">
                      Anonymous User
                    </h3>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <GoStarFill
                            key={star}
                            className={`${
                              star <= r.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            } text-xs sm:text-sm`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-[10px] sm:text-xs text-gray-500">
                        {r.rating.toFixed(1)}/5
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 flex-grow">
                  {r.comment}
                </p>

                <p className="text-[10px] xs:text-xs text-gray-400 text-right mt-auto">
                  {formatDistanceToNow(new Date(r.created_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 sm:py-8">
            <div className="text-sm sm:text-base text-gray-500 mb-2">
              No reviews yet
            </div>
            <p className="text-xs sm:text-sm text-gray-400">
              Be the first to leave a review!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
