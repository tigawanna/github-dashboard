import { useState } from "react";
import { NumberedValueFilters } from "./NumberedValueFilters";

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
  const [forkranges, setForkranges] = useState();

  const [lessThanValue, setLessThanValue] = useState(0);
  const [greaterThanValue, setGreaterThanValue] = useState(0);
  const [exactValue, setExactValue] = useState(-1);

  const [compares, setCompares] = useState({
    ">=": "gte",
    ">": "gt",
    "<=": "lte",
    "<": "lt",
  } as const);
  const comparatorsArray = Object.entries(compares);


  return (
    <div className="w-full  flex flex-col gap-3 items-center justify-center">
      <NumberedValueFilters
        allFilters={allFilters}
        fieldName="forks:"
        setAllFilters={setAllFilters}
      />
    </div>
  );
}

