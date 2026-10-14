// Standalone static build for itch.io (no server). Run: bun run build:itch
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("./itch", import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const sdkScript = env.VITE_AD_PLATFORM === "crazygames"
    ? '<script src="https://sdk.crazygames.com/crazygames-sdk-v3.js"></script>'
    : env.VITE_AD_PLATFORM === "gamepix"
      ? '<script src="//integration.gamepix.com/sdk/v3/gamepix.sdk.js"></script>'
      : undefined;

  return {
    root,
    base: "./",
    publicDir: fileURLToPath(new URL("./public", import.meta.url)),
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "crazygames-sdk-head-script",
        transformIndexHtml(html: string) {
          return sdkScript ? html.replace("</head>", `    ${sdkScript}\n  </head>`) : html;
        },
      },
    ],
    resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
    build: {
      outDir: fileURLToPath(new URL(env.VITE_AD_PLATFORM ? `../dist-${env.VITE_AD_PLATFORM}` : "./dist-itch", import.meta.url)),
      emptyOutDir: true,
      assetsDir: "assets",
    },
  };
});
