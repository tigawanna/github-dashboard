import { GetBetterTokenScopes } from "@/routes/-components/GetBetterTokenScopes";
import { CheckCircle2, CircleAlert, CircleX } from "lucide-react";
import toast, { ToastOptions } from "react-hot-toast";

export interface MakeToasterProps extends ToastOptions {
  title: string;
  description?: string;
  mixed?: {
    successfull?: string;
    failed?: string;
  };
  duration?: number;
  variant: "success" | "error" | "info" | "warning" | "mixed";
}

export function makeHotToast({
  title,
  description,
  variant = "info",
  mixed,
  ...props
}: MakeToasterProps) {
  const toastVariantStyle = (toastAvriant: typeof variant) => {
    switch (toastAvriant) {
      case "success":
        return " to-success text-success";
      case "info":
        return "to-info text-info";
      case "warning":
        return "to-warning text-warning";
      case "error":
        return "to-error text-error";
      case "mixed":
        return "to-info text-info";
      default:
        return "to-info text-info";
    }
  };
  // @ts-expect-error
  return toast.custom((t) => {
    if (title?.includes("Insufficient Scopes")) {
      return <GetBetterTokenScopes dismiss={()=>toast.dismiss(t.id)} />;
    }
      return (
        <div
          className={`${t.visible ? "animate-enter" : "animate-leave"} ${toastVariantStyle(
            variant
          )} pointer-events-auto flex w-full max-w-md border-none rounded-2xl bg-base-300 text-base-content shadow-lg ring-1 ring-success ring-opacity-5 dark:shadow-xs`}>
          <div className="w-0 flex-1 p-4">
            <div className="flex items-center justify-center">
              <div className="h-full shrink-0 items-center justify-center pt-0.5">  
                {variant === "success" && (
                  <CheckCircle2 className="aspect-square h-full text-success" />
                )}
                {variant === "info" && <CircleAlert className="aspect-square h-full text-info" />}
                {variant === "warning" && (
                  <CircleAlert className="aspect-square h-full text-warning" />
                )}
                {variant === "error" && <CircleX className="aspect-square h-full text-error" />}
              </div>
              <div className="ml-3 flex-1">
                <p className="font-medium">{title}</p>
                <p className="mt-1 text-sm">{description}</p>
                {mixed && (
                  <div className="ml-3 flex flex-col gap-1">
                    <div className="text-sm text-success flex gap-1 items-center">
                      <CheckCircle2 className="aspect-square h-full text-success" />
                      {mixed?.successfull}
                    </div>
                    <div className="text-sm text-error flex gap-1 items-center">
                      <CircleX className="aspect-square h-full text-error" />
                      {mixed?.failed}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex border-l border-success">
            <button onClick={() => toast.dismiss(t.id)} className="btn btn-ghost h-full w-full">
              Close
            </button>
          </div>
        </div>
      );
    },
    { ...props, position: "bottom-left" },
  );
}


