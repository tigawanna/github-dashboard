import { useTransition, useState, useEffect } from "react";

import { useDebouncedValue } from "@/hooks/use-debouncer";
import { useLocation, useNavigate, useRouterState, useSearch } from "@tanstack/react-router";
import { SearchType } from "@/routes/-components/search/__generated__/SearchListQuery.graphql";

export function useAdvancedGithubSearch() {
  const { status } = useRouterState();
  const current = useLocation();
  const navigate = useNavigate();
  const seq = useSearch({
    from: "/$user/search/",
  });
  // const initSearchType = current.searchParams.get("st") as SearchType | null;
  // const initSearchValue = current.searchParams.get("sq") ?? "";
  const [, startTransition] = useTransition();
  const [keyword,setKeyword] = useState("")
  const { debouncedValue, setDebouncedValue, isDebouncing } = useDebouncedValue(
    keyword,
    5000,
    (debouced) => {
      startTransition(() => {
        navigate({
          from: "/$user/search",
          search: {
            q: debouced,
            ...seq,
          },
        })
      });
    }
  );

  const [searchType, setSearchType] = useState<SearchType>("REPOSITORY");
  return {
    debouncedValue,
    setDebouncedValue,
    isDebouncing,
    searchType,
    setSearchType,
    startTransition,
    setKeyword,
    current,
  };
}
