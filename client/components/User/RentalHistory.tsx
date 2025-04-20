"use client";
import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface RentalHistoryProps {
  history: string;
  setHistory: (value: string) => void;
  length: string;
  setLength: (value: string) => void;

  reason: string;
  setReason: (value: string) => void;
}

const RentalHistory = ({
  history,
  setHistory,
  length,
  setLength,

  reason,
  setReason,
}: RentalHistoryProps) => {
  return (
    <div className="space-y-3">
      <p>Rental History</p>
      <div className="flex gap-5">
        <Input
          className=""
          placeholder="Previous Rental Address"
          value={history}
          onChange={(e) => setHistory(e.target.value)}
        />

        <Input
          className=""
          placeholder="Length of Stay at Previous Address"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>

      <Textarea
        className=""
        placeholder="Reason for Leaving Previous Rental"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
    </div>
  );
};

export default RentalHistory;
