import { concatErrors } from "@/utils/errors";

interface ErrorOutputProps {
  err: any;
}

export function ErrorWrapper({ err }: ErrorOutputProps) {
  return (
    <div className="w-full rounded-lg p-2 text-center text-error">
      {concatErrors(err)}
    </div>
  );
}
