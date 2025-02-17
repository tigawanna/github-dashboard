import { createFileRoute } from '@tanstack/react-router'
import { UserFollowersPage } from './-components/UserFollowersPage';
import { CardsListSuspenseFallback } from '@/components/wrappers/GenericDataCardsListSuspenseFallback copy';
import { Suspense } from 'react';

export const Route = createFileRoute("/$user/followers/")({
  component: UserFollowersPage,
});


