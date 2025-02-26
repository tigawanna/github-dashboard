import { Input } from "@/components/shadcn/ui/input";
import { SetStateAction, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { filterComparatorsArray, RepositoryFilter } from "./shared";
import { Button } from "@/components/shadcn/ui/button";
import { X } from "lucide-react";


interface NumberedValueFiltersProps {
  field: RepositoryFilter;
  allFilters: string[];
  setAllFilters: React.Dispatch<React.SetStateAction<string[]>>;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export function NumberedValueFilters({
  field,
  allFilters,
  setOpen,
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
  const disableApplyButton = () => {
    if (sillyRangeState) {
      return true;
    }
    return false;
  };
  const updateRangeFilters = () => {
    setAllFilters((prev) => {
      const newArray = prev.filter((f) => !f.startsWith(field.name));
      if (exactValue > -1) {
        newArray.push(`${field.name}${exactValue}`);
      } else {
        if (lessThanValue > 0) {
          newArray.push(`${field.name}<=${lessThanValue}`);
        }
        if (greaterThanValue > 0) {
          newArray.push(`${field.name}>${greaterThanValue}`);
        }
      }
      return newArray;
    });
    setOpen(false);
  };

  const clearExactAmount = () => {
    setExactValue(-1);
  }
  return (
    <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
      <div className="w-full  flex items-center relative justify-center">
        <Input
          type="number"
          value={exactValue}
          onChange={(e) => setExactValue(parseInt(e.target.value))}
        />
        <X className="cursor-pointer size-4 absolute right-[7%]" onClick={clearExactAmount} />
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
        <div className="min-w-fit px-2">{field.name}</div>
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

interface NumberedValueFiltersDialogProps {
  field: RepositoryFilter;
  allFilters: string[];
  setAllFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

export function NumberedValueFiltersDialog({
  field,
  allFilters,
  setAllFilters,
}: NumberedValueFiltersDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="btn btn-sm rounded-2xl btn-outline">
        {field.name}
        {field.icon}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter by {field.name}</DialogTitle>
          <DialogDescription>
            {
              "Uses github search syntax like language:javascript stars:>100 forks:<500 size:>10000 size:<50000"
            }
          </DialogDescription>
        </DialogHeader>
        <NumberedValueFilters
          field={field}
          allFilters={allFilters}
          setAllFilters={setAllFilters}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
