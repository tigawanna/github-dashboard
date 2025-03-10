import { createFileRoute } from '@tanstack/react-router'
import { SearchPage } from './-components/SearchPage'
import { z } from 'zod';

const searchParamsSchema = z.object({
  q: z.string().optional(),
  filters:z.array(z.string()).optional()
});

export const Route = createFileRoute("/$user/search/")({
  validateSearch: (search) => searchParamsSchema.parse(search),
  // beforeLoad(ctx) {
  //   return {
  //     search: {
  //       ...ctx.search,
  //       q: `user:${ctx.params.user}`,
  //       filters: [`user:${ctx.params.user}`] 
  //     },
  //   };
  // },
  component: SearchPage,
});


