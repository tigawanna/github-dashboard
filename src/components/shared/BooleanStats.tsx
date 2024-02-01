import { Check, LucideIcon, X } from "lucide-react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
interface BooleanStatsProps {
  stat?: boolean;
  description?: string;
  Icon?: IconType | LucideIcon;
  className?: string;
  iconClassName?: string;
}

export function BooleanStats({
  Icon,
  stat,
  className,
  iconClassName,
  description,
}: BooleanStatsProps) {
  if (stat===undefined) {
    return null;
  }
  return (
    <div
      className={twMerge(
        "min-w-fit flex items-center justify-evenly gap-1 bg-base-300 px-2 py-1 rounded-lg",
        className,
      )}
    >
      {Icon && <Icon className={twMerge("h-4 w-4", iconClassName)} />}
      {description && (
        <span className="text-sm brightness-90">{description}</span>
      )}
      <span className="font-bold">
        {stat ? (
          <Check className="h-4 w-4 text-success" />
        ) : (
          <X className="h-4 w-4 text-error" />
        )}
      </span>
    </div>
  );
}
