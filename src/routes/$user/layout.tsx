import { fetchCurrentViewer } from '@/lib/viewer/use-viewer'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { DashboardLayout } from './-components/dashoboard-sidebar/DashboardLayout'
import { returnTo } from '@/lib/tanstack/router/utils';


export const Route = createFileRoute('/$user')({
  component: DashboardLayout,
  async loader(ctx) {
    if (!ctx.context.PAT || !ctx.context.viewer) {
      throw redirect({ to: "/auth", search: { returnTo: returnTo(ctx.location) } });
    }
  }
    

})

