import { useTransition, useState } from "react";
import { useDebouncedValue } from "@/hooks/use-debouncer";
import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { SearchType } from "@/routes/-components/search/__generated__/SearchListQuery.graphql";

export function useAdvancedGithubSearch() {
  const current = useLocation();
  const navigate = useNavigate();
  const seq = useSearch({
    from: "/$user/search/",
  });

  const [, startTransition] = useTransition();
  const [keyword,setKeyword] = useState("")
  const { debouncedValue, setDebouncedValue, isDebouncing } = useDebouncedValue(
    keyword,
    3000,
    (debouced) => {
      startTransition(() => {
        navigate({
          from: "/$user/search",
          search: {
            ...seq,
            q: debouced,
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
