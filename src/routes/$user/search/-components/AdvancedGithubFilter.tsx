import { SearchType } from "@/routes/-components/search/__generated__/SearchListQuery.graphql";
import { RepoInFilters } from "./RepoInFilters";
import { useState } from "react";
import { Badge } from "@/components/shadcn/ui/badge";
import { RepositoryRangesFilter } from "./RepositoryRangesFilter";
import { DatedValueFilters } from "./DatedValueFilters";
import { X } from "lucide-react";

interface AdvancedGithubFilterProps {
  isDebouncing: boolean;
  startTransition: React.TransitionStartFunction;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  searchType: SearchType;
  debouncedValue: string;
  setSearchType: React.Dispatch<React.SetStateAction<SearchType>>;
}

export function AdvancedGithubFilter({}: AdvancedGithubFilterProps) {
  const [allFilters, setAllFilters] = useState([""]);
  return (
    <div className="w-full p-2 flex flex-col gap-2 items-center justify-center">
      <div className="w-full p-5 flex flex-col gap-1 items-center justify-center">
        <div className="divider divider-primary">text in filters</div>
        <RepoInFilters allFilters={allFilters} setAllFilters={setAllFilters} />
        <div className="divider divider-primary">range filters</div>
        <RepositoryRangesFilter allFilters={allFilters} setAllFilters={setAllFilters} />
        <div className="divider divider-primary">filter list</div>
        <div className="w-full flex gap-2">
          {allFilters
            .filter((item) => item !== "")
            .map((filter) => (
              <div  key={filter} className="btn btn-sm  btn-outline rounded-2xl">
                {filter}{" "}
                <X
                className="hover:scale-105 size-4 transition-all duration-200 hover:text-primary"
                  onClick={() => setAllFilters((prev) => {
                    console.log("prev",prev)
                    return prev.filter((item) => item !== filter)
                  })}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
