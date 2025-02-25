import { useState } from "react";
import { Input } from "@/components/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";

interface ForkRangesFilterProps {
  allFilters: string[];
  setAllFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

const baseforkSelector = "fork:";
const comparatprs = {
  gte: ">=",
  gt: ">",
  lte: "<=",
  lt: "<",
} as const;
const comparatorsArray = Object.entries(comparatprs);
export function ForkRangesFilter({ allFilters, setAllFilters }: ForkRangesFilterProps) {
  const [forkranges, setForkranges] = useState();

  const [lessThanvalue,setLessThanvalue]= useState(0);
  const [greaterThanvalue,setGreaterThanvalue]= useState(0);
  const [exactValue,setExactValue]= useState(-1);

  const [compares,setCompares]=useState({
    ">=":0,
     ">":0,
     "<=":0,
     "<":0 
  }as const)
const comparatorsArray = Object.keys(compares);
  // const forkRagesarray = [];
  // function setforkRangefilter(){
  //     if(forkranges[1]){

  //     }
  // }
  return (
    <div className="w-full  flex flex-col items-center justify-center">
      <div className="w-full  flex  items-center justify-center">
        {/* greter than */}
        <Select>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder=">" />
          </SelectTrigger>
          <SelectContent>
            {comparatorsArray
              .filter((k) => k.startsWith(">"))
              .map((k) => {
                return <SelectItem value={k}>{k}</SelectItem>;
              })}
          </SelectContent>
        </Select>
        <Input className="" />
      </div>
    </div>
  );
}
