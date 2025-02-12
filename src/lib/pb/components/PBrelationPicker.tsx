import {
  PBListCollection,
  type PBListCollectioncolumn,
} from "./PBListCollection";
import { SearchBox } from "@/components/search/SearchBox";
import type { CollectionName } from "@/lib/pb/client";
import { Suspense, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Check, GitFork, X } from "lucide-react";
import { useGlobalPocketbaseSearchQuery } from "./use-search-query";

interface PBrelationPickerProps<T extends Record<string, any>> {
  fieldLabel: string;
  filterBy: keyof T;
  maxSelected: number;
  columns: Partial<PBListCollectioncolumn<T>>;
  collectionName: CollectionName;
  searchParamKey: string;
  selectedRows?: T[];
  setSelectedRows: (selectedRows: T[]) => void;
  dialogTrigger?: React.ReactNode;
}

export function PBrelationPicker<T extends Record<string, any>>({
  collectionName,
  columns,
  maxSelected,
  searchParamKey,
  filterBy,
  selectedRows = [],
  setSelectedRows,
  fieldLabel,
}: PBrelationPickerProps<T>) {
  const { isDebouncing, debouncedValue, setKeyword, keyword } =
    useGlobalPocketbaseSearchQuery({ default_value: "" });
  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-auto p-2">
      <div className="flex w-full flex-col justify-between gap-3 px-3 pr-5 md:flex-row">
        <SearchBox
          inputProps={{
            placeholder: "type to search",
          }}
          debouncedValue={debouncedValue}
          isDebouncing={isDebouncing}
          setKeyword={setKeyword}
          keyword={keyword}
        />
      </div>
      <div className="h-[95%] w-full">
        <ul className="flex max-h-[25%] w-full flex-wrap gap-2 p-2">
          <li>{selectedRows?.length} selected</li>
          {selectedRows?.slice?.(0, 5)?.map((item) => (
            <li
              key={item.id}
              className="badge badge-primary badge-outline text-center"
            >
              {item[filterBy as any]}
            </li>
          ))}
          {selectedRows?.length > 5 && <li>......</li>}
        </ul>

        <Suspense
          fallback={
            <div className="flex h-full w-full flex-col gap-2 pb-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={i}
                  className="skeleton h-8 w-[95%] gap-2 rounded-lg bg-base-300/40"
                />
              ))}
            </div>
          }
        >
          <PBListCollection<T>
            selectedRows={selectedRows}
            collectionName={collectionName}
            maxSelected={maxSelected}
            columns={columns}
            debouncedValue={debouncedValue}
            searchParam={keyword}
            searchParamKey={searchParamKey}
            filterBy={filterBy}
            setSelectedRows={(rows) => setSelectedRows(rows)}
          />
        </Suspense>
      </div>
    </div>
  );
}



export function PBPickRelationField<T extends Record<string, any>>({
  collectionName,
  columns,
  searchParamKey,
  maxSelected,
  filterBy,
  selectedRows,
  setSelectedRows,
  fieldLabel,
  dialogTrigger,
}: PBrelationPickerProps<T>) {
  return (
    <div className="flex w-full flex-wrap gap-2">
      <PBPickRelationsModal
        collectionName={collectionName}
        columns={columns}
        searchParamKey={searchParamKey}
        maxSelected={maxSelected}
        filterBy={filterBy}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        fieldLabel={fieldLabel}
        dialogTrigger={dialogTrigger}
      />
      {maxSelected > 1 && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {selectedRows?.map((item) => (
            <div
              key={item.id}
              className="badge badge-primary badge-outline flex items-center justify-center"
            >
              <div className="flex items-center justify-center">
                {" "}
                {item[filterBy as any]}
              </div>

              <X
                className="size-4 hover:text-error"
                onClick={() => {
                  setSelectedRows(
                    selectedRows?.filter((i) => i.id !== item.id),
                  );
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export function PBPickRelationsModal<T extends Record<string, any>>({
  collectionName,
  columns,
  searchParamKey,
  maxSelected,
  filterBy,
  selectedRows,
  setSelectedRows,
  fieldLabel,
  dialogTrigger,
}: PBrelationPickerProps<T>) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {dialogTrigger || (
          <span className="btn btn-outline flex cursor-pointer gap-1 p-2">
            <GitFork className="" />
          </span>
        )}
      </DialogTrigger>
      <DialogContent className=" z-50 max-h-[90vh] w-[95%] gap-1 overflow-auto sm:max-w-[80%] md:w-full lg:max-w-[60%]">
        <DialogTitle className="">{fieldLabel}</DialogTitle>
        <DialogDescription className=" ">Pick a {fieldLabel}</DialogDescription>
        <div className="flex h-[90%] w-full flex-col gap-2">
          <div className="h-full">
            <PBrelationPicker
              collectionName={collectionName}
              columns={columns}
              maxSelected={maxSelected}
              searchParamKey={searchParamKey}
              filterBy={filterBy}
              fieldLabel={fieldLabel}
              setSelectedRows={setSelectedRows}
              selectedRows={selectedRows}
            />
          </div>
          <div className="flex items-center justify-center">
            <DialogClose className="btn btn-sm btn-wide flex gap-3 bg-primary/20">
              <Check className="" />
              done
            </DialogClose>
          </div>
        </div>

        {/* <DialogFooter className="sm:justify-start">
      </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

export function PBPickRelationsDaisyUIDrawer<T extends Record<string, any>>({
  collectionName,
  columns,
  searchParamKey,
  maxSelected,
  filterBy,
  selectedRows,
  setSelectedRows,
  fieldLabel,
  dialogTrigger,
}: PBrelationPickerProps<T>) {
  const [open, setOpen] = useState(false);
  return (
    <div className="drawer">
      <input
        id="relations-picker-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="relations-picker-drawer" className="">
          {dialogTrigger || (
            <span className="btn btn-outline flex cursor-pointer gap-1 p-2">
              <GitFork className="" />
            </span>
          )}
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="relations-picker-drawer z-50"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu h-screen overflow-auto z-40 sticky top-0 w-80 md:w-[60%] bg-base-100 p-4 text-base-content">
          {/* Sidebar content here */}
          <div className="h-full">
            <PBrelationPicker
              collectionName={collectionName}
              columns={columns}
              maxSelected={maxSelected}
              searchParamKey={searchParamKey}
              filterBy={filterBy}
              fieldLabel={fieldLabel}
              setSelectedRows={setSelectedRows}
              selectedRows={selectedRows}
            />
          </div>
        </ul>
      </div>
    </div>
  );
}
