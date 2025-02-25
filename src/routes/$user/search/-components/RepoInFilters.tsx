import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { Label } from "@/components/shadcn/ui/label";
import { useSearch } from "@tanstack/react-router";
import { useState, useTransition } from "react";

/** Array of GitHub repository search filter options */
const inSearchFilters = [
  /** Filter to search within repository names */
  { value: "in:name", label: "Repository Name" },

  /** Filter to search within repository descriptions */
  { value: "in:description", label: "Description" },

  /** Filter to search within repository topics */
  { value: "in:topics", label: "Topics" },

  /** Filter to search within repository README files */
  { value: "in:readme", label: "README" },
] as const;

type SearchFilter = (typeof inSearchFilters)[number]["value"];
interface WordInfiltersProps {
  allFilters: string[];
  setAllFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

export function RepoInFilters({allFilters,setAllFilters}: WordInfiltersProps) {

  const [isPending, startTransition] = useTransition();
  const { in: currentFilter, ...rest } = useSearch({ from: "/$user/search/" });


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
        return [...prev, value];
      });
    }
  }

  return (
    <div className="w-full  space-y-2">
      <Label htmlFor="search-filter">Search In</Label>
      <div className="space-y-2 flex w-full ">
        {inSearchFilters.map((filter) => (
          <div key={filter.value} className="flex items-center space-x-2 w-full">
            <Checkbox
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

      <p className="text-sm text-muted-foreground">
        {isPending ? "Updating..." : "Select where to search in repositories"}
      </p>
    </div>
  );
}
