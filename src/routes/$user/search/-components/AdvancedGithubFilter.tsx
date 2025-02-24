import { SearchType } from "@/routes/-components/search/__generated__/SearchListQuery.graphql";

interface AdvancedGithubFilterProps {
  isDebouncing: boolean;
  startTransition: React.TransitionStartFunction;
  setDebouncedValue: React.Dispatch<React.SetStateAction<string>>;
  searchType: SearchType;
  debouncedValue: string;
  setSearchType: React.Dispatch<React.SetStateAction<SearchType>>;
}

export function AdvancedGithubFilter({}:AdvancedGithubFilterProps){
return (
 <div className='w-full p-2 flex flex-col items-center justify-center'>

 </div>
);
}
