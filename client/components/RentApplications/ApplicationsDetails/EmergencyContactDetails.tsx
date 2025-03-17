import React from "react";

interface EmergencyContactDetails {
  name: string;
  contact: string;
  relationship: string;
  alternateContact: string;
}
interface Props {
  emergency: EmergencyContactDetails | null;
}

const EmergencyContactDetails = ({ emergency }: Props) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">EmergencyContactDetails</h1>
      <hr className="mb-4" />
      <div className="flex justify-between flex-wrap gap-2">
        <p>Name of Person: {emergency?.name}</p>
        <p>Contact Number: {emergency?.contact}</p>
        <p>Relationship with person{emergency?.relationship}</p>
        <p>Alternate Contact Number{emergency?.alternateContact}</p>
      </div>
    </div>
  );
};

export default EmergencyContactDetails;
