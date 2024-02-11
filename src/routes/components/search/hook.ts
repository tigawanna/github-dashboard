import { useTransition, useState, useEffect } from "react";
import { navigate, useLocation } from "rakkasjs";
import { useDebouncedValue } from "@/utils/hooks/debounce";
import { SearchType } from "./__generated__/SearchListQuery.graphql";

export function useGithubSearch() {
  const { current } = useLocation();
  const initSearchType = current.searchParams.get("ST") as SearchType | null;
  const initSearchValue = current.searchParams.get("SQ") ?? "";

  const [, startTransition] = useTransition();
  const { debouncedValue, setDebouncedValue, isDebouncing } = useDebouncedValue(
    initSearchValue,
    5000,
  );
  const [searchType, setSearchType] = useState<SearchType>(
    initSearchType ?? "REPOSITORY",
  );
  useEffect(() => {
    if (debouncedValue !== initSearchValue) {
      setDebouncedValue(initSearchValue);
    }
  }, []);
  useEffect(() => {
    const new_url = new URL(current);
    if (debouncedValue && debouncedValue !== initSearchValue) {
      new_url.searchParams.set("SQ", debouncedValue);
    }
    if (searchType && searchType !== initSearchType) {
      new_url.searchParams.set("ST", searchType);
    }
    startTransition(() => {
      navigate(new_url.toString());
    });
  }, [debouncedValue, searchType]);

  return {
    debouncedValue,
    setDebouncedValue,
    isDebouncing,
    searchType,
    setSearchType,
    startTransition,
    current,
  };
}
