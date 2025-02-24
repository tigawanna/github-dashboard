import { Suspense } from "react";
import { SearchList, SearchListSuspenseFalllback } from "./SearchList";
import { useGithubSearch } from "./hook";
import { SearchInputSection } from "./SearchInputSection";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcn/ui/dialog";
import { Search } from "lucide-react";
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
    <Dialog>
      <DialogTrigger className="w-full">
       <div className="w-full flex items-center justify-end gap-2 px-3">
       <div className="input border border-base-200 w-full md:w-[60%] ">
        Search for {searchType}
      </div>
        <Search/>
       </div>
        </DialogTrigger>
      <DialogContent className="w-full min-w-[80%] max-h-[95vh] ">
        <DialogHeader>
          <DialogTitle>Search for {searchType}</DialogTitle>
          <DialogDescription>
            you can use github's search syntax to refine
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-[80vh] flex flex-col items-center gap-3">

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
      </DialogContent>
    </Dialog>
  );
}
