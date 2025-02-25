import { Input } from "@/components/shadcn/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { filterComparatorsArray, RepositoryFilter } from "./shared";
import { Button } from "@/components/shadcn/ui/button";

interface NumberedValueFiltersProps {
  fieldName: RepositoryFilter;
  allFilters: string[];
  setAllFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

export function NumberedValueFilters({
  fieldName,
  allFilters,
  setAllFilters,
}: NumberedValueFiltersProps) {
  const [exactValue, setExactValue] = useState(-1);
  const [lessThanValue, setLessThanValue] = useState(0);
  const [greaterThanValue, setGreaterThanValue] = useState(0);
  const updateLessThanValue = (newValue: string) => {
    const newNumber = parseInt(newValue);
    if (newNumber < 0) return;
    setLessThanValue(newNumber);
  };
  const updateGreaterThanValue = (newValue: string) => {
    const newNumber = parseInt(newValue);
    if (newNumber < 0) return;
    setGreaterThanValue(newNumber);
  };
  const sillyRangeState = lessThanValue > greaterThanValue;
  const rangeValuesWillBeIgnored = exactValue > -1;
  const disableApplyButton = ()=>{
    if(sillyRangeState){
      return true
    }
    return false
  }
  const updateRangeFilters = () => {
    setAllFilters((prev) => {
      const newArray = prev.filter((f) => !f.startsWith(fieldName));
      if (exactValue > -1) {
        newArray.push(`${fieldName}${exactValue}`);
      } else {
        if (lessThanValue > 0) {
          newArray.push(`${fieldName}<=${lessThanValue}`);
        }
        if (greaterThanValue > 0) {
          newArray.push(`${fieldName}>${greaterThanValue}`);
        }
      }
      return newArray;
    });
  };
  return (
    <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
      <div className="w-full  flex flex-col items-center justify-center">
        <Input
          type="number"
          value={exactValue}
          onChange={(e) => setExactValue(parseInt(e.target.value))}
        />
      </div>
      <div
        data-disabled={rangeValuesWillBeIgnored}
        className="w-full h-full flex flex-wrap  items-center justify-center disabled-container ">
        <div className="w-fit flex-1 flex flex-col items-center justify-center">
          <div
            data-error={sillyRangeState}
            className="w-full error-border-data  flex  items-center justify-center">
            <Input
              className=""
              type="number"
              value={lessThanValue}
              onChange={(e) => updateLessThanValue(e.target.value)}
            />
            <Select>
              <SelectTrigger className="w-[100px] min-w-fit">
                <SelectValue placeholder="lt <" />
              </SelectTrigger>
              <SelectContent>
                {filterComparatorsArray
                  .filter(([k, v]) => k.startsWith("<"))
                  .map(([k, v]) => {
                    return (
                      <SelectItem key={k} value={k}>
                        {k} {v}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
          </div>
          {sillyRangeState && (
            <p className="text-error text-sm">cannot be bigger than greater than value</p>
          )}
        </div>
        <div className="min-w-fit   px-2">{fieldName}</div>
        {/* greater than */}
        <div className="w-fit flex-1   flex flex-col items-center justify-center">
          <div
            data-error={sillyRangeState}
            className="w-full error-border-data  flex  items-center justify-center">
            <Select>
              <SelectTrigger className="w-[100px] min-w-fit">
                <SelectValue placeholder="gt >" />
              </SelectTrigger>
              <SelectContent>
                {filterComparatorsArray
                  .filter(([k, v]) => k.startsWith(">"))
                  .map(([k, v]) => {
                    return (
                      <SelectItem key={k} value={k}>
                        {v} {k}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
            <Input
              className=""
              type="number"
              value={greaterThanValue}
              onChange={(e) => updateGreaterThanValue(e.target.value)}
            />
          </div>
          {sillyRangeState && (
            <p className="text-error text-sm">cannot be smaller than less than value</p>
          )}
        </div>
      </div>
      {rangeValuesWillBeIgnored && (
        <div className="w-full px-2 text-sm text-center text-error-content">
          range values get ignored when an exact value is specified and vice versa
        </div>
      )}
      <Button
        disabled={disableApplyButton()}
        className="w-full"
        onClick={() => {
          updateRangeFilters();
        }}>
        Apply
      </Button>
    </div>
  );
}
