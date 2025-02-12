import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$user/repositories/$repo/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$user/repositories/$repo/"!</div>
}
