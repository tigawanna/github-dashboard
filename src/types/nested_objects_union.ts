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

/**
 * Joins two parts of a path with a dot separator
 * @template K - The first part of the path
 * @template P - The second part of the path
 * @example
 * type Path1 = Join<"user", "name">;     // "user.name"
 * type Path2 = Join<"items", 0>;         // "items.0"
 * type Path3 = Join<"data", "">;         // "data"
 * type Path4 = Join<"path", never>;      // never
 */
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

/**
 * Creates a union type of all possible nested path strings up to a specified depth
 * @template T - The object type to create paths from
 * @template D - Maximum depth to traverse (default: 10)
 * @example
 * type ExampleType = {
 *   a: string;
 *   b: {
 *     c: number;
 *     d: {
 *       e: boolean;
 *       f: {
 *         g: string;
 *       };
 *     };
 *   };
 *   h: Date;
 * };
 * 
 * type NestedKeys1 = PossibleNestedUnions<ExampleType, 1>;  // "a" | "b" | "h"
 * type NestedKeys2 = PossibleNestedUnions<ExampleType, 2>;  // "a" | "b" | "b.c" | "b.d" | "h"
 * type NestedKeys3 = PossibleNestedUnions<ExampleType, 3>;  // "a" | "b" | "b.c" | "b.d" | "b.d.e" | "b.d.f" | "h"
 * type NestedKeysAll = PossibleNestedUnions<ExampleType>;   // includes all nested paths
 */

export type PossibleNestedUnions<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: K extends string | number
          ? `${K}` | (D extends 0 ? never : Join<K, PossibleNestedUnions<T[K], Prev[D]>>)
          : never;
      }[keyof T]
    : "";

/**
 * Creates a union type of all object keys up to a specified depth
 * @template T - The object type to extract keys from
 * @template D - Maximum depth to traverse (default: 10)
 * @example
 * type ExampleType = {
 *   a: string;
 *   b: {
 *     c: number;
 *     d: {
 *       e: boolean;
 *       f: {
 *         g: string;
 *       };
 *     };
 *   };
 *   h: Date;
 * };
 * 
 * type FlatKeys1 = FlatObjectKeys<ExampleType, 1>;  // "a" | "b" | "h"
 * type FlatKeys2 = FlatObjectKeys<ExampleType, 2>;  // "a" | "b" | "c" | "d" | "h"
 * type FlatKeys3 = FlatObjectKeys<ExampleType, 3>;  // "a" | "b" | "c" | "d" | "e" | "f" | "h"
 * type FlatKeysAll = FlatObjectKeys<ExampleType>;   // "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h"
 */
export type FlatObjectKeys<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: K extends string | number
          ? K | (D extends 0 ? never : FlatObjectKeys<T[K], Prev[D]>)
          : never;
      }[keyof T]
    : never;
