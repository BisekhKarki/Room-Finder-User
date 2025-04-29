import React from "react";

interface income {
  income: string;
  job: string;
}

interface Props {
  IncomeDetails: income | null;
}

const EmploymentAndIncome = ({ IncomeDetails }: Props) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4">
        Employment & Income
      </h1>
      <hr className="border-gray-200 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
        <div className="space-y-1">
          <p className="font-medium">Occupation:</p>
          <p>{IncomeDetails?.job}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Monthly Income:</p>
          <p>{IncomeDetails?.income}</p>
        </div>
      </div>
    </div>
  );
};

export default EmploymentAndIncome;
