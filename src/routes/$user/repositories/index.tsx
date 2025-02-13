import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { UserReposPage } from "./-components/UserReposPage";
import { Suspense } from "react";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback copy";

const eepositoryOrderOptions = [
  "PUSHED_AT",
  "CREATED_AT",
  "NAME",
  "STARGAZERS",
  "UPDATED_AT",
] as const;
const starOrderOptions = ["STARRED_AT"] as const;
const directionOptions = ["ASC", "DESC"] as const;

const searchparams = z.object({
  isFork: z.boolean().default(false).optional(),
  orderBy: z.object({
    field: z.enum(eepositoryOrderOptions).default("PUSHED_AT"),
    direction: z.enum(directionOptions).default("DESC"),
  }).optional(),
  starOrder: z.object({
    field: z.enum(starOrderOptions).default("STARRED_AT"),
    direction: z.enum(directionOptions).default("DESC"),
  }).optional(),
});
export const Route = createFileRoute("/$user/repositories/")({
  validateSearch: (search) => searchparams.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Suspense fallback={<CardsListSuspenseFallback />}>
      <UserReposPage />
    </Suspense>
  );
}
