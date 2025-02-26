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
import { filterComparatorsArray, DateRangeFilter } from "../shared";
import { Button } from "@/components/shadcn/ui/button";
import { Calendar, X } from "lucide-react";

interface DatedValueFiltersProps {
  field: DateRangeFilter;
  allFilters: string[];
  setAllFilters: React.Dispatch<React.SetStateAction<string[]>>;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export function DatedValueFilters({
  field,
  allFilters,
  setOpen,
  setAllFilters,
}: DatedValueFiltersProps) {
  const [exactValue, setExactValue] = useState("");
  const [lessThanValue, setLessThanValue] = useState("");
  const [greaterThanValue, setGreaterThanValue] = useState("");

  const sillyRangeState =
    lessThanValue && greaterThanValue && new Date(lessThanValue) < new Date(greaterThanValue);

  const rangeValuesWillBeIgnored = Boolean(exactValue);

  const disableApplyButton = () => {
    if (sillyRangeState) {
      return true;
    }
    return false;
  };
  const clearExactAmount = () => {
    setExactValue("");
  }
  const updateRangeFilters = () => {
    setAllFilters((prev) => {
      const newArray = prev.filter((f) => !f.startsWith(field));
      if (exactValue) {
        newArray.push(`${field}${exactValue}`);
      } else {
        if (lessThanValue) {
          newArray.push(`${field}<=${lessThanValue}`);
        }
        if (greaterThanValue) {
          newArray.push(`${field}>${greaterThanValue}`);
        }
      }
      return newArray;
    });
    setOpen(false);
  };

  return (
    <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
      <div className="w-full flex items-center justify-center relative">
        <Input type="date" value={exactValue} 
        onChange={(e) => setExactValue(e.target.value)} />
        <X className="cursor-pointer size-4 absolute right-2" onClick={clearExactAmount} />
      </div>
      <div
        data-disabled={rangeValuesWillBeIgnored}
        className="w-full h-full flex flex-wrap items-center justify-center disabled-container">
        <div className="w-fit flex-1 flex flex-col items-center justify-center">
          <div
            data-error={sillyRangeState}
            className="w-full error-border-data flex items-center justify-center">
            <Input
              type="date"
              value={lessThanValue}
              onChange={(e) => setLessThanValue(e.target.value)}
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
            <p className="text-error text-sm">End date cannot be before start date</p>
          )}
        </div>
        <div className="min-w-fit px-2">{field}</div>
        <div className="w-fit flex-1 flex flex-col items-center justify-center">
          <div
            data-error={sillyRangeState}
            className="w-full error-border-data flex items-center justify-center">
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
              type="date"
              value={greaterThanValue}
              onChange={(e) => setGreaterThanValue(e.target.value)}
            />
          </div>
          {sillyRangeState && (
            <p className="text-error text-sm">Start date cannot be after end date</p>
          )}
        </div>
      </div>
      {rangeValuesWillBeIgnored && (
        <div className="w-full px-2 text-sm text-center text-error-content">
          range values get ignored when an exact value is specified and vice versa
        </div>
      )}
      <Button disabled={disableApplyButton()} className="w-full" onClick={updateRangeFilters}>
        Apply
      </Button>
    </div>
  );
}

interface DatedValueFiltersDialogProps {
  field: DateRangeFilter;
  allFilters: string[];
  setAllFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

export function DatedValueFiltersDialog({
  field,
  allFilters,
  setAllFilters,
}: DatedValueFiltersDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="btn btn-sm btn-outline rounded-2xl">
        {field}
        <Calendar className="size-4"/>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter by {field}</DialogTitle>
          <DialogDescription>
            {"Uses github search syntax like created:>=2020-01-01 created:<2023-01-01"}
          </DialogDescription>
        </DialogHeader>
        <DatedValueFilters
          field={field}
          allFilters={allFilters}
          setAllFilters={setAllFilters}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
