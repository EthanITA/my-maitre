import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "/",
  build: {
    // this is where vite will look for your static assets during build time
    assetsDir: "public",
  },
});
