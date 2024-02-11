import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Suspense, useEffect, useState, useTransition } from "react";
import { Input } from "@/components/shadcn/ui/input";
import { useDebouncedValue } from "@/utils/hooks/debounce";
import { SearchList, SearchListSuspenseFalllback } from "./SearchList";
import { SearchType } from "./__generated__/SearchListQuery.graphql";
import { navigate, useLocation } from "rakkasjs";
interface SearchBarProps {}

export function SearchBar({}: SearchBarProps) {
  const {current} = useLocation()
  const initSearchType = current.searchParams.get("ST") as SearchType|null
  const initSearchValue = current.searchParams.get("SQ")??""

  const [, startTransition] = useTransition();
  const { debouncedValue, setDebouncedValue, isDebouncing } = useDebouncedValue(
    initSearchValue,
    5000,
  );
  const [searchType, setSearchType] = useState<SearchType>(initSearchType??"REPOSITORY");

  useEffect(() => {
    const new_url = new URL(current)
    if(debouncedValue&& debouncedValue!==initSearchValue) {
      new_url.searchParams.set("SQ",debouncedValue)
    }
    if(searchType && searchType!==initSearchType) {
      new_url.searchParams.set("ST",searchType)
    }
    startTransition(() => {
      navigate(new_url.toString())
    })
  },[debouncedValue,searchType])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <div className="w-full flex items-center justify-center">
        <div className="w-full relative">
          <Input
            placeholder="Search"
            className="w-full"
            onChange={(e) => {
              startTransition(() => {
                setDebouncedValue((prev) => {
                  return e.target.value;
                });
              });
            }}
          />
          {isDebouncing&&<div className="absolute inset-y-0 right-0 flex items-center pr-3">....</div>}
        </div>
        <Select
          value={searchType}
          onValueChange={(v: SearchType) => {
            startTransition(() => {
              setSearchType(v);
            });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Search type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              <SelectItem value="REPOSITORY">Repository</SelectItem>
              <SelectItem value="USER">User</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full overflow-auto">

      <Suspense fallback={<SearchListSuspenseFalllback/>}>
        <SearchList searchType={searchType} searchvalue={debouncedValue} setSearchType={setSearchType}/>
      </Suspense>
      </div>
    </div>
  );
}
