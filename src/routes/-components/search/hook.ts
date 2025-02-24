import { useTransition, useState, useEffect } from "react";

import { SearchType } from "./__generated__/SearchListQuery.graphql";
import { useDebouncedValue } from "@/hooks/use-debouncer";
import { useLocation } from "@tanstack/react-router";

export function useGithubSearch() {
  const current = useLocation();
  // const initSearchType = current.searchParams.get("st") as SearchType | null;
  // const initSearchValue = current.searchParams.get("sq") ?? "";

  const [, startTransition] = useTransition();
  const { debouncedValue, setDebouncedValue, isDebouncing } = useDebouncedValue(
    "",
    5000,
  );
  const [searchType, setSearchType] = useState<SearchType>(
    "REPOSITORY",
  );


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
