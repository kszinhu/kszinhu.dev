/// <reference types="vitest" />

import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import RubyPlugin from "vite-plugin-ruby"

export default defineConfig({
  plugins: [RubyPlugin(), tailwindcss()],
  resolve: {
    alias: {
      "@javascript": path.resolve(__dirname, "./app/frontend"),
    },
  },
})
