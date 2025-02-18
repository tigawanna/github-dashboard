import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import analyze from "rollup-plugin-analyzer";
import relay from "vite-plugin-relay";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    relay,
    TanStackRouterVite({
      routeToken: "layout", // <-- Add this line
      autoCodeSplitting: true,
      routeFileIgnorePattern:"__generated__/*",
      
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    analyze({
      // highlight the modules with size > 40kb
      filter(moduleObject) {
        return moduleObject.size > 40000;
      },
    }),
  ],
  server: {
    port: 3000,
    host: true,
  },
});
