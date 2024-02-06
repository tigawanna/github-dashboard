import { usePaginationFragmentHookType } from "react-relay/relay-hooks/usePaginationFragment";

interface LoadMoreButtonProps<
  K extends Readonly<{ " $data"?: unknown; " $fragmentSpreads": unknown }>,
  D,
> {
  frag: usePaginationFragmentHookType<any, K, D | null | undefined>;
}

export function LoadMoreButton<
  K extends Readonly<{ " $data"?: unknown; " $fragmentSpreads": unknown }>,
  D,
>({frag}: LoadMoreButtonProps<K, D>) {
    if(!frag) return null
    if(!frag.hasNext) return null
    
  return (
    <div className="flex items-center justify-center">
      <button
        className=" hover:text-purple-400 shadow-lg hover:shadow-purple"
        onClick={() => {
          frag.loadNext(10);
        }}
      >
        --- load more --- {frag.isLoadingNext ? "loading..." : ""}
      </button>
    </div>
  );
}
