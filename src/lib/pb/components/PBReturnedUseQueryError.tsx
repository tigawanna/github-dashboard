import type { ClientResponseError } from "pocketbase";

interface ReturnedUseQueryErorProps {
  error: ClientResponseError | Error | null;
}

export function PBReturnedUseQueryError({ error }: ReturnedUseQueryErorProps) {
  return (
    <div className="flex h-fit items-center justify-center rounded-lg border bg-error-content p-[2%] text-sm">
      {error && (
        <div className="rounded-lg p-2 text-error">{error.message}</div>
      )}
    </div>
  );
}
