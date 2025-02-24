import { SearchInputSection } from "@/routes/-components/search/SearchInputSection";
import { SearchListSuspenseFalllback, SearchList } from "@/routes/-components/search/SearchList";
import {  Suspense } from "react";
import { useAdvancedGithubSearch } from "./use-advanced-search";


interface SearchPageProps {}

export function SearchPage({}: SearchPageProps) {
      const {
        debouncedValue,
        isDebouncing,
        startTransition,
        searchType,
        setKeyword,
        setSearchType,
      } = useAdvancedGithubSearch();
  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-center">
      <div className="w-full h-[80vh] flex flex-col items-center gap-3">

        <SearchInputSection
          debouncedValue={debouncedValue}
          isDebouncing={isDebouncing}
          setKeyword={setKeyword}
          searchType={searchType}
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
    </div>
  );
}
