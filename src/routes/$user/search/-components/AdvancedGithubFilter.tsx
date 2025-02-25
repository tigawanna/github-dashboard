import { SearchType } from "@/routes/-components/search/__generated__/SearchListQuery.graphql";
import { RepoInFilters } from "./RepoInFilters";
import { useState } from "react";
import { Badge } from "@/components/shadcn/ui/badge";
import { ForkRangesFilter } from "./ForkRangesFilter";

interface AdvancedGithubFilterProps {
  isDebouncing: boolean;
  startTransition: React.TransitionStartFunction;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  searchType: SearchType;
  debouncedValue: string;
  setSearchType: React.Dispatch<React.SetStateAction<SearchType>>;
}

export function AdvancedGithubFilter({}:AdvancedGithubFilterProps){
  const [allFilters,setAllFilters]=useState([""])
return (
 <div className='w-full p-2 flex flex-col items-center justify-center'>
  <RepoInFilters  allFilters={allFilters} setAllFilters={setAllFilters}/>
  <ForkRangesFilter allFilters={allFilters} setAllFilters={setAllFilters}/>
  <div className="w-full flex gap-2">
    {allFilters.map((filter) => (
      <Badge variant={"outline"} key={filter} className="border border-primary rounded-2xl">{filter}</Badge>
    ))}
  </div>
 </div>
);
}
