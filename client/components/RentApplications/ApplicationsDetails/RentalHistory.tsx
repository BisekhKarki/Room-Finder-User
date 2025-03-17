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
    <div>
      <h1 className="text-3xl font-bold mb-5">Rental History</h1>
      <hr className="mb-4" />
      <div className="space-y-4">
        <div className="flex justify-between flex-wrap">
          <p>Previous Address: {History.previous_address}</p>
          <p>Length of stay: {History.length_of_stay}</p>
          <p>
            Previous Landlord Contact Number: {History.current_landlord_contact}
          </p>
        </div>
        <div className="flex gap-20">
          <p>Criminal Records: {History.criminal_record}</p>
          <p>Resaons to leave Previous Address: {History.reason_for_leave}</p>
        </div>
      </div>
    </div>
  );
};

export default RentalHistory;
