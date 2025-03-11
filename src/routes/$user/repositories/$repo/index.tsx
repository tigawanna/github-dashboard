import { createFileRoute } from "@tanstack/react-router";
import { OneUserRepoPage } from "./-components/OneUserRepoPage";
import { z } from "zod";

const tabsOptions = ["readme", "branches", "stars"] as const;

const searchparams = z.object({
  tab: z.enum(tabsOptions).default("readme").optional(),
});
export const Route = createFileRoute("/$user/repositories/$repo/")({
  validateSearch: (search) => searchparams.parse(search),
  component: OneUserRepoPage,
});
