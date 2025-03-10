import { createFileRoute, redirect } from '@tanstack/react-router'
import { DashboardLayout } from './-components/dashoboard-sidebar/DashboardLayout'
import { returnTo } from '@/lib/tanstack/router/utils';
import { createRelayEnvironment } from '@/lib/relay/RelayEnvironment';
import { graphql } from 'relay-runtime';
import { z } from 'zod';
import { loadQuery } from 'react-relay';
import { layoutUserPageLoaderQuery } from './__generated__/layoutUserPageLoaderQuery.graphql';
import { viewerBeforeLoadWithRelay } from '@/lib/viewer/before-load';



export const repositoryOrderOptions = [
  "PUSHED_AT",
  "CREATED_AT",
  "NAME",
  "STARGAZERS",
  "UPDATED_AT",
] as const;
export const starOrderOptions = ["STARRED_AT"] as const;
export const directionOptions = ["ASC", "DESC"] as const;

const searchparams = z.object({
  isFork: z.boolean().default(false).optional(),
  orderBy: z.object({
    field: z.enum(repositoryOrderOptions).default("PUSHED_AT"),
    direction: z.enum(directionOptions).default("DESC"),
  }).optional(),
  starOrder: z.object({
    field: z.enum(starOrderOptions).default("STARRED_AT"),
    direction: z.enum(directionOptions).default("DESC"),
  }).optional(),
});

export const Route = createFileRoute("/$user")({
  validateSearch: (search) => searchparams.parse(search),

  loaderDeps({ search: { isFork, orderBy, starOrder } }) {
    return {
      isFork,
      orderBy,
      starOrder,
    };
  },
  loader(ctx) {
    const { user } = ctx.params;
    const { isFork, orderBy, starOrder } = ctx.deps;
    const relayEnv = ctx.context.relayEnviroment!;
    const queryReference = loadQuery<layoutUserPageLoaderQuery>(
      relayEnv,
      userQuery,
      {
        login: user,
        isFork: isFork || false,
        orderBy: {
          field: orderBy?.field || "PUSHED_AT",
          direction: orderBy?.direction || "DESC",
        },
        starOrder: {
          field: starOrder?.field || "STARRED_AT",
          direction: starOrder?.direction || "DESC",
        },
      },
      { fetchPolicy: "store-or-network" }
    );
    return queryReference;
  },
  component: DashboardLayout,
  async beforeLoad(ctx) {
    return viewerBeforeLoadWithRelay(ctx);
  },
});

export const userQuery = graphql`
  query layoutUserPageLoaderQuery(
    $login: String!
    $isFork: Boolean
    $orderBy: RepositoryOrder
    $starOrder: StarOrder
  ) {
    user(login: $login) {
      ...UserInfo
      # ...UserStats
      ...UserFollowingFragment
      ...UserFollowersFragment
      ...UserRepos_repositories @arguments(isFork: $isFork, orderBy: $orderBy)
      ...UserStarredRepos_repositories @arguments(orderByStarredRepos: $starOrder)
    }
  }
`;
