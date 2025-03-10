import { useTransition, useState, useEffect } from "react";
import { useDebouncedValue } from "@/hooks/use-debouncer";
import { useLocation, useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { SearchType } from "./list/__generated__/SearchListQuery.graphql";


export function useAdvancedGithubSearch() {
  const current = useLocation();
  const {user} = useParams({
    from: "/$user/search/",
  });
  const navigate = useNavigate();
  const seq = useSearch({
    from: "/$user/search/",
  });

  const [, startTransition] = useTransition();
  const [keyword,setKeyword] = useState(seq.q??"")
  const { debouncedValue, setDebouncedValue, isDebouncing } = useDebouncedValue(
    keyword,
    3000,
    (debouced) => {
      // startTransition(() => {
        navigate({
          from: "/$user/search",
          search: {
            ...seq,
            q: debouced,
          },
        })
      // });
    }
  );
  const searchFilters = seq.filters?.join(" ")??"" 

  useEffect(()=>{

    setKeyword((prev)=>{
      const userFilter = prev.split("user:")?.[1]
      if(userFilter) return prev
      return `${prev} user:${user}`
    })
  },[])
  
  const [searchType, setSearchType] = useState<SearchType>("REPOSITORY");
  return {
    debouncedValue:debouncedValue+" "+searchFilters,
    setDebouncedValue,
    isDebouncing,
    searchType,
    setSearchType,
    startTransition,
    setKeyword,
    current,
  };
}
