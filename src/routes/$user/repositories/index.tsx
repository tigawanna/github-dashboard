import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { UserReposPage } from "./-components/UserReposPage";
import { graphql, loadQuery } from "react-relay";
import { repositoriesUserPageLoaderQuery } from "./__generated__/repositoriesUserPageLoaderQuery.graphql";


// const eepositoryOrderOptions = [
//   "PUSHED_AT",
//   "CREATED_AT",
//   "NAME",
//   "STARGAZERS",
//   "UPDATED_AT",
// ] as const;
// const starOrderOptions = ["STARRED_AT"] as const;
// const directionOptions = ["ASC", "DESC"] as const;

// const searchparams = z.object({
//   isFork: z.boolean().default(false).optional(),
//   orderBy: z.object({
//     field: z.enum(eepositoryOrderOptions).default("PUSHED_AT"),
//     direction: z.enum(directionOptions).default("DESC"),
//   }).optional(),
//   starOrder: z.object({
//     field: z.enum(starOrderOptions).default("STARRED_AT"),
//     direction: z.enum(directionOptions).default("DESC"),
//   }).optional(),
// });
export const Route = createFileRoute("/$user/repositories/")({
  // validateSearch: (search) => searchparams.parse(search),
  component: UserReposPage,
   loaderDeps(opts) {
     return {
       isFork: opts.search.isFork,
       orderBy: opts.search.orderBy,
     };
   },
    loader(ctx) {
      const { user } = ctx.params;
      const { isFork, orderBy } = ctx.deps;
      const relayEnv = ctx.context.relayEnviroment!;
      const queryReference = loadQuery<repositoriesUserPageLoaderQuery>(
        relayEnv,
        userReposQuery,
        {
          login: user,
          isFork: isFork || false,
          orderBy: {
            field: orderBy?.field || "PUSHED_AT",
            direction: orderBy?.direction || "DESC",
          },
        },
        { fetchPolicy: "store-or-network" }
      );
      return queryReference;
    },
});

export const userReposQuery = graphql`
  query repositoriesUserPageLoaderQuery(
    $login: String!
    $isFork: Boolean
    $orderBy: RepositoryOrder
  ) {
    user(login: $login) {
      ...UserRepos_repositories @arguments(isFork: $isFork, orderBy: $orderBy)
    }
  }
`;
