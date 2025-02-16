import { envVariables } from '@/env'
import { createRelayEnvironment } from '@/lib/relay/RelayEnvironment'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { RelayEnvironmentProvider } from 'react-relay'

export const Route = createFileRoute('/repos')({
  component: RouteComponent,
})

function RouteComponent() {
  const PAT = envVariables.VITE_PAT
  return (
    <RelayEnvironmentProvider
      environment={createRelayEnvironment(PAT!)}>
      <Outlet />
    </RelayEnvironmentProvider>
  )
}
