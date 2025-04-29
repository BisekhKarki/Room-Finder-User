import React from "react";

interface EmergencyContactDetails {
  name: string;
  contact: string;
  relationship: string;
  alternateContact?: string;
}
interface Props {
  emergency: EmergencyContactDetails | null;
}

const EmergencyContactDetails = ({ emergency }: Props) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4">
        Emergency Contacts
      </h1>
      <hr className="border-gray-200 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
        <div className="space-y-1">
          <p className="font-medium">Contact Name:</p>
          <p>{emergency?.name}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Primary Contact:</p>
          <p>{emergency?.contact}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Relationship:</p>
          <p>{emergency?.relationship}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Alternate Contact:</p>
          <p>{emergency?.alternateContact || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactDetails;
