import { LucideIcon } from "lucide-react";
import {  IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface NumberStatsProps {
stat?:number;
Icon:IconType|LucideIcon
className?:string
iconClassName?:string
}

export function NumberStats({Icon,stat,className,iconClassName}:NumberStatsProps){
if(!stat){
  return null
}
return (
  <div
    className={twMerge(
      "min-w-fit flex items-center justify-evenly gap-1 bg-primary/90 px-3 py-0 rounded-3xl",
      className
    )}>
    <span className="font-bold">{stat}</span>
    <Icon className={twMerge("size-5", iconClassName)} />
  </div>
);
}
