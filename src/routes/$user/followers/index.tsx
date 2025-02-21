import { createFileRoute } from "@tanstack/react-router";
import { UserFollowersPage } from "./-components/UserFollowersPage";
import { graphql } from "relay-runtime";
import { followersUserPageLoaderQuery } from "./__generated__/followersUserPageLoaderQuery.graphql";
import { loadQuery } from "react-relay";

export const Route = createFileRoute("/$user/followers/")({
  component: UserFollowersPage,
  loader(ctx) {
    const { user } = ctx.params;
    const relayEnv = ctx.context.relayEnviroment!;
    const queryReference = loadQuery<followersUserPageLoaderQuery>(
      relayEnv,
      userFollowersReposQuery,
      {
        login: user,
      },
      { fetchPolicy: "store-or-network" }
    );
    return queryReference;
  },
});

export const userFollowersReposQuery = graphql`
  query followersUserPageLoaderQuery($login: String!) {
    user(login: $login) {
      ...UserFollowersFragment
    }
  }
`;
