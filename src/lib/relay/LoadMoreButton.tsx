import { usePaginationFragmentHookType } from "react-relay/relay-hooks/usePaginationFragment";

interface LoadMoreButtonProps<
  K extends Readonly<{ " $data"?: unknown; " $fragmentSpreads": unknown }>,
  D
> {
  frag: usePaginationFragmentHookType<any, K, D | null | undefined>;
}

export function LoadMoreButton<
  K extends Readonly<{ " $data"?: unknown; " $fragmentSpreads": unknown }>,
  D
>({ frag }: LoadMoreButtonProps<K, D>) {
  if (!frag) return null;
  if (!frag.hasNext) return null;

  return (
    <div className="w-full flex justify-center items-center p-2">
      <button
        className="btn btn-wide btn-sm btn-ghost"
        onClick={() => {
          frag.loadNext(10);
        }}>
        {frag.isLoadingNext ? "loading..." : "--- load more ---"}
      </button>
    </div>
  );
}
