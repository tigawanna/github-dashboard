import { RouterErrorComponent } from '@/lib/tanstack/router/routerErrorComponent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/error')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RouterErrorComponent error={new Error("Something went wrong")}/>
}
