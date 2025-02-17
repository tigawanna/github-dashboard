import { createFileRoute, } from '@tanstack/react-router'


import { ReposPage } from './-components/ReposPage'

export const Route = createFileRoute('/$user/repos/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Repos</h1>
      <ReposPage />
    </div>
  )
}
