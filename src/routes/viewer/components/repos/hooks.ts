import { navigate, useLocation } from "rakkasjs";
import { useEffect, useState, useTransition } from "react";
import { RepositoryOrderField } from "./__generated__/RepositoriesPaginationQuery.graphql";


export interface RepoSearchParms {
  ifk: "true" | "false";
  oBy: RepositoryOrderField;
  dir: "ASC" | "DESC";
}

export function useRepoSearchQuery() {
  const { current } = useLocation();

  const initialParams = {
    ifk: current.searchParams.get("ifk") ?? "false",
    oBy: current.searchParams.get("oBy") ?? "PUSHED_AT",
    dir: current.searchParams.get("dir") ?? "DESC",
  } as any as RepoSearchParms;

  const [_, startTransition] = useTransition();
  const [params, setParams] = useState<RepoSearchParms>(initialParams);
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
