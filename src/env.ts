import { z } from "zod";

const viteEnvSchema = z.object({
    VITE_PAT: z.string(),
    VITE_CLERK_PUBLISHABLE_KEY: z.string(),
})

const {data,error,success} = viteEnvSchema.safeParse(import.meta.env);

if (!success) {
    throw new Error('Invalid environment variables'+error.flatten().fieldErrors);
}

export const envVariables = data!
