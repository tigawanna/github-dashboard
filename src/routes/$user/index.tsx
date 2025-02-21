import { createFileRoute } from '@tanstack/react-router'
import { UserPage } from './-components/user/UserPage';
import { z } from 'zod';

const tabsOptions = ["repos", "starred", "followers", "following"] as const;

const searchparams = z.object({
  tab: z.enum(tabsOptions).default("repos").optional(),
});

export const Route = createFileRoute("/$user/")({
  validateSearch: (search) => searchparams.parse(search),
  component: UserPage,
});





