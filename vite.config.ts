import relay from "vite-plugin-relay";
import { defineConfig } from "vite";
import rakkas from "rakkasjs/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [relay, tsconfigPaths(), react(), rakkas({})],

  server: {
    port: 3000,
    host: true,
  },
});
