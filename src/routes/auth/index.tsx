import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod';
import { SigninPage } from './-components/SigninPage';
const searchparams = z.object({
  returnTo: z.string(),
});

export const Route = createFileRoute("/auth/")({
  validateSearch: (search) => searchparams.parse(search),
  beforeLoad(ctx) {
    const token = ctx.context.PAT;
    if (token) {
      throw redirect({ to: ".."});
    }
  },
  component: SigninPage,
});

