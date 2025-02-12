

export type Prettify<T> = T extends infer o
  ? {
      [K in keyof o]: o[K];
    }
  : never;
type MaybeArray<T> = T | T[];
type MaybeMakeArray<T, Out> = T extends any[] ? Out[] : Out;
type ArrayInnerType<T> = T extends Array<infer V> ? V : T;
type Values<T> = T[keyof T];
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
  x: infer R,
) => any
  ? R
  : never;
type BaseRecord = Record<string, any>;

type GenericCollection = {
  type: string;
  collectionId: string;
  collectionName: string;
  response: BaseRecord;
  create?: BaseRecord;
  update?: BaseRecord;
  relations: Record<string, GenericCollection | GenericCollection[]>;
};

type Select<Collection extends GenericCollection> = {
  [K in keyof Collection["response"]]?: boolean;
};
type SelectWithExpand<Collection extends GenericCollection> =
  Select<Collection> & {
    expand?: {
      [K in keyof Collection["relations"]]?:
        | SelectWithExpand<ArrayInnerType<Collection["relations"][K]>>
        | boolean;
    };
  };
type ResolveSelect<
  TCollection extends GenericCollection,
  TSelect extends Select<TCollection> | undefined,
> =
  Extract<keyof TSelect, keyof TCollection["response"]> extends never
    ? TCollection["response"]
    : {
        [K in keyof TSelect &
          keyof TCollection["response"] as TSelect[K] extends true
          ? K
          : never]: TCollection["response"][K];
      };
export type ResolveSelectWithExpand<
  TCollection extends GenericCollection,
  TSelect extends Select<TCollection> | undefined,
> = Prettify<
  ResolveSelect<TCollection, TSelect> &
    ("expand" extends keyof TSelect
      ? {
          expand?: {
            [Relation in keyof TSelect["expand"] &
              keyof TCollection["relations"] as TSelect["expand"][Relation] extends false
              ? never
              : Relation]?: TSelect["expand"][Relation] extends true
              ? MaybeMakeArray<
                  TCollection["relations"][Relation],
                  ArrayInnerType<TCollection["relations"][Relation]>["response"]
                >
              : TSelect["expand"][Relation] extends object
                ? MaybeMakeArray<
                    TCollection["relations"][Relation],
                    ResolveSelectWithExpand<
                      ArrayInnerType<TCollection["relations"][Relation]>,
                      TSelect["expand"][Relation]
                    >
                  >
                : never;
          };
        }
      : {})
>;


type ExpandType = {
  shop: {
    collectionId: string;
    collectionName: string;
    created: string;
    id: string;
    is_vacant: boolean;
    monthly_rent: number;
    order: number;
    shop_number: string;
    tenant: string;
    updated: string;
    utils: string;
  };
  staff: {
    account: string;
    collectionId: string;
    collectionName: string;
    created: string;
    id: string;
    name: string;
    updated: string;
  };
};

