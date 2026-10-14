// Standalone static build for itch.io (no server). Run: bun run build:itch
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("./itch", import.meta.url));

export default defineConfig({
  root,
  base: "./",
  publicDir: fileURLToPath(new URL("./public", import.meta.url)),
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  build: { outDir: fileURLToPath(new URL("./dist-itch", import.meta.url)), emptyOutDir: true, assetsDir: "assets" },
});
