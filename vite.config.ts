import relay from "vite-plugin-relay";
import { defineConfig, loadEnv } from "vite";
import rakkas from "rakkasjs/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

const env = loadEnv("", process.cwd(), "");
Object.assign(process.env, env);

export default defineConfig({
  ssr: {
    external: ["rakkasjs/node-adapter"],
  },
  plugins: [relay, tsconfigPaths(), react(), rakkas({adapter:"vercel"})],
  server: {
    port: 3000,
    host: true,
  },
});
