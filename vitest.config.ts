import path from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

export default defineConfig({
  // @ts-expect-error types issue with Vitest
  plugins: [react()],
  resolve: {
    alias: {
      "@javascript": path.resolve(__dirname, "./app/frontend"),
      "@views": path.resolve(__dirname, "./app/views"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./app/frontend/entrypoints/setupTests.ts",
  },
})
