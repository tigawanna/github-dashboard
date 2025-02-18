import { createFileRoute } from '@tanstack/react-router'
import { UserStarredReposPage } from './-components/UserStarredReposPage';

export const Route = createFileRoute("/$user/starred/")({
  component: UserStarredReposPage,
});

