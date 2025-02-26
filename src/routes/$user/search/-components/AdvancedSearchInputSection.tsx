import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Input } from "@/components/shadcn/ui/input";
import { Loader } from "lucide-react";
import { SearchType } from "@/routes/-components/search/__generated__/SearchListQuery.graphql";
import { AdvancedReposFilter } from "./AdvancedReposFilter";


interface AdvancedSearchInputSectionProps {
  isDebouncing: boolean;
  startTransition: React.TransitionStartFunction;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  searchType: SearchType;
  debouncedValue: string;
  setSearchType: React.Dispatch<React.SetStateAction<SearchType>>;
}

export function AdvancedSearchInputSection({
  isDebouncing,
  debouncedValue,
  startTransition,
  searchType,
  setKeyword,
  setSearchType,
}: AdvancedSearchInputSectionProps) {


  return (
    <div
      className="w-full flex items-center justify-center">
      <div className="w-full flex items-center justify-center gap-2">
        <div className="w-full relative">
          <Input
            placeholder="Search"
            className="w-full"
            defaultValue={debouncedValue}
            onChange={(e) => {
              startTransition(() => {
                setKeyword((prev) => {
                  return e.target.value;
                });
              });
            }}
          />
          {isDebouncing && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Loader className="animate-spin" />
            </div>
          )}
        </div>
        <Select
          value={searchType}
          onValueChange={(v: SearchType) => {
            startTransition(() => {
              setSearchType(v);
            });
          }}>
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
        {searchType === "REPOSITORY" && (
          <AdvancedReposFilter
            debouncedValue={debouncedValue}
            isDebouncing={isDebouncing}
            setKeyword={setKeyword}
            searchType={searchType}
            setSearchType={setSearchType}
            startTransition={startTransition}
          />
        )}
        {/* {current.pathname !== "/" && debouncedValue.length > 0 && (
          <div className="min-w-[40px]">
            <Link href={navigate_to.toString()}>
              <Search className="w-5 h-5 hover:text-secondary" />
            </Link>
          </div>
        )} */}
      </div>
    </div>
  );
}
