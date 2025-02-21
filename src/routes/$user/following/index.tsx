import { createFileRoute } from '@tanstack/react-router'
import { UserFollowingPage } from './-components/UserFollowingPage'
import { graphql } from 'relay-runtime';
import { loadQuery } from 'react-relay';
import { followingUserPageLoaderQuery } from './__generated__/followingUserPageLoaderQuery.graphql';


export const Route = createFileRoute("/$user/following/")({
  component: UserFollowingPage,
      loader(ctx) {
        const { user } = ctx.params;
        const relayEnv = ctx.context.relayEnviroment!;
        const queryReference = loadQuery<followingUserPageLoaderQuery>(
          relayEnv,
          userFollowingReposQuery,
          {
            login: user,

          },
          { fetchPolicy: "store-or-network" }
        );
        return queryReference;
      }
});

export const userFollowingReposQuery = graphql`
  query followingUserPageLoaderQuery(
    $login: String!
    ) {
    user(login: $login) {
      ...UserFollowingFragment
    }
  }
`;
