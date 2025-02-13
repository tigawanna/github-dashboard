import { createFileRoute } from '@tanstack/react-router'
import { OneUserRepoPage } from './-components/OneUserRepoPage'

export const Route = createFileRoute('/$user/repositories/$repo/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><OneUserRepoPage/></div>
}
