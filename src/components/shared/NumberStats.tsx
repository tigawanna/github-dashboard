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
  <div className={twMerge("flex items-center justify-evenly gap-1", className)}>
    <span className="font-bold">{stat}</span>
    <Icon className={twMerge("h-4 w-4",iconClassName)}/>
  </div>
);
}
