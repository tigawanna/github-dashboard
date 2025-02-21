import { createFileRoute } from '@tanstack/react-router'
import { UserStarredReposPage } from './-components/UserStarredReposPage';
import { graphql } from 'relay-runtime';
import { loadQuery } from 'react-relay';
import { starredUserPageLoaderQuery } from './__generated__/starredUserPageLoaderQuery.graphql';

export const Route = createFileRoute("/$user/starred/")({
  component: UserStarredReposPage,
     loaderDeps(opts) {
       return {
         starOrder: opts.search.starOrder
       };
     },
      loader(ctx) {
        const { user } = ctx.params;
        const { starOrder } = ctx.deps;
        const relayEnv = ctx.context.relayEnviroment!;
        const queryReference = loadQuery<starredUserPageLoaderQuery>(
          relayEnv,
          userStarredReposQuery,
          {
            login: user,
            starOrder: {
              field: starOrder?.field || "STARRED_AT",
              direction: starOrder?.direction || "DESC",
            },
          },
          { fetchPolicy: "store-or-network" }
        );
        return queryReference;
      },
});

export const userStarredReposQuery = graphql`
  query starredUserPageLoaderQuery(
    $login: String!, 
    $starOrder: StarOrder) {
    user(login: $login) {
      ...UserStarredRepos_repositories @arguments(orderByStarredRepos: $starOrder)
    }
  }
`;
