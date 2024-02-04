import { navigate, useLocation } from "rakkasjs";
import { useEffect, useState, useTransition } from "react";


export interface StarredRepoSearchParms {
  sDir: "ASC" | "DESC";
}

export function useStarredRepoSearchQuery() {
  const { current } = useLocation();
  const initialParams = {
    sDir:
      (current.searchParams.get("sDir") as StarredRepoSearchParms["sDir"]) ??
      "DESC",
  } satisfies StarredRepoSearchParms;

  const [_, startTransition] = useTransition();
  const [params, setParams] = useState<StarredRepoSearchParms>(initialParams);
  useEffect(() => {
    startTransition(() => {
      const url = current;
      if (url) {
        Object.entries(params).forEach(([k, v]) => {
          if (v) url.searchParams.set(k, v.toString());
        });

        navigate(url);
      }
      // check if values in parasm have changed
    });
  }, [params]);
  return {
    params,
    setParams,
  };
}
