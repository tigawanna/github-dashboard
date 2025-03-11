import { FolderX } from "lucide-react";

interface EmptyListProps {
  message?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyList({
  message = "No items found",
  icon = <FolderX className="h-16 w-16" />,
  className = "",
}: EmptyListProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 w-full ${className}`}>
      <div className="text-primary/50 animate-pulse mb-4 ">{icon}</div>
      <div className="text-center">
        <h3 className="font-semibold text-2xl text-base-content/70 mb-2">{message}</h3>
        <p className="text-base-content/50 text-sm">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    </div>
  );
}
