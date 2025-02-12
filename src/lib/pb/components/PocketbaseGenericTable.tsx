import { PossibleNestedUnions } from "@/utils/types/nested_objects_union";
import { useMutation } from "@tanstack/react-query";
import { Edit, Loader, Plus } from "lucide-react";
import {useState } from "react";
import { PBPickRelationField } from "./PBrelationPicker";
import { CollectionName } from "../client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn/ui/drawer";
import { GitFork, Info } from "lucide-react";
import { MakeToasterProps } from "@/components/toasters";
import {Button} from "@/components/shadcn/ui/button"

import { ClientResponseError } from "pocketbase";
type GenericPocketbaseGenericTableColumn<
  T extends Record<string, any>,
  C extends keyof T,
> = {
  label: string;
  type: "text" | "number" | "date";
  accessor: PossibleNestedUnions<T> | PossibleNestedUnions<T["expand"]>;
  select?: T[C][];
  expand?: {
    collection: CollectionName;
  };
};

interface GenericPocketbaseGenericTableProps<T extends Record<string, any>> {
  rows: T[];
  mappedColumns: (row?: T) => GenericPocketbaseGenericTableColumn<T, keyof T>[];
  updateItem?: (item: T) => Promise<any>;
  createItem?: (item: T) => Promise<any>;
  defaultRowValue?: Partial<T>;
  updateForm?: (row: T, onSuccess?: () => void) => JSX.Element;
  createForm?: (row: T, onSuccess?: () => void) => JSX.Element;
  makeToast: ({
    title,
    description,
    variant,
    ...props
  }: MakeToasterProps) => string;
}

function getNestedProperty(obj: any, path: string): any {
  const keys = path.split(".");
  return keys.reduce((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return acc[key];
    }
    return undefined;
  }, obj);
}

export function GenericPocketbaseGenericTable<T extends Record<string, any>>({
  rows,
  updateItem,
  createItem,
  updateForm,
  createForm,
  mappedColumns,
  defaultRowValue,
}: GenericPocketbaseGenericTableProps<T>) {
  const columns = mappedColumns();

  return (
    <div className="w-full overflow-x-auto">
      <table className="table table-zebra table-lg sticky top-0 w-full">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.label}</th>
            ))}
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => {
                if (column.accessor.includes(".")) {
                  const value = getNestedProperty(
                    row,
                    `expand.${column.accessor}`,
                  );
                  return <td key={row.id + column.accessor}>{value}</td>;
                }
                return (
                  <td key={row.id + column.accessor}>{row[column.accessor]}</td>
                );
              })}
              <td>
                {updateForm ? (
                  <PocketbaseGenericFormModal
                    row={row}
                    updateForm={updateForm}
                  />
                ) : (
                  <PocketbaseGenericTableModal
                    columns={columns}
                    defaultRowValue={defaultRowValue}
                    row={row}
                    dialogTrigger={<Edit className="size-4" />}
                    updateItem={updateItem}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {createForm ? (
        <PocketbaseGenericFormModal
          createForm={createForm}
          defaultRowValue={defaultRowValue}
        />
      ) : (
        <PocketbaseGenericTableModal
          columns={columns}
          defaultRowValue={defaultRowValue}
          dialogTrigger={
            <div className="btn btn-outline btn-sm">
              add new
              <Plus className="" />
            </div>
          }
          createItem={createItem}
        />
      )}
    </div>
  );
}

interface PocketbaseGenericFormModalProps<T extends Record<string, any>> {
  row?: T;
  defaultRowValue?: Partial<T>;
  updateForm?: (row: T, onSuccess?: () => void) => JSX.Element;
  createForm?: (row: T, onSuccess?: () => void) => JSX.Element;
}

export function PocketbaseGenericFormModal<T extends Record<string, any>>({
  row,
  defaultRowValue,
  createForm,
  updateForm,
}: PocketbaseGenericFormModalProps<T>) {
  const [open, setOpen] = useState(false);
  if (updateForm && row) {
    return (
      // <Dialog open={open} onOpenChange={setOpen}>
      //   <DialogTrigger asChild>
      //     <Edit className="size-5" />
      //   </DialogTrigger>
      //   <DialogContent className="z-50 w-full gap-1 overflow-auto sm:max-w-[80%]">
      //     <DialogTitle className="">Update</DialogTitle>
      //     <DialogDescription className="sr-only">
      //       Form to update the row
      //     </DialogDescription>
      //     {updateForm(row, () => setOpen(false))}
      //     {/* <DialogFooter className="sm:justify-start">
      //   </DialogFooter> */}
      //   </DialogContent>
      // </Dialog>
      <Drawer>
        <DrawerTrigger asChild>
          <Edit className="size-5" />
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>
                Set your daily activity goal.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex w-full flex-col gap-2">
              {updateForm(row, () => setOpen(false))}
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
  if (createForm) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="btn btn-outline btn-sm">
            add new
            <Plus className="" />
          </div>
        </DialogTrigger>
        <DialogContent className="z-50 w-full gap-1 overflow-auto sm:max-w-[80%]">
          <DialogTitle className="">Create</DialogTitle>
          <DialogDescription className="sr-only">
            Form to create a new row
          </DialogDescription>
          <div className="h-full w-full ">
          {createForm({ ...defaultRowValue } as T, () => setOpen(false))}

          </div>

          {/* <DialogFooter className="sm:justify-start">
        </DialogFooter> */}
        </DialogContent>
      </Dialog>
    );
  }
}

interface PocketbaseGenericTableModalProps<T extends Record<string, any>> {
  columns: GenericPocketbaseGenericTableColumn<T, keyof T>[];
  dialogTrigger?: React.ReactNode;
  row?: T;
  defaultRowValue?: Partial<T>;
  updateItem?: (item: T) => Promise<any>;
  createItem?: (item: T) => Promise<any>;
  makeToast?: ({
    title,
    description,
    variant,
    ...props
  }: MakeToasterProps) => string;
}

export function PocketbaseGenericTableModal<T extends Record<string, any>>({
  dialogTrigger,
  updateItem,
  createItem,
  makeToast,
  defaultRowValue,
  row,
  columns,
}: PocketbaseGenericTableModalProps<T>) {
  const [open, setOpen] = useState(false);
  const relations = columns.map((column) => {
    if (column.accessor.includes(".")) {
      return column.accessor;
    }
  });
  const uniqueRelations = new Set(
    relations.filter((v) => typeof v === "string"),
  );
  const [input, setInput] = useState<T>(row ?? ({ ...defaultRowValue } as T));

  const [expansions, setExpansions] = useState((prev = {}) => {
    uniqueRelations.forEach((relation) => {
      // @ts-expect-error
      prev[relation] = [];
    });
    return prev;
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate(input);
  }
  const mutation = useMutation({
    mutationFn: (input: T) => {
      if (createItem) {
        return createItem?.(input);
      }
      return updateItem
        ? updateItem?.(input)
        : new Promise((resolve) =>
            resolve({ message: "this could have updated the item" }),
          );
    },
    onSuccess: () => {
      if (row) {
        makeToast?.({
          title: "update successfull",
          description: "data updated successfully",
          variant: "success",
        });
      } else {
        makeToast?.({
          title: "created successfull",
          description: "data updated successfully",
          variant: "success",
        });
      }
      setOpen(false);
    },
  });

  const pbError = mutation.error as ClientResponseError;
  type PbErrorData = {
    [key in keyof T]: {
      message: string;
      code: string;
    };
  };
  const pbErrorData = pbError?.data?.data as PbErrorData;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {dialogTrigger || (
          <span className="btn btn-outline flex cursor-pointer gap-1 p-2">
            <GitFork className="" />
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="z-50 w-full gap-1 overflow-auto sm:max-w-[80%]">
        <DialogTitle className="">Update</DialogTitle>
        <DialogDescription className="sr-only">
          Form to update the data
        </DialogDescription>
        <div className="h-[95%] w-full overflow-y-scroll">
          {mutation.isError && (
            <div className="n flex w-[90%] gap-2 rounded-lg border border-error p-3 text-sm text-error">
              <Info />
              {mutation.error.message}
            </div>
          )}
          <form
            className="flex h-full w-full flex-wrap items-center justify-center gap-2 py-3"
            onSubmit={handleSubmit}
          >
            {columns.map((column) => {
              const accessor = column.accessor.includes(".")
                ? column.accessor.split(".")[1]
                : column.accessor;
              const pbFiledErrorData = pbErrorData?.[accessor ?? ""];

              if (column.accessor.includes(".") && column?.expand) {
                const relationKey = column.accessor.split(".")[0] as string;
                const relationField = column.accessor.split(".")[1] as string;
                const netsedrelationvalue = getNestedProperty(
                  input,
                  `expand.${column.accessor}`,
                );
                const collectionName = column?.expand?.collection;
                const selecetedRowvalue =
                  // @ts-expect-error
                  expansions?.[column.accessor]?.[0]?.[relationField];
                return (
                  <div
                    key={column.accessor}
                    className="flex w-full grow flex-col gap-2 rounded-md md:w-[40%]"
                  >
                    {column.label}
                    <div
                      key={column.accessor}
                      className="flex w-full grow flex-col justify-between gap-4 rounded-md bg-base-200 p-1"
                    >
                      <PBPickRelationField
                        dialogTrigger={
                          <span className="btn btn-outline btn-sm">
                            {selecetedRowvalue ?? netsedrelationvalue}
                            <Edit className="size-3" />
                          </span>
                        }
                        // @ts-expect-error
                        selectedRows={expansions[column.accessor]}
                        maxSelected={1}
                        setSelectedRows={(itm: any) => {
                          if (Array.isArray(itm)) {
                            setExpansions((prev) => ({
                              ...prev,
                              [column.accessor]: itm,
                            }));
                            setInput((prev) => ({
                              ...prev,
                              [relationKey]: (itm.at(0)?.id as any) ?? "",
                            }));
                          }
                        }}
                        collectionName={collectionName}
                        columns={{
                          [relationField]: {
                            name: relationField,
                          },
                        }}
                        fieldLabel={relationKey}
                        searchParamKey="ths"
                        filterBy={relationField as any}
                      />
                      {pbFiledErrorData?.message && (
                        <div className="n flex w-[90%] gap-2 rounded-lg border border-error p-3 text-sm text-error">
                          {pbFiledErrorData?.message}
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={column.accessor}
                  className="flex w-full grow flex-col md:w-[40%]"
                >
                  <label className="label">
                    <span className="label-text">{column.label}</span>
                  </label>
                  <input
                    value={input[column.accessor]}
                    onChange={handleChange}
                    id={column.accessor}
                    name={column.accessor}
                    type={column.type}
                    placeholder={`Enter ${column.label}`}
                    className="input input-bordered w-full"
                  />
                  {pbFiledErrorData?.message && (
                    <div className="n w-full] flex gap-2 rounded-lg text-xs text-error">
                      {pbFiledErrorData?.message}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="flex w-full items-center justify-center">
              {(updateItem || createItem) && (
                <button
                  type="submit"
                  className="btn btn-outline btn-primary btn-wide"
                >
                  save{" "}
                  {mutation.isPending && (
                    <Loader className="size-4 animate-spin" />
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* <DialogFooter className="sm:justify-start">
      </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
