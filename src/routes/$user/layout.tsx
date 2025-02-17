import { fetchCurrentViewer } from '@/lib/viewer/use-viewer'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { DashboardLayout } from './-components/dashoboard-sidebar/DashboardLayout'
import { returnTo } from '@/lib/tanstack/router/utils';
import { createRelayEnvironment } from '@/lib/relay/RelayEnvironment';
import { loadQuery } from 'react-relay';
import { graphql } from 'relay-runtime';
import { UserPageLoaderQuery } from './__generated__/UserPageLoaderQuery.graphql';
import { z } from 'zod';
import { layoutUserPageLoaderQuery } from './__generated__/layoutUserPageLoaderQuery.graphql';


const eepositoryOrderOptions = [
  "PUSHED_AT",
  "CREATED_AT",
  "NAME",
  "STARGAZERS",
  "UPDATED_AT",
] as const;
const starOrderOptions = ["STARRED_AT"] as const;
const directionOptions = ["ASC", "DESC"] as const;

const searchparams = z.object({
  isFork: z.boolean().default(false).optional(),
  orderBy: z.object({
    field: z.enum(eepositoryOrderOptions).default("PUSHED_AT"),
    direction: z.enum(directionOptions).default("DESC"),
  }).optional(),
  // starOrder: z.object({
  //   field: z.enum(starOrderOptions).default("STARRED_AT"),
  //   direction: z.enum(directionOptions).default("DESC"),
  // }).optional(),
});

export const Route = createFileRoute("/$user")({
  validateSearch: (search) => searchparams.parse(search),
  loaderDeps({ search: { isFork , orderBy } }) {
    return {
      isFork,
      orderBy,
    };
  },
  component: DashboardLayout,
  loader(ctx) {
    const { user } = ctx.params;
    const { isFork, orderBy } = ctx.deps;
    console.log(" ===  ctx .deps == ",ctx.deps)
    const relayEnv = ctx.context.relayEnviroment!;
    // console.log("relay env in loader  === ",relayEnv)
    const queryReference = loadQuery<layoutUserPageLoaderQuery>(
      relayEnv,
      userQuery,
      // { login: user, isFork: isFork ?? false, orderBy },
      {
        login: user,
        isFork: false,
        orderBy: {
          field: "PUSHED_AT",
          direction: "DESC",
        },
      },
      { fetchPolicy: "store-or-network" }
    );
    return queryReference;
  },
  async beforeLoad(ctx) {
    const token = ctx.context.PAT;
    if (!token || !ctx.context.viewer) {
      throw redirect({ to: "/auth", search: { returnTo: returnTo(ctx.location) } });
    }
    return {
      ...ctx.context,
      relayEnviroment: createRelayEnvironment(token),
    };
  },
});

export const userQuery = graphql`
  query layoutUserPageLoaderQuery($login: String!, $isFork: Boolean, $orderBy: RepositoryOrder) {
    user(login: $login) {
      ...UserInfo
      # ...UserStats
      ...UserFollowingFragment
      ...UserFollowersFragment
      ...UserRepos_repositories @arguments(isFork: $isFork, orderBy: $orderBy)
    }
  }
`;
