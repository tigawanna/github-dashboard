import { useState } from "react";
import { NumberedValueFilters, NumberedValueFiltersDialog } from "./NumberedValueFilters";
import { reposRangedFilters } from "./shared";

interface RepositoryRangesFilterProps {
  allFilters: string[];
  setAllFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

const baseforkSelector = "fork:";
const comparatprs = {
  gte: ">=",
  gt: ">",
  lte: "<=",
  lt: "<",
} as const;
const comparatorsArray = Object.entries(comparatprs);
export function RepositoryRangesFilter({ allFilters, setAllFilters }: RepositoryRangesFilterProps) {

return (
  <div className="w-full  flex flex-col gap-3 items-center justify-center">
    <ul className="w-full  flex flex-wrap gap-3 items-center justify-center">
      <li className="">Filter by:</li>
      {reposRangedFilters.map((filter) => (
        <div key={filter.name} className="w-[30$]">
          <NumberedValueFiltersDialog
            allFilters={allFilters}
            field={filter}
            setAllFilters={setAllFilters}
          />
        </div>
      ))}
    </ul>
  </div>
);
}

