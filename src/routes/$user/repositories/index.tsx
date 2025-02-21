import { createFileRoute } from "@tanstack/react-router";
import { UserReposPage } from "./-components/UserReposPage";
import { graphql, loadQuery } from "react-relay";
import { repositoriesUserPageLoaderQuery } from "./__generated__/repositoriesUserPageLoaderQuery.graphql";



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
