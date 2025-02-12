import { useDebouncedValue } from "@/utils/hooks/use-debouncer";
import { useSearch, useNavigate, useLocation } from "@tanstack/react-router";
import { useTransition, useState, useEffect } from "react";

interface UseGlobalPocketbaseSearchQueryProps {
  default_value?: string;
}
export function useGlobalPocketbaseSearchQuery(
  opts: UseGlobalPocketbaseSearchQueryProps = {},
) {
  const location = useLocation();
  const { globalSearch } = useSearch({ from: "__root__" });
  const navigate = useNavigate({ from: location.pathname });
  const [_, startTransition] = useTransition();

  const [keyword, setKeyword] = useState(
    globalSearch ?? opts.default_value ?? "",
  );
  const { debouncedValue, isDebouncing } = useDebouncedValue(keyword, 2000);
  useEffect(() => {
    if (globalSearch !== debouncedValue) {
      startTransition(() => {
        navigate({
          search: {
            // @ts-expect-error
            globalSearch: debouncedValue,
          },
        });
      });
    }
  }, [debouncedValue]);
  return { debouncedValue, isDebouncing, keyword, setKeyword };
}
