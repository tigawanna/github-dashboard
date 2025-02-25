// type RepositoryFilter =
//   | "language:javascript"
//   | "stars:>1000"
//   | "forks:>500"
//   | "topic:machine-learning"
//   | "created:>=2023-01-01"
//   | "pushed:<=2023-06-01"
//   | "size:>10000"
//   | "is:archived"
//   | "user:facebook"
//   | "org:google";

export const filterComparatprs = {
  ">=": "gte",
  ">": "gt",
  "<=": "lte",
  "<": "lt",
} as const;
export const filterComparatorsArray = Object.entries(filterComparatprs);
export const reposRangedFilters = ["stars:", "forks:","size:"] as const;

export type RepositoryFilter = typeof reposRangedFilters[number]
