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
    <div>
      <h1 className="text-3xl font-bold mb-5">Employment And Income</h1>
      <hr className="mb-4" />
      <div className="flex gap-10">
        <p>Job: {IncomeDetails?.job}</p>
        <p>Income: {IncomeDetails?.income}</p>
      </div>
    </div>
  );
};

export default EmploymentAndIncome;
