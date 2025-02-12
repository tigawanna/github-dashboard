import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod';
const searchparams = z.object({
  returnTo: z.string(),
});

export const Route = createFileRoute("/auth/")({
  validateSearch: (search) => searchparams.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/auth/"!</div>
}
