import { Suspense } from "react";
import { SearchList, SearchListSuspenseFalllback } from "./SearchList";
import { useGithubSearch } from "./hook";
import { SearchInputSection } from "./SearchInputSection";
interface SearchBarProps {}

export function SearchBar({}: SearchBarProps) {
  const {
    debouncedValue,
    isDebouncing,
    startTransition,
    setDebouncedValue,
    searchType,
    setSearchType,
  } = useGithubSearch();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <SearchInputSection
        debouncedValue={debouncedValue}
        isDebouncing={isDebouncing}
        searchType={searchType}
        setDebouncedValue={setDebouncedValue}
        setSearchType={setSearchType}
        startTransition={startTransition}
      />
      <div className="w-full overflow-auto">
        <Suspense fallback={<SearchListSuspenseFalllback />}>
          <SearchList
            searchType={searchType}
            searchvalue={debouncedValue}
            setSearchType={setSearchType}
          />
        </Suspense>
      </div>
    </div>
  );
}
