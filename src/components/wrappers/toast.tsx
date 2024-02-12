import toast, { ToastPosition } from "react-hot-toast";
import { twJoin, twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";

interface hotToastPrps {
  title: string;
  description?: string;
  autoClose?:boolean;
  mixed?: {
    successfull?: string;
    failed?: string;
  };
  position?: ToastPosition | undefined;
  duration?: number;
  type: "success" | "error" | "info" | "warning" | "mixed";
}

export function hotToast({
  description,
  title,
  type,
  position,
  autoClose=true,
  mixed,
  duration = 3000,
}: hotToastPrps) {
  const toastVariants = cva(["border"], {
    variants: {
      type: {
        error: ["border-error", "text-error", "bg-error/5"],
        success: ["border-success", "text-success", "bg-success/5"],
        info: ["border-info", "text-info", "bg-info/5"],
        warning: ["border-warning", "text-warning", "bg-warning/5"],
        mixed: ["border-accent", "text-accent", ""],
      },
    },
  });
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        }  w-full bg-base-200  rounded-xl
        pointer-events-auto flex `}
      >
        <div
          className={twMerge(
            toastVariants({ type }),
            "flex-1 w-0 p-2 rounded-xl",
          )}
        >
          <div className="flex flex-col items-start ">
            <div className="ml-3 flex-1">
              <p className="text-lg font-bold ">{title}</p>
              <p className="mt-1 text-sm">{description}</p>
            </div>
            {mixed && (
              <div className="ml-3 flex flex-col gap-1">
                <p className="text-sm text-success">{mixed?.successfull}</p>
                <p className="text-sm text-error">{mixed?.failed}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex border-l bg-base-100">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full  p-2 rounded-lg"
          >
            <X />
          </button>
        </div>
      </div>
    ),
    { position, duration:(!autoClose || type==="error")?20000:duration,  },
  );
}
