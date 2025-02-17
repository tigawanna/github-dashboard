import { createFileRoute } from '@tanstack/react-router'
import { UserFollowingPage } from './-components/UserFollowingPage'


export const Route = createFileRoute("/$user/following/")({
  component: UserFollowingPage,
});

