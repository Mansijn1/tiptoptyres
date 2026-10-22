
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tanstackStart(), nitro(), react(), tailwindcss()],
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
    tsconfigPaths: true,
  },
});
