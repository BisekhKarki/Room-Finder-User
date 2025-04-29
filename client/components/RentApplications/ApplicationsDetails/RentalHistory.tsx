import React from "react";

interface RentalHistory {
  previous_address: string;
  length_of_stay: string;
  current_landlord_contact: string;
  reason_for_leave: string;
  criminal_record: string;
}

interface Props {
  History: RentalHistory;
}

const RentalHistory = ({ History }: Props) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4">
        Rental History
      </h1>
      <hr className="border-gray-200 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
        <div className="space-y-1">
          <p className="font-medium">Previous Address:</p>
          <p className="line-clamp-2">{History.previous_address}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Length of Stay:</p>
          <p>{History.length_of_stay}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Landlord Contact:</p>
          <p>{History.current_landlord_contact}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Leave Reason:</p>
          <p className="line-clamp-2">{History.reason_for_leave}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Criminal Record:</p>
          <p>{History.criminal_record}</p>
        </div>
      </div>
    </div>
  );
};

export default RentalHistory;
