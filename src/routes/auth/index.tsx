import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod';
import { SigninPage } from './-components/SigninPage';
import { logRedirected } from '@/utils/log';
const searchparams = z.object({
  returnTo: z.string(),
});

export const Route = createFileRoute("/auth/")({
  validateSearch: (search) => searchparams.parse(search),
  beforeLoad(ctx) {
    console.log(" ===== redirected from ======", ctx.location.pathname);
    logRedirected(ctx.location.pathname);

  },
  component: SigninPage,
});

