import { createFileRoute } from '@tanstack/react-router'
import { UserFollowingPage } from './-components/UserFollowingPage'
import { CardsListSuspenseFallback } from '@/components/wrappers/GenericDataCardsListSuspenseFallback copy'
import { Suspense } from 'react'

export const Route = createFileRoute('/$user/following/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Suspense fallback={<CardsListSuspenseFallback />}>
      <UserFollowingPage />
    </Suspense>
  );
}
