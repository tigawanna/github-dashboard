import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/gists/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/gists/"!</div>
}
