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
    <div className="space-y-4">
      <p className="text-sm md:text-base font-medium">Rental History</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          placeholder="Previous Address"
          value={history}
          onChange={(e) => setHistory(e.target.value)}
        />
        <Input
          placeholder="Length of Stay"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>

      <Textarea
        className="min-h-[100px]"
        placeholder="Reason for Leaving"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
    </div>
  );
};

export default RentalHistory;
