import { createFileRoute } from '@tanstack/react-router'
import { SearchPage } from './-components/SearchPage'
import { z } from 'zod';

const searchParamsSchema = z.object({
  q: z.string().optional(),
  in: z.enum(["name", "description", "readme", "topics"]).optional(),
  sort: z.enum(["stars", "forks", "updated", "help-wanted-issues"]).optional(),
  // order: z.enum(["asc", "desc"]).default("desc"),
  // per_page: z.number().min(1).max(100).default(30),
  // page: z.number().min(1).default(1),
  // Additional GitHub filters
  language: z.string().optional(),
  is: z.enum(["public", "private", "source", "fork", "archived", "mirror"]).optional(),
  user: z.string().optional(),
  org: z.string().optional(),
  size: z.string().optional(),
  created: z.string().optional(),
  pushed: z.string().optional(),
  topic: z.string().optional(),
});

export const Route = createFileRoute("/$user/search/")({
  component: SearchPage,
  validateSearch: (search) => searchParamsSchema.parse(search)
});


