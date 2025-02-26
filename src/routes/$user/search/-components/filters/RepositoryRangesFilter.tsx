import { NumberedValueFiltersDialog } from "./NumberedValueFilters";
import { dateRangeFilters, reposRangedFilters } from "../shared";
import { DatedValueFiltersDialog } from "./DatedValueFilters";

interface RepositoryRangesFilterProps {
  allFilters: string[];
  setAllFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

export function RepositoryRangesFilter({ allFilters, setAllFilters }: RepositoryRangesFilterProps) {

return (
  <div className="w-full flex flex-col gap-3 items-center justify-center">
    <ul className="w-full  flex flex-wrap gap-3 items-center justify-center ">
      {reposRangedFilters.map((filter) => (
        <div key={filter.name} className="w-[30$]">
          <NumberedValueFiltersDialog
            allFilters={allFilters}
            field={filter}
            setAllFilters={setAllFilters}
          />
        </div>
      ))}
      {dateRangeFilters.map((filter) => (
        <DatedValueFiltersDialog
        key={filter}
        field={filter}
        allFilters={allFilters}
        setAllFilters={setAllFilters}
        />
      ))}
    </ul>
  </div>
);
}

