
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { Label } from "@/components/shadcn/ui/label";

interface IsFiltersProps {
  allFilters: string[];
  setAllFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

const isFilters = [
  {
    type: "is:fork",
    value: "is:fork",
    label: "Forked Repos",
  },
  {
    type: "is:archived",
    value: "is:archived",
    label: "Archived Repos",
  },
  {
    type: "is:fork",
    value: "NOT is:fork",
    label: "No Forked Repos",
  },
  {
    type: "is:archived",
    value: "NOT is:archived",
    label: "No Archived Repos",
  },
];    
export function IsFilters({allFilters,setAllFilters}:IsFiltersProps){

const hasFilter = (value: string) => {
  const inFiltersSet = new Set(allFilters);
  return inFiltersSet.has(value);
};

function handleChecked(checked: boolean, value: string) {
  if (hasFilter(value) && checked === false) {
    setAllFilters((prev) => {
      return prev.filter((f) => f !== value);
    });
  } else {
    setAllFilters((prev) => {
      // Find the selected filter's type
      const selectedFilter = isFilters.find((filter) => filter.value === value);
      const filterType = selectedFilter?.type;

      // Remove any other filter with the same type
      let updatedFilters = prev.filter((existingValue) => {
        const existingFilter = isFilters.find((filter) => filter.value === existingValue);
        return existingFilter?.type !== filterType;
      });

      // Add the new filter
      return [...updatedFilters, value];
    });
  }
}

return (
  <div className="w-full  space-y-2 p-2">
    <div className="space-y-2 flex w-full flex-wrap justify-center gap-5">
      {isFilters.map((filter) => (
        <div key={filter.value} className="flex  items-center space-x-2 ">
          <Checkbox
            className="border border-primary"
            id={filter.value}
            checked={hasFilter(filter.value)}
            onCheckedChange={(checked) => {
              handleChecked(checked as boolean, filter.value);
            }}
          />
          <Label htmlFor={filter.value}>{filter.label}</Label>
        </div>
      ))}
    </div>
  </div>
);
}
