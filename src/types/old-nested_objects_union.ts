
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
...0[],
];




export type PossibleNestedUnions<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: K extends string | number
          ? `${K}` | (D extends 0 ? never : Join<K, PossibleNestedUnions<T[K], Prev[D]>>)
          : never;
      }[keyof T]
    : "";

// Example usage:
// type ExampleType = {
//   a: string;
//   b: {
//     c: number;
//     d: {
//       e: boolean;
//       f: {
//         g: string;
//       };
//     };
//   };
//   h: Date;
// };

// type NestedKeys1 = NestedUnionsToDepth<ExampleType, 1>; // "a" | "b" | "h"
// type NestedKeys2 = NestedUnionsToDepth<ExampleType, 2>; // "a" | "b" | "b.c" | "b.d" | "h"
// type NestedKeys3 = NestedUnionsToDepth<ExampleType, 3>; // "a" | "b" | "b.c" | "b.d" | "b.d.e" | "b.d.f" | "h"
// type NestedKeysAll = NestedUnionsToDepth<ExampleType, 10>; // All nested


export type FlatObjectKeys<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: K extends string | number
          ? K | (D extends 0 ? never : FlatObjectKeys<T[K], Prev[D]>)
          : never;
      }[keyof T]
    : never;

// Helper type to make depth specification more intuitive
export type FlatObjectKeysToDepth<T, D extends number> = FlatObjectKeys<T, D>;

// Example usage:
// type ExampleType = {
//   a: string;
//   b: {
//     c: number;
//     d: {
//       e: boolean;
//       f: {
//         g: string;
//       };
//     };
//   };
//   h: Date;
// };

// type FlatKeys1 = FlatObjectKeysToDepth<ExampleType, 1>; // "a" | "b" | "h"
// type FlatKeys2 = FlatObjectKeysToDepth<ExampleType, 2>; // "a" | "b" | "c" | "d" | "h"
// type FlatKeys3 = FlatObjectKeysToDepth<ExampleType, 3>; // "a" | "b" | "c" | "d" | "e" | "f" | "h"
// type FlatKeysAll = FlatObjectKeysToDepth<ExampleType, 10>; // "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h"
